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
  <div class="container fade-in" style="padding-top: 60px; padding-bottom: 60px;">
    <header class="text-center mb-4">
      <ScoutLogo style="margin-bottom: 16px" />
      <h1>MediaSaran</h1>
    </header>

    <main>
      <div v-if="submitted" class="card text-center fade-in">
        <div style="font-size: 3rem; margin-bottom: 16px;">✅</div>
        <h2>Saran Terkirim</h2>
        <p style="color: #666; margin-bottom: 24px; margin-top: 8px;">Terima kasih atas kontribusinya untuk kemajuan eskul kita.</p>
        <button @click="submitted = false" class="btn">Kirim Lagi</button>
      </div>

      <div v-else class="card fade-in">
        <form @submit.prevent="submitSaran">
          <div class="form-group">
            <label>Pilih Kategori</label>
            <select v-model="category" class="select">
              <option>Kegiatan</option>
              <option>Fasilitas</option>
              <option>Anggota</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div class="form-group">
            <label>Isi Pesan / Saran</label>
            <textarea 
              v-model="message" 
              class="textarea" 
              placeholder="Tulis saran kamu di sini..."
              required
            ></textarea>
          </div>

          <button type="submit" class="btn" :disabled="!message.trim()">
            Kirim Saran
          </button>
        </form>
      </div>
    </main>

    <footer class="text-center mt-4">
      <p style="font-size: 0.8rem; color: #999;">&copy; 2026 MediaSaran</p>
      <router-link to="/admin/login" style="font-size: 0.8rem; color: #ccc; text-decoration: none; margin-top: 10px; display: inline-block;">Admin Login</router-link>
    </footer>
  </div>
</template>

<style scoped>
</style>
