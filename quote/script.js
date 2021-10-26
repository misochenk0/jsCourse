const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show loading
function loading() {
    loader.hidden = false;
    loader.style.display = 'block';
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true
        loader.style.display = 'none'

    }
}

// Get quote from API
// console.log(quoteContainer, quoteText, authorText, twitterBtn, newQuoteBtn );
async function getQuote() {
    loading();
    const proxyUrl = 'https://dry-hollows-36587.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank, add 'Unknown'
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font-size for long
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
            
        }
        quoteText.innerText = data.quoteText;
        complete()
    } catch (error) {
        getQuote();
        console.log('whoops', error);
    }
}

//Tweet quote

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}
// EventListeners

newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)


// on load
getQuote();