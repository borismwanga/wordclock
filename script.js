//text hightlighting
// function highlightText(elementId, searchTerms) {
//     const element = document.getElementById(elementId);
//     if (!element) {
//       return; // Handle potential element not found
//     }
  
//     const text = element.innerHTML;
//     const regex = new RegExp("(?:" + searchTerms.join("|") + ")", "gi"); // Match substrings within words, case-insensitive (i)
  
//     const highlightedText = text.replace(regex, (matchedWord) => {
//       return `<span class="highlight">${matchedWord}</span>`;
//     });
  
//     element.innerHTML = highlightedText;
//   }
  
 
  
// /* setInterval(() => {
//     const now = new Date();
//     let hours = now.getHours(); // Get current hours in 24-hour format

//     // Convert to 12-hour format and add meridiem indicator (AM/PM)
//     hours = hours % 12 || 12; // Convert from 24-hour to 12-hour format (12 for midnight/noon)
//     console.log(`${hours}:${now.getMinutes()} `);
        
// }, 1000); */

GetTime = () => {
  const now = new Date();
  let hours = now.getHours();
  hours = hours % 12 || 12;
  // const minutes = now.getMinutes()  ;
  const minutes = 5 ;

  switch (minutes) {
    case 0 || 1 || 2:
      return hourToString(hours) + " o'clock";
    case 5:
      return ["five", "past" , hourToString(hours)];
    case 10:
      return ["ten", "past" , hourToString(hours)];
    case 15:
      return ["quarter", "past" , hourToString(hours)];
    case 20:
      return ["twenty", "past" , hourToString(hours)];
    case 25:
      return ["twenty", "five", "past" , hourToString(hours)];
    case 30:
      return ["half", "past" , hourToString(hours)];
    case 35:
      return ["twenty", "five", "to" , hourToString(hours + 1)];
    case 40:
      return ["twenty", "to" , hourToString(hours + 1)];
    case 45:
      return ["quarter", "to" , hourToString(hours + 1)];
    case 50:
      return ["ten", "to" , hourToString(hours + 1)];
    case 55 && 56 && 57:
      return ["five", "to" , hourToString(hours + 1)];

  }

  return  [hourToString(hours)] ;
    
};

const hourToString = hour => {
  const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
  if (hour >= 0 && hour <= 12) {
    return numbers[hour];
  } else {
    throw new Error("Hour must be between 0 and 11");
  }
}

console.log(GetTime())


function highlightText(elementId, searchTerms) {
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

const textElementId = "myText";
const searchTerms = ["it", "is"];
searchTerms.push(...GetTime())

highlightText(textElementId, searchTerms);



// function countWords(arr) {
//       const wordCount = {};
    
//       for (const word of arr) {
//         if (wordCount[word]) {
//           wordCount[word]++;
//         } else {
//           wordCount[word] = 1;
//         }
//       }
    
//       return wordCount;
//   }


