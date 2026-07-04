let deck = JSON.parse(localStorage.getItem('germanDeck')) || [];
let currentIndex = 0;

window.onload = function() {
    updateUI();
};

function addWord() {
    const germanInput = document.getElementById('inputGerman');
    const englishInput = document.getElementById('inputEnglish');

    if (germanInput.value.trim() === "" || englishInput.value.trim() === "") {
        alert("Please fill out both fields!");
        return;
    }

    deck.push({
        german: germanInput.value.trim(),
        english: englishInput.value.trim()
    });

    localStorage.setItem('germanDeck', JSON.stringify(deck));

    germanInput.value = "";
    englishInput.value = "";

    if (deck.length === 1) {
        currentIndex = 0;
    }

    updateUI();
}

function updateUI() {
    document.getElementById('cardCount').innerText = deck.length;

    if (deck.length === 0) {
        document.getElementById('germanText').innerText = "No words added yet!";
        document.getElementById('englishText').innerText = "";
        return;
    }

    document.getElementById('germanText').innerText = deck[currentIndex].german;
    
    const englishElement = document.getElementById('englishText');
    englishElement.innerText = deck[currentIndex].english;
    englishElement.classList.add('hidden');
}

function revealAnswer() {
    if (deck.length === 0) return;
    document.getElementById('englishText').classList.remove('hidden');
}

function nextCard() {
    if (deck.length === 0) return;
    currentIndex = (currentIndex + 1) % deck.length;
    updateUI();
}

function prevCard() {
    if (deck.length === 0) return;
    currentIndex = (currentIndex - 1 + deck.length) % deck.length;
    updateUI();
}

function clearDeck() {
    if (confirm("Are you sure you want to permanently delete ALL cards from your list?")) {
        deck = [];
        localStorage.removeItem('germanDeck');
        currentIndex = 0;
        updateUI();
    }
}
