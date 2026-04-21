import { reactive } from 'vue';

export interface Suggestion {
  id: string;
  category: string;
  message: string;
  status: 'pending' | 'read' | 'archived';
  createdAt: number;
}

const STORAGE_KEY = 'media-saran-pramuka';

export const store = reactive({
  suggestions: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Suggestion[],
  
  addSuggestion(category: string, message: string) {
    const newSuggestion: Suggestion = {
      id: Date.now().toString(),
      category,
      message,
      status: 'pending',
      createdAt: Date.now()
    };
    this.suggestions.unshift(newSuggestion);
    this.save();
  },

  updateStatus(id: string, status: Suggestion['status']) {
    const suggestion = this.suggestions.find(s => s.id === id);
    if (suggestion) {
      suggestion.status = status;
      this.save();
    }
  },

  deleteSuggestion(id: string) {
    this.suggestions = this.suggestions.filter(s => s.id !== id);
    this.save();
  },

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.suggestions));
  }
});
