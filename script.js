import { french, english, dutch } from './languages.js';



//set language
const language = french;
const setNumbers = language.numbers;
const SetOclock = language.oclock;
const setPast = language.past;
const setTo = language.to;
const setQuarter = language.quarter;
const setHalf = language.half;
const setMinuteStrings = language.minuteStrings;
const setSearchTerms = language.searchTerms;
const setMyText = language.myText;

//set text
document.getElementById("myText").innerHTML = setMyText;

console.log('====================================');
//seconds
setInterval(() => {
    const now = new Date();
    let hours = now.getHours(); // Get current hours in 24-hour format

    // Convert to 12-hour format and add meridiem indicator (AM/PM)
    hours = hours % 12 || 12; // Convert from 24-hour to 12-hour format (12 for midnight/noon)
    //console.log(`${hours}:${now.getMinutes()} `);

    const textElementId = "myText";
    const searchTerms = setSearchTerms;
    searchTerms.push(...getTime())

    highlightText(textElementId, searchTerms);
        
}, 1000); 

const hourToString = hour => {
  const numbers = setNumbers;
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
  hours = hours % 12 || 12;
  const minutes = now.getMinutes();

  const minuteStrings = setMinuteStrings
 
  const roundedMinute = Math.floor(minutes / 5) * 5; // Round to nearest 5-minute increment

  if (minutes === 0 || minutes < 5) {
    return [hourToString(hours), minuteStrings[0]];
  }else if (minutes < 30) {
    return [minuteStrings[roundedMinute / 5], setPast, hourToString(hours)];
  }else if(minutes >= 30 && minutes < 35) {
    return (language === french) ? [hourToString(hours),"heures", minuteStrings[roundedMinute / 5] ] : [setHalf, setPast, hourToString(hours)];
  }else {
    return (language === french) ? [hourToString(hours === 12 ? 1 : hours + 1),setPast, minuteStrings[roundedMinute / 5]] : [minuteStrings[roundedMinute / 5],setTo, hourToString(hours === 12 ? 1 : hours + 1)] ;
  }

  
}


console.log(getTime())


// Highlight text in an element
const highlightText = (elementId, searchTerms) => {
  const element = document.getElementById(elementId);
  if (!element) {
      return; // Handle potential element not found
  }

  let text = element.innerHTML; // Get inner HTML to preserve <br> tags

  searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi'); // Create a case-insensitive global regex for each term
      text = text.replace(regex, `<span class="highlight">$1</span>`);
  });

  element.innerHTML = text; // Set highlighted text back to the element
}







