<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { store, type Suggestion } from '../store';

const router = useRouter();
type FilterType = 'all' | Suggestion['status'];
const activeFilter = ref<FilterType>('all');
const filters: FilterType[] = ['all', 'pending', 'read', 'archived'];

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
  <div style="min-height: 100vh; padding-bottom: 80px;">
    <nav class="dashboard-nav" style="background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border-bottom: 1px solid var(--glass-border); padding: 20px 0; margin-bottom: 40px; position: sticky; top: 0; z-index: 100;">
      <div class="container" style="max-width: 900px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <ScoutLogo style="width: 32px; height: 32px;" />
          <h2 style="font-size: 1.2rem; margin: 0; color: var(--primary-dark); font-weight: 800;">Admin Panel</h2>
        </div>
        <button @click="handleLogout" style="background: rgba(211, 47, 47, 0.1); border: none; color: #d32f2f; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; font-weight: 700; transition: all 0.2s;">Keluar</button>
      </div>
    </nav>

    <div class="container" style="max-width: 900px;">
      <div class="glass-card" style="padding: 12px; margin-bottom: 32px;">
        <div class="filter-container" style="display: flex; gap: 8px; overflow-x: auto; padding: 4px;">
          <button 
            v-for="f in filters" 
            :key="f"
            @click="activeFilter = f"
            class="filter-btn"
            :style="{
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              background: activeFilter === f ? 'var(--primary)' : 'transparent',
              color: activeFilter === f ? 'white' : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '700',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              flex: '1'
            }"
          >
            {{ f.charAt(0).toUpperCase() + f.slice(1) }}
          </button>
        </div>
      </div>

      <div v-if="filteredSuggestions.length === 0" class="glass-card text-center" style="color: var(--text-muted); padding: 80px 20px;">
        <div style="font-size: 3rem; margin-bottom: 16px; opacity: 0.3;">📂</div>
        <p style="font-size: 1.1rem; font-weight: 600;">Belum ada saran untuk kategori ini.</p>
      </div>

      <div v-for="saran in filteredSuggestions" :key="saran.id" class="glass-card fade-in" style="padding: 24px;">
        <div class="card-header">
          <span class="badge" :style="{
            background: saran.status === 'pending' ? '#fff3e0' : (saran.status === 'read' ? '#e3f2fd' : '#eceff1'),
            color: saran.status === 'pending' ? '#ef6c00' : (saran.status === 'read' ? '#1976d2' : '#546e7a')
          }">
            {{ saran.category }}
          </span>
          <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">{{ formatDate(saran.createdAt) }}</span>
        </div>
        
        <p style="white-space: pre-wrap; margin-bottom: 24px; font-size: 1.05rem; color: #333; line-height: 1.7;">{{ saran.message }}</p>
        
        <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 20px;">
          <div class="status-selector" style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Status:</span>
            <select 
              :value="saran.status" 
              @change="(e) => updateStatus(saran.id, (e.target as HTMLSelectElement).value as Suggestion['status'])"
              class="select"
              style="width: auto; padding: 6px 12px; font-size: 0.85rem; background: white;"
            >
              <option value="pending">⏳ Pending</option>
              <option value="read">✅ Dibaca</option>
              <option value="archived">📦 Diarsipkan</option>
            </select>
          </div>
          
          <button @click="deleteSaran(saran.id)" style="background: none; border: none; color: #ff5252; cursor: pointer; font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; gap: 4px;">
            <span>🗑️</span> Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
