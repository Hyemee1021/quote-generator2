const quoteContainer = document.getElementById("quote-container"); //get Quote from API
const quoteText = document.getElementById("quote"); //get Quote from API
const authorText = document.getElementById("author"); //get Quote from API
const twitterBtn = document.getElementById("twitter"); //get Quote from API
const newQuoteBtn = document.getElementById("new-quote"); //get Quote from API
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false; //show
  quoteContainer.hidden = true; //hidden
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false; //show
    loader.hidden = true; //hidden
  }
}
async function getQuote() {
  showLoadingSpinner();

  const proxyURL = `http://cors-anywhere.herokuapp.com/`;
  const apiURL = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;

  try {
    const response = await fetch(proxyURL + apiURL);
    //await until fetch method get its data
    const data = await response.json();
    console.log(data);

    if (data.quoteAuthor === "") {
      authorText.innerText = `Unknown`;
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    authorText.innerText = data.quoteAuthor;

    //reduce font size for long quote
    if (data.quoteText.length > 100) {
      quoteText.classList.add(".long-quote");
    } else {
      quoteText.classList.remove(".long-quote");
    }
    quoteText.innerText = data.quoteText;
    //it will run if statement and then it prints quoteText

    removeLoadingSpinner();
  } catch (error) {
    console.log("whoops, mo quote", error);
    
  }
}

//tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterURL = `http://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterURL, "_blank");
}
//event listner
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//when the page is load, call the function
getQuote();
