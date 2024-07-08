import {english, french} from './languages.js';

const lang = english;
const past = lang.past;
const to = lang.to;
const half = lang.half;
const myText = lang.myText;

document.getElementById("myText").innerHTML = myText;

//seconds
setInterval(() => {
  const now = new Date();
  let hours = now.getHours(); // Get current hours in 24-hour format

  // Convert to 12-hour format and add meridiem indicator (AM/PM)
  hours = hours % 12 || 12; // Convert from 24-hour to 12-hour format (12 for midnight/noon)
  //console.log(`${hours}:${now.getMinutes()} `);

  const textElementId = "myText";
  const searchTerms = lang.searchTerms;
  searchTerms.push(...getTime())

  highlightText(textElementId, searchTerms);
      
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
  //const minutes = 10;

  const minuteStrings = lang.minuteStrings;

 
  const roundedMinute = Math.floor(minutes / 5) * 5; // Round to nearest 5-minute increment
  if (minutes === 0 || minutes < 5) {
    return [hourToString(hours), minuteStrings[0]];
  }else if (minutes < 30) {
    if (lang === french) {
      return minuteStrings[roundedMinute / 5] ==="quart" ? [hourToString(hours), "heures" , to, minuteStrings[roundedMinute / 5]] : [hourToString(hours), "heures" , minuteStrings[roundedMinute / 5]];
    } else {
      return [minuteStrings[roundedMinute / 5], past, hourToString(hours)];
    }
  }else if(minutes >= 30 && minutes < 35) {
    return lang === french ? [hourToString(hours === 12 ? 1 : hours),"heures","et",minuteStrings[roundedMinute / 5]] : [minuteStrings[roundedMinute / 5], to, hourToString(hours)];
  }else {
    if (lang === french) {
      return minuteStrings[roundedMinute / 5] ==="quart" ? [hourToString(hours === 12 ? 1 : hours ),"heures", past, "le", minuteStrings[roundedMinute / 5]] : [hourToString(hours === 12 ? 1 : hours ),"heures", past, minuteStrings[roundedMinute / 5]];
    } else {
      return [minuteStrings[roundedMinute / 5], past, hourToString(hours)];
    }
  }

  
}


console.log(getTime())


const highlightText = (elementId, searchTerms) => {
    const element = document.getElementById(elementId);
    if (!element) {
        return; // Handle potential element not found
    }

    // Split the text into lines
    const lines = element.innerHTML.split('<br>');

    // Keep track of which terms have been highlighted
    const highlightedTerms = new Set();
    
    // Process each line separately
    const highlightedLines = lines.map(line => {
        let highlightedLine = line;
        let lastIndex = 0;
        
        for (const term of searchTerms) {
            const lowerCaseTerm = term.toLowerCase();
            const index = highlightedLine.toLowerCase().indexOf(lowerCaseTerm, lastIndex);
            
            if (index !== -1 && !highlightedTerms.has(lowerCaseTerm)) {
                const before = highlightedLine.substring(0, index);
                const after = highlightedLine.substring(index + term.length);
                highlightedLine = before + `<span class="highlight">${term.toUpperCase()}</span>` + after;
                
                // Update lastIndex to skip this term
                lastIndex = index + term.length;
                
                // Mark this term as highlighted
                highlightedTerms.add(lowerCaseTerm);
            }
        }
        
        return highlightedLine;
    });

    // Join the lines back together with <br> tags
    element.innerHTML = highlightedLines.join('<br>');
}
