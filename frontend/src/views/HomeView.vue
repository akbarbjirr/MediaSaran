<script setup lang="ts">
import { ref } from 'vue';
import { store } from '../store';
import ScoutLogo from '../components/ScoutLogo.vue';

const category = ref('Kegiatan');
const message = ref('');
const submitted = ref(false);

const submitSaran = () => {
  if (!message.value.trim()) return;
  store.addSuggestion(category.value, message.value);
  message.value = '';
  submitted.value = true;
};
</script>

<template>
  <div class="container fade-in" style="padding-top: 80px; padding-bottom: 80px;">
    <header class="text-center mb-4">
      <div style="display: inline-block; padding: 20px; background: white; border-radius: 50%; box-shadow: var(--shadow); margin-bottom: 24px;">
        <ScoutLogo style="width: 60px; height: 60px;" />
      </div>
      <h1>MediaSaran</h1>
      <p class="subtitle">Sampaikan aspirasi kamu untuk Pramuka yang lebih baik.</p>
    </header>

    <main>
      <div v-if="submitted" class="glass-card text-center fade-in">
        <div style="font-size: 4rem; margin-bottom: 20px;">✨</div>
        <h2>Terima Kasih!</h2>
        <p style="color: var(--text-muted); margin-bottom: 32px; margin-top: 12px; font-size: 1.1rem;">
          Saran kamu telah kami terima dan akan segera ditinjau oleh pengurus.
        </p>
        <button @click="submitted = false" class="btn" style="max-width: 200px;">Kirim Lagi</button>
      </div>

      <div v-else class="glass-card fade-in">
        <form @submit.prevent="submitSaran">
          <div class="form-group">
            <label>Pilih Kategori</label>
            <div class="category-grid">
              <div 
                v-for="cat in ['Kegiatan', 'Materi', 'Fasilitas', 'Anggota', 'Lainnya']" 
                :key="cat"
                @click="category = cat"
                :class="['chip', { active: category === cat }]"
              >
                {{ cat }}
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Isi Pesan / Saran</label>
            <textarea 
              v-model="message" 
              class="textarea" 
              placeholder="Tulis saran atau kritik kamu secara detail di sini..."
              required
            ></textarea>
          </div>

          <button type="submit" class="btn" :disabled="!message.trim()">
            Kirim Aspirasi Sekarang
          </button>
        </form>
      </div>
    </main>

    <footer class="text-center mt-4">
      <p style="font-size: 0.9rem; color: var(--text-muted); opacity: 0.7;">&copy; 2026 MediaSaran Pramuka</p>
      <router-link to="/admin/login" style="font-size: 0.85rem; color: var(--primary); text-decoration: none; margin-top: 16px; display: inline-block; font-weight: 600;">Panel Admin</router-link>
    </footer>
  </div>
</template>

<style scoped>
</style>
