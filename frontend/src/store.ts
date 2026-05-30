import { reactive } from 'vue';

export interface Suggestion {
  id: string;
  category: string;
  message: string;
  status: 'pending' | 'read' | 'archived';
  createdAt: number;
}



const API_URL = '/api';

export const store = reactive({
  suggestions: [] as Suggestion[],
  
  async loadSuggestions() {
    try {
      const res = await fetch(`${API_URL}/suggestions`);
      this.suggestions = await res.json();
    } catch (e) {
      console.error('Failed to load suggestions:', e);
    }
  },

  async addSuggestion(category: string, message: string) {
    try {
      const res = await fetch(`${API_URL}/suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, message })
      });
      const newSuggestion = await res.json();
      this.suggestions.unshift(newSuggestion);
    } catch (e) {
      console.error('Failed to add suggestion:', e);
    }
  },

  async updateStatus(id: string, status: Suggestion['status']) {
    try {
      await fetch(`${API_URL}/suggestion?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const suggestion = this.suggestions.find(s => s.id === id);
      if (suggestion) {
        suggestion.status = status;
      }
    } catch (e) {
      console.error('Failed to update status:', e);
    }
  },

  async deleteSuggestion(id: string) {
    try {
      await fetch(`${API_URL}/suggestion?id=${id}`, {
        method: 'DELETE'
      });
      this.suggestions = this.suggestions.filter(s => s.id !== id);
    } catch (e) {
      console.error('Failed to delete suggestion:', e);
    }
  }
});
store.loadSuggestions();
