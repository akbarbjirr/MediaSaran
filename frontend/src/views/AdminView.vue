<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { store, type Suggestion } from '../store';

const router = useRouter();
const activeFilter = ref<'all' | 'pending' | 'read' | 'archived'>('all');

const filteredSuggestions = computed(() => {
  if (activeFilter.value === 'all') return store.suggestions;
  return store.suggestions.filter(s => s.status === activeFilter.value);
});

const formatDate = (timestamp: number) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(timestamp));
};

const handleLogout = () => {
  localStorage.removeItem('admin_session');
  router.push('/admin/login');
};

const updateStatus = (id: string, status: Suggestion['status']) => {
  store.updateStatus(id, status);
};

const deleteSaran = (id: string) => {
  if (confirm('Hapus saran?')) store.deleteSuggestion(id);
};
</script>

<template>
  <div style="background: #fcfcfc; min-height: 100vh;">
    <nav style="background: white; border-bottom: 1px solid #eee; padding: 16px 0; margin-bottom: 32px;">
      <div class="container" style="max-width: 800px; display: flex; justify-content: space-between; align-items: center;">
        <h2 style="font-size: 1.1rem; margin: 0;">Admin Dashboard</h2>
        <button @click="handleLogout" style="background: none; border: none; color: #666; cursor: pointer; font-size: 0.9rem; font-weight: 600;">Keluar</button>
      </div>
    </nav>

    <div class="container" style="max-width: 800px;">
      <div style="display: flex; gap: 8px; margin-bottom: 24px; overflow-x: auto; padding-bottom: 8px;">
        <button 
          v-for="f in ['all', 'pending', 'read', 'archived']" 
          :key="f"
          @click="activeFilter = f as any"
          :style="{
            padding: '6px 16px',
            borderRadius: '20px',
            border: activeFilter === f ? 'none' : '1px solid #ddd',
            background: activeFilter === f ? 'var(--primary)' : 'white',
            color: activeFilter === f ? 'white' : '#666',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '600',
            whiteSpace: 'nowrap'
          }"
        >
          {{ f.charAt(0).toUpperCase() + f.slice(1) }}
        </button>
      </div>

      <div v-if="filteredSuggestions.length === 0" class="card text-center" style="color: #999; padding: 60px;">
        Belum ada saran.
      </div>

      <div v-for="saran in filteredSuggestions" :key="saran.id" class="card fade-in" style="padding: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; align-items: center;">
          <span class="badge">{{ saran.category }}</span>
          <span style="font-size: 0.8rem; color: #999;">{{ formatDate(saran.createdAt) }}</span>
        </div>
        
        <p style="white-space: pre-wrap; margin-bottom: 20px; font-size: 1rem; color: #333;">{{ saran.message }}</p>
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f5f5f5; padding-top: 16px;">
          <select 
            :value="saran.status" 
            @change="(e) => updateStatus(saran.id, (e.target as HTMLSelectElement).value as any)"
            class="select"
            style="width: auto; padding: 4px 8px; font-size: 0.8rem;"
          >
            <option value="pending">Pending</option>
            <option value="read">Dibaca</option>
            <option value="archived">Diarsipkan</option>
          </select>
          
          <button @click="deleteSaran(saran.id)" style="background: none; border: none; color: #ff5252; cursor: pointer; font-size: 0.8rem; font-weight: 600;">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>
