// Cache functions for games and gameweeks

const DAY_IN_MS = 24 * 60 * 60 * 1000; // Default cache duration 24hrs in milliseconds

// Set cached data
export const setCachedData = (key, data) => {
    const item = {
        data,
        timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(item));
}

// Get cached data
export const getCachedData = (key, duration = DAY_IN_MS) => {
    const item = JSON.parse(localStorage.getItem(key));
    if(!item) return null;

    const now = Date.now();
    
    // if the item is older than "duration" (default 1 day), remove it from cache and return null
    if(now - item.timestamp > duration) {
        localStorage.removeItem(key);
        return null;
    }

    return item.data;
}