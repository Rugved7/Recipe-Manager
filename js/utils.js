const Utils = {
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
    
    isValidUrl(string) {
        if (!string) return true;
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    },
    
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
    
    formatTime(minutes) {
        if (minutes < 60) {
            return `${minutes} min`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    },
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    },
    
    getDifficultyClass(difficulty) {
        const difficultyMap = {
            'Easy': 'difficulty-easy',
            'Medium': 'difficulty-medium',
            'Hard': 'difficulty-hard'
        };
        return difficultyMap[difficulty] || '';
    },
    
    parseTextareaToArray(text) {
        return text
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
    },
    
    arrayToTextarea(array) {
        return array.join('\n');
    }
};