const Utils = {
  // Delays function execution until after wait time has elapsed since last call
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Validates if a string is a properly formatted URL for recipe's image
  isValidUrl(string) {
    if (!string) return true;
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  },

  // Escapes HTML special characters to prevent XSS attacks
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  },

  // Converts minutes to human-readable format (e.g., "90 min" becomes "1h 30min")
  formatTime(minutes) {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  },

  // Truncates text to specified length and appends ellipsis if needed
  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  },

  // Maps difficulty level to corresponding CSS class name
  getDifficultyClass(difficulty) {
    const difficultyMap = {
      'Easy': 'difficulty-easy',
      'Medium': 'difficulty-medium',
      'Hard': 'difficulty-hard'
    };
    return difficultyMap[difficulty] || '';
  },

  // Converts textarea input into array by splitting on newlines and removing empty lines
  parseTextareaToArray(text) {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  },

  // Converts array to textarea-friendly format with newline separators
  arrayToTextarea(array) {
    return array.join('\n');
  }
};
