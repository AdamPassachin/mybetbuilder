// Cache functions for games and gameweeks
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_HOURS = 3 * 60 * 60 * 1000;
const FIVE_MINUTES = 5 * 60 * 1000;

// Set cached data with optional persistence flag
export const setCachedData = (key, data, isPersistent = false) => {
    const item = {
        data,
        timestamp: Date.now(),
        _p: isPersistent
    };
    localStorage.setItem(key, JSON.stringify(item));
}

// Get cached data with optional game time awareness
export const getCachedData = (key, gameTime = null) => {
    const item = JSON.parse(localStorage.getItem(key));
    if(!item) return null;

    // Return immediately if item is marked as persistent
    if (item._p) {
        return item.data;
    }

    const now = Date.now();
    
    // If gameTime is provided, use dynamic duration based on game proximity
    if (gameTime) {
        const timeUntilGame = gameTime - now;
        const isWithinHour = timeUntilGame <= 60 * 60 * 1000;
        
        // Use 5min cache if within hour of game, otherwise 3hr cache
        const duration = isWithinHour ? FIVE_MINUTES : THREE_HOURS;
        
        if (now - item.timestamp > duration) {
            localStorage.removeItem(key);
            return null;
        }
    } else {
        // Default 24hr cache for non-game related data
        if (now - item.timestamp > DAY_IN_MS) {
            localStorage.removeItem(key);
            return null;
        }
    }

    return item.data;
}