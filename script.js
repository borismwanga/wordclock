import { french, english, dutch } from './languages.js';

// Set language
const language = french;
const setNumbers = language.numbers;
const setOclock = language.oclock;
const setPast = language.past;
const setTo = language.to;
const setHalf = language.half;
const setMinuteStrings = language.minuteStrings;
const setSearchTerms = language.searchTerms;
const setMyText = language.myText;

// Set text
document.getElementById("myText").innerHTML = setMyText;

// Function to remove existing highlights
const removeHighlights = (element) => {
  const spans = element.querySelectorAll('.highlight');
  spans.forEach(span => {
    const parent = span.parentNode;
    parent.replaceChild(document.createTextNode(span.textContent), span);
    parent.normalize();
  });
};

// Highlight text in an element
const highlightText = (elementId, searchTerms) => {
  const element = document.getElementById(elementId);
  if (!element) {
    return; // Handle potential element not found
  }

  // Remove existing highlights
  removeHighlights(element);

  let text = element.innerHTML; // Get inner HTML to preserve <br> tags

  searchTerms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'i'); // Create a case-insensitive regex for each term
    text = text.replace(regex, `<span class="highlight">$1</span>`);
  });

  element.innerHTML = text; // Set highlighted text back to the element
};

// Function to convert hour to string
const hourToString = hour => {
  const numbers = setNumbers;
  if (hour >= 0 && hour <= 12) {
    return numbers[hour];
  } else {
    throw new Error("Hour must be between 0 and 12");
  }
};

// Get the current time in words
const getTime = () => {
  const now = new Date();
  let hours = now.getHours();
  hours = hours % 12 || 12;
  const minutes = now.getMinutes();

  const minuteStrings = setMinuteStrings;
  const roundedMinute = Math.floor(minutes / 5) * 5; // Round to nearest 5-minute increment

    let md = "";
  if (language === french && hours === 1) {
    md = "heure";
  } else if(language === french && hours > 12){
    md = "heures";
  }
  if (minutes === 0 || minutes < 5) {
    return [hourToString(hours), minuteStrings[0]];
    } else if (minutes < 30) {
        return (language === french) ? [hourToString(hours), minuteStrings[roundedMinute / 5]] : [minuteStrings[roundedMinute / 5], setPast, hourToString(hours)];
    } else if (minutes >= 30 && minutes < 35) {
        return (language === french) ? [hourToString(hours), minuteStrings[roundedMinute / 5] ] : [setHalf, setPast, hourToString(hours)];
    } else {
        return (language === french) ? [hourToString(hours === 12 ? 1 : hours + 1),md,setPast, minuteStrings[roundedMinute / 5]] : [minuteStrings[roundedMinute / 5],setTo, hourToString(hours === 12 ? 1 : hours + 1)] ;
  }
};

// Update the highlighted text every second
setInterval(() => {
  const textElementId = "myText";
  const searchTerms = [...setSearchTerms, ...getTime()]; // Combine initial search terms with the time
  highlightText(textElementId, searchTerms);
}, 1000);


console.log(getTime());
