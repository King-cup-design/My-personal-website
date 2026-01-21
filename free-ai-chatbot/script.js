// Simple Translator Script

// Translation API endpoint
const TRANSLATE_API = 'https://api.mymemory.translated.net/get';

// DOM elements
const fromLang = document.getElementById('fromLang');
const toLang = document.getElementById('toLang');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const translateBtn = document.getElementById('translateBtn');
const swapBtn = document.getElementById('swapBtn');
const clearBtn = document.getElementById('clearBtn');

// Translation function using MyMemory API
async function translateText(text, from, to) {
    try {
        const url = `${TRANSLATE_API}?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.responseStatus === 200) {
            return data.responseData.translatedText;
        } else {
            throw new Error(`Translation API error: ${data.responseDetails}`);
        }
    } catch (error) {
        console.error('Translation error details:', error);
        if (error.name === 'TypeError' && error.message.includes('CORS')) {
            throw new Error('CORS error: Unable to access translation API from this origin. Please run a local server.');
        }
        throw new Error('Translation failed. Please check your internet connection and try again.');
    }
}

// Handle translation
translateBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    const from = fromLang.value;
    const to = toLang.value;
    
    if (!text) {
        outputText.value = 'Please enter some text to translate.';
        return;
    }
    
    // Disable button during translation
    translateBtn.disabled = true;
    translateBtn.textContent = 'Translating...';
    
    try {
        const translated = await translateText(text, from, to);
        outputText.value = translated;
    } catch (error) {
        outputText.value = error.message; // Show user-friendly error message
        console.error('Detailed translation error:', error); // Log full error for debugging
    } finally {
        // Re-enable button
        translateBtn.disabled = false;
        translateBtn.textContent = 'Translate';
    }
});

// Handle language swap
swapBtn.addEventListener('click', () => {
    const tempLang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = tempLang;
    
    // Also swap the text content
    const tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;
});

// Handle clear button
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
});

// Auto-translate on language change (optional feature)
fromLang.addEventListener('change', () => {
    if (inputText.value.trim()) {
        translateBtn.click();
    }
});

toLang.addEventListener('change', () => {
    if (inputText.value.trim()) {
        translateBtn.click();
    }
});