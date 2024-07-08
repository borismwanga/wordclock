import { english, french } from './languages.js';

const lang = french;
const past = lang.past;
const to = lang.to;
const half = lang.half;
const myText = lang.myText;

document.getElementById("myText").innerHTML = myText;

setInterval(() => {
  const now = new Date();
  let hours = now.getHours(); // Get current hours in 24-hour format

  hours = hours % 12 || 12; // Convert to 12-hour format

  const textElementId = "myText";
  // Reset searchTerms with base terms and then add current time terms
  const searchTerms = [...lang.searchTerms]; // Assuming lang.searchTerms contains base terms that are always relevant
  searchTerms.push(...getTime()); // Add current time terms

  highlightOrderedTerms(textElementId, searchTerms);
  console.log(getTime())
}, 1000);

const hourToString = hour => {
  const numbers = lang.numbers;
  if (hour >= 0 && hour <= 12) {
    return numbers[hour];
  } else {
    throw new Error("Hour must be between 0 and 11");
  }
}

// Get the current time in words
const getTime = () => {
  const now = new Date();
  let hours = now.getHours();
  //let hours = 5;
  hours = hours % 12 || 12;
  const minutes = now.getMinutes();
  //const minutes = 15;

  const minuteStrings = lang.minuteStrings;

  const roundedMinute = Math.floor(minutes / 5) * 5; // Round to nearest 5-minute increment
  if (minutes === 0 || minutes < 5) {
    return [hourToString(hours), minuteStrings[0]];
  } else if (minutes < 30) {
    if (lang === french) {
      return minuteStrings[roundedMinute / 5] === "quart" ? [hourToString(hours), "heures", to, minuteStrings[roundedMinute / 5]] : [hourToString(hours), "heures", minuteStrings[roundedMinute / 5]];
    } else {
      return [minuteStrings[roundedMinute / 5], past, hourToString(hours)];
    }
  } else if (minutes >= 30 && minutes < 35) {
    return lang === french ? [hourToString(hours === 12 ? 1 : hours), "heures", "et", minuteStrings[roundedMinute / 5]] : [minuteStrings[roundedMinute / 5], to, hourToString(hours)];
  } else {
    if (lang === french) {
      return minuteStrings[roundedMinute / 5] === "quart" ? [hourToString(hours === 12 ? 1 : hours), "heures", past, "le", minuteStrings[roundedMinute / 5]] : [hourToString(hours === 12 ? 1 : hours), "heures", past, minuteStrings[roundedMinute / 5]];
    } else {
      return [minuteStrings[roundedMinute / 5], past, hourToString(hours)];
    }
  }
}

console.log(getTime())

function highlightOrderedTerms(elementId, terms) {
  const element = document.getElementById(elementId);
  if (!element) return; // Element not found

  // Remove existing highlights by stripping <span> tags
  let content = element.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');

  let lastPosition = 0; // Track the position after the last highlighted term
  let foundTerms = {}; // Object to keep track of found terms

  terms.forEach(term => {
    if (foundTerms[term]) return; // Skip if the term has already been highlighted

    const searchTerm = term.toLowerCase();
    const startPosition = content.toLowerCase().indexOf(searchTerm, lastPosition);

    if (startPosition !== -1) {
      // Calculate the end position of the found term
      const endPosition = startPosition + searchTerm.length;

      // Highlight the term
      content = content.substring(0, startPosition) +
        `<span class="highlight">${content.substring(startPosition, endPosition)}</span>` +
        content.substring(endPosition);

      // Mark the term as found
      foundTerms[term] = true;

      // Update lastPosition to search for the next term after the current highlighted one
      // Adjusting for the added length of the highlight span tags
      lastPosition = startPosition + `<span class="highlight">`.length + searchTerm.length + `</span>`.length - searchTerm.length;
    }
  });

  // Update the element's content with the highlighted terms
  element.innerHTML = content;
}