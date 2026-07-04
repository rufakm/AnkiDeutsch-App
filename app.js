{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww23060\viewh12760\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // 1. INITIALIZE THE DECK\
// Load saved cards from localStorage on startup, or start with an empty array [] if none exist\
let deck = JSON.parse(localStorage.getItem('germanDeck')) || [];\
let currentIndex = 0;\
\
// 2. RUN AUTOMATICALLY ON PAGE LOAD\
// This ensures that if you already have saved cards, the first one displays immediately when you open the app\
window.onload = function() \{\
    updateUI();\
\};\
\
// 3. ADD A NEW WORD TO THE DECK\
function addWord() \{\
    const germanInput = document.getElementById('inputGerman');\
    const englishInput = document.getElementById('inputEnglish');\
\
    // Prevent adding empty fields\
    if (germanInput.value.trim() === "" || englishInput.value.trim() === "") \{\
        alert("Please fill out both fields!");\
        return;\
    \}\
\
    // Create the flashcard object and push it into our memory array\
    deck.push(\{\
        german: germanInput.value.trim(),\
        english: englishInput.value.trim()\
    \});\
\
    // CRUCIAL: Save the updated deck to the phone/browser local storage\
    localStorage.setItem('germanDeck', JSON.stringify(deck));\
\
    // Clear the input boxes so you can type the next word immediately\
    germanInput.value = "";\
    englishInput.value = "";\
\
    // If this is the very first card you added, make sure it focuses on it\
    if (deck.length === 1) \{\
        currentIndex = 0;\
    \}\
\
    // Refresh the screen to update the total card count and display changes\
    updateUI();\
\}\
\
// 4. UPDATE THE INTERFACE SCREEN\
function updateUI() \{\
    // Update the counter at the top of your study area\
    document.getElementById('cardCount').innerText = deck.length;\
\
    // Handle the visual layout if your deck is completely empty\
    if (deck.length === 0) \{\
        document.getElementById('germanText').innerText = "No words added yet!";\
        document.getElementById('englishText').innerText = "";\
        return;\
    \}\
\
    // Display the German word of the active card\
    document.getElementById('germanText').innerText = deck[currentIndex].german;\
    \
    // Inject the English translation behind the scenes, but keep it hidden\
    const englishElement = document.getElementById('englishText');\
    englishElement.innerText = deck[currentIndex].english;\
    \
    // Make sure the translation is HIDDEN every time a new card loads\
    englishElement.classList.add('hidden');\
\}\
\
// 5. REVEAL THE HIDDEN TRANSLATION\
function revealAnswer() \{\
    if (deck.length === 0) return;\
    document.getElementById('englishText').classList.remove('hidden');\
\}\
\
// 6. CARD NAVIGATION (NEXT AND PREVIOUS BUTTONS)\
function nextCard() \{\
    if (deck.length === 0) return;\
    // The % operator makes it loop back to index 0 seamlessly when you reach the last card\
    currentIndex = (currentIndex + 1) % deck.length;\
    updateUI();\
\}\
\
function prevCard() \{\
    if (deck.length === 0) return;\
    // Loops backward to the end of the deck seamlessly if you hit previous on the first card\
    currentIndex = (currentIndex - 1 + deck.length) % deck.length;\
    updateUI();\
\}\
\
// 7. CLEAR ENTIRE DECK (OPTIONAL RESET FEATURE)\
function clearDeck() \{\
    if (confirm("Are you sure you want to permanently delete ALL cards from your list?")) \{\
        deck = [];\
        localStorage.removeItem('germanDeck');\
        currentIndex = 0;\
        updateUI();\
    \}\
\}\
}