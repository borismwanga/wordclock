import { english, french, dutch } from './languages.js';

const lang = english;
const past = lang.past;
const to = lang.to;
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
  //let hours = 11;
  hours = hours % 12 || 12;
  const minutes = now.getMinutes();
  //const minutes = 55;

  const minuteStrings = lang.minuteStrings;

  const roundedMinute = Math.floor(minutes / 5) * 5; // Round to nearest 5-minute increment
  const midiMiniut = () => {
    if (hours === 12 ){
      return "midi";
      }else if (hours === 1) {
        return "heure";
      }
      return "heures";
  }
  if (minutes === 0 || minutes < 5) {
    if (lang === dutch) {
      return [hourToString(hours), "uur"];
    } else if (lang === french) {
      return [hourToString(hours), midiMiniut()];
    }
    return [hourToString(hours), minuteStrings[0]];
  } else if (minutes < 30) {
    if (lang === french) {
      return minuteStrings[roundedMinute / 5] === "quart" ? [hourToString(hours), midiMiniut(), to, minuteStrings[roundedMinute / 5]] : [hourToString(hours), midiMiniut(), minuteStrings[roundedMinute / 5]];
    } else {
      return [minuteStrings[roundedMinute / 5], past, hourToString(hours)];
    }
  } else if (minutes >= 30 && minutes < 35) {
    return lang === french ? [hourToString(hours), midiMiniut(), "et", minuteStrings[roundedMinute / 5]] : [minuteStrings[roundedMinute / 5], to, hourToString(hours)];
  } else {
    if (lang === french) {
      return minuteStrings[roundedMinute / 5] === "quart" ? [hourToString(hours === 12 ? 1 : hours), midiMiniut(), past, "le", minuteStrings[roundedMinute / 5]] : [hourToString(hours === 12 ? 1 : hours), "heures", past, minuteStrings[roundedMinute / 5]];
    } else {
      return [minuteStrings[roundedMinute / 5], to, hourToString(hours === 12 ? 1 : hours + 1)];
    }
  }
}

console.log(getTime())

const highlightOrderedTerms = (elementId, terms) => {
  const element = document.getElementById(elementId);
  if (!element) return; // Element not found

  // Remove existing highlights by stripping <span> tags
  let content = element.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');

  let lastPosition = 0; // Track the position after the last highlighted term

  terms.forEach(term => {
    const searchTerm = term.toLowerCase();

    // Find the next occurrence of the term after the lastPosition
    let startPosition = content.toLowerCase().indexOf(searchTerm, lastPosition);

    if (startPosition !== -1) {
      // Calculate the end position of the found term
      const endPosition = startPosition + searchTerm.length;

      // Highlight the term
      content = content.substring(0, startPosition) +
        `<span class="highlight">${content.substring(startPosition, endPosition)}</span>` +
        content.substring(endPosition);

      // Update lastPosition to search for the next term after the current highlighted one
      // Adjusting for the added length of the highlight span tags
      lastPosition = endPosition + `<span class="highlight">`.length + `</span>`.length;
    }
  });

  // Update the element's content with the highlighted terms
  element.innerHTML = content;
}

/* Theme toggling */
const rootElement = document.documentElement;
const toggleButton = document.querySelector('.toggle-mode');
const THEME_STORAGE_KEY = 'wordclock-theme';

const applyTheme = theme => {
  const nextTheme = theme === 'light' ? 'light' : 'dark';
  rootElement.setAttribute('data-theme', nextTheme);
  if (toggleButton) {
    const prefersLight = nextTheme === 'light';
    toggleButton.textContent = prefersLight ? 'Dark mode' : 'Light mode';
    toggleButton.setAttribute('aria-pressed', prefersLight.toString());
  }
};

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
applyTheme(savedTheme ?? rootElement.getAttribute('data-theme') ?? 'dark');

toggleButton?.addEventListener('click', () => {
  const currentTheme = rootElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
});

/* Reveal the toggle button only when the mouse moves */

let toggleVisibilityTimeout;
const revealToggle = () => {
  if (!toggleButton) return;
  document.body.classList.add('show-toggle');
  clearTimeout(toggleVisibilityTimeout);
  toggleVisibilityTimeout = setTimeout(() => {
    document.body.classList.remove('show-toggle');
  }, 2000);
};


['mousemove', 'touchstart', 'touchmove'].forEach(eventName => {
  document.addEventListener(eventName, revealToggle, { passive: true });
});

const keepToggleVisible = () => {
  if (!toggleButton) return;
  document.body.classList.add('show-toggle');
  clearTimeout(toggleVisibilityTimeout);
};

toggleButton?.addEventListener('mouseenter', keepToggleVisible);
toggleButton?.addEventListener('mouseleave', revealToggle);

toggleButton?.addEventListener('focus', () => document.body.classList.add('show-toggle'));
toggleButton?.addEventListener('blur', () => document.body.classList.remove('show-toggle'));

revealToggle();



