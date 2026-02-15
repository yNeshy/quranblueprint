// Import data files
import quranArabicRaw from '../data/quran.json';
import quranEnglishRaw from '../data/editions/en.json';
import pairsDataRaw from '../data/pairs.json';

// Surah names - mapping chapter number to surah info
const surahNames = {
  1: { arabic: "الفاتحة", english: "The Opening" },
  2: { arabic: "البقرة", english: "The Cow" },
  3: { arabic: "آل عمران", english: "The Family of Imran" },
  4: { arabic: "النساء", english: "The Women" },
  5: { arabic: "المائدة", english: "The Table Spread" },
  6: { arabic: "الأنعام", english: "The Cattle" },
  7: { arabic: "الأعراف", english: "The Heights" },
  8: { arabic: "الأنفال", english: "The Spoils of War" },
  9: { arabic: "التوبة", english: "The Repentance" },
  10: { arabic: "يونس", english: "Jonah" },
  11: { arabic: "هود", english: "Hud" },
  12: { arabic: "يوسف", english: "Joseph" },
  13: { arabic: "الرعد", english: "The Thunder" },
  14: { arabic: "إبراهيم", english: "Abraham" },
  15: { arabic: "الحجر", english: "The Rocky Tract" },
  16: { arabic: "النحل", english: "The Bee" },
  17: { arabic: "الإسراء", english: "The Night Journey" },
  18: { arabic: "الكهف", english: "The Cave" },
  19: { arabic: "مريم", english: "Mary" },
  20: { arabic: "طه", english: "Taha" },
  21: { arabic: "الأنبياء", english: "The Prophets" },
  22: { arabic: "الحج", english: "The Pilgrimage" },
  23: { arabic: "المؤمنون", english: "The Believers" },
  24: { arabic: "النور", english: "The Light" },
  25: { arabic: "الفرقان", english: "The Criterion" },
  26: { arabic: "الشعراء", english: "The Poets" },
  27: { arabic: "النمل", english: "The Ant" },
  28: { arabic: "القصص", english: "The Stories" },
  29: { arabic: "العنكبوت", english: "The Spider" },
  30: { arabic: "الروم", english: "The Romans" },
};

let quranArabic = null;
let quranEnglish = null;
let wordPairsData = null;

/**
 * Load Quran and word pairs data and merge them
 */
async function loadData() {
  try {
    quranArabic = quranArabicRaw;
    quranEnglish = quranEnglishRaw;
    
    // Merge occurrence references with actual verse text
    wordPairsData = pairsDataRaw.map(pair => ({
      ...pair,
      occurrences_1: pair.occurrences_1.map(occ => enrichOccurrence(occ)),
      occurrences_2: pair.occurrences_2.map(occ => enrichOccurrence(occ)),
    }));

    return wordPairsData;
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
}

/**
 * Enrich occurrence with full verse text and surah names
 * @param {Object} occ - Occurrence object with surah and verse properties
 */
function enrichOccurrence(occ) {
  const surahNum = occ.surah; // 1-based chapter number
  const verseNum = occ.verse; // 1-based verse number
  
  const surah = surahNames[surahNum] || {
    arabic: `سورة ${surahNum}`,
    english: `Chapter ${surahNum}`,
  };

  // Get verse text from Arabic and English data using chapter number
  const arabicVerses = quranArabic?.[surahNum] || [];
  const englishVerses = quranEnglish?.[surahNum] || [];
  
  // Find verse by verse number
  const arabicVerseData = arabicVerses.find(v => v.verse === verseNum) || {};
  const englishVerseData = englishVerses.find(v => v.verse === verseNum) || {};

  return {
    surah_number: surahNum,
    surah_name_arabic: surah.arabic,
    surah_name_english: surah.english,
    verse_number: verseNum,
    verse_text_arabic: arabicVerseData.text || "",
    verse_text_english: englishVerseData.text || "",
  };
}

/**
 * Fetch word pairs from loaded data
 * @returns {Promise<Array>} Promise resolving to array of word pairs
 */
export const fetchWordPairs = async () => {
  // Load data if not already loaded
  if (!wordPairsData) {
    await loadData();
  }

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(wordPairsData || []);
    }, 300);
  });
};

/**
 * Get a single word pair by ID
 * @param {number} id - The ID of the word pair
 * @returns {Promise<Object|null>} Promise resolving to the word pair or null
 */
export const getWordPairById = async (id) => {
  if (!wordPairsData) {
    await loadData();
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(wordPairsData?.find(pair => pair.id === id) || null);
    }, 100);
  });
};
