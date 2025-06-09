import { reactive, watchEffect } from "vue";

const STORAGE_KEY = "vue-reactive-store";

const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : { gates: [], connections: [], newConnectionNodes: [] };
    }
    return { gates: [], connections: [], newConnectionNodes: [] };
};

export const store = reactive(loadFromLocalStorage());

// Save to localStorage whenever the store changes
watchEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }
});
