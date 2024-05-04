//seconds
setInterval(() => {
    const now = new Date();
    let hours = now.getHours(); // Get current hours in 24-hour format

    // Convert to 12-hour format and add meridiem indicator (AM/PM)
    hours = hours % 12 || 12; // Convert from 24-hour to 12-hour format (12 for midnight/noon)
    //console.log(`${hours}:${now.getMinutes()} `);


    const textElementId = "myText";
    const searchTerms = ["it", "is"];
    searchTerms.push(...getTime())

    highlightText(textElementId, searchTerms);
        
}, 1000); 

const hourToString = hour => {
  const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
    if (hour >= 0 && hour <= 12) {
      return numbers[hour];
    } else {
      throw new Error("Hour must be between 0 and 11");
    }
  }

// Get the current time in words
getTime = () => {
  const now = new Date();
  let hours = now.getHours();
  hours = hours % 12 || 12;
  const minutes = now.getMinutes();

  const minuteStrings = [
    "oclock",
    "five",
    "ten",
    "quarter",
    "twenty",
    "twentyfive",
    "half",
    "twentyfive",
    "twenty",
    "quarter",
    "ten",
    "five"
  ];
 
  const roundedMinute = Math.floor(minutes / 5) * 5; // Round to nearest 5-minute increment
  if (minutes === 0 || minutes < 5) {
    return [hourToString(hours), minuteStrings[0]];
  }else if (minutes < 30) {
    return [minuteStrings[roundedMinute / 5], "past", hourToString(hours)];
  }else if(minutes >= 30 && minutes < 35) {
    return ["half", "past", hourToString(hours)];
  }else {
    return [minuteStrings[roundedMinute / 5],"to", hourToString(hours === 12 ? 1 : hours + 1)];
  }

  
}


console.log(getTime())


// Highlight text in an element
highlightText = (elementId, searchTerms) => {
    const element = document.getElementById(elementId);
    if (!element) {
        return; // Handle potential element not found
    }

    const text = element.textContent; // Get text content
    let highlightedText = text;
    let lastIndex = 0;

    searchTerms.forEach(term => {
        const index = highlightedText.toLowerCase().indexOf(term.toLowerCase(), lastIndex);
        if (index !== -1) {
            const before = highlightedText.substring(0, index);
            const after = highlightedText.substring(index + term.length);
            highlightedText = before + `<span class="highlight">${term.toUpperCase()}</span>` + after;
            lastIndex = index + term.length + 31; // increment lastIndex
        }
    });

    element.innerHTML = highlightedText; // Set highlighted text back to the element
}






