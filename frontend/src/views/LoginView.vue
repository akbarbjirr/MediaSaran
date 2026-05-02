<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ScoutLogo from '../components/ScoutLogo.vue';

const router = useRouter();
const password = ref('');
const error = ref('');

const handleLogin = () => {
  if (password.value === 'pramuka123') {
    localStorage.setItem('admin_session', 'true');
    router.push('/admin');
  } else {
    error.value = 'Password salah!';
  }
};
</script>

<template>
  <div class="container fade-in" style="margin-top: 100px; display: flex; justify-content: center; align-items: center; min-height: 70vh;">
    <div class="glass-card" style="width: 100%; max-width: 450px;">
      <div class="text-center mb-4">
        <div style="display: inline-block; padding: 16px; background: white; border-radius: 50%; box-shadow: var(--shadow); margin-bottom: 20px;">
          <ScoutLogo style="width: 40px; height: 40px;" />
        </div>
        <h2 style="font-size: 1.5rem; color: var(--primary-dark); font-weight: 800;">Admin Login</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Akses panel manajemen saran</p>
      </div>

      <form @submit.prevent="handleLogin" style="margin-top: 32px;">
        <div class="form-group">
          <label>Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="input" 
            placeholder="••••••••"
            required
          >
        </div>
        
        <div v-if="error" style="background: rgba(211, 47, 47, 0.1); color: #d32f2f; padding: 12px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 20px; text-align: center; font-weight: 600; border: 1px solid rgba(211, 47, 47, 0.2);">
          {{ error }}
        </div>
        
        <button type="submit" class="btn">Masuk ke Dashboard</button>
      </form>
      
      <div class="text-center mt-4">
        <router-link to="/" style="font-size: 0.9rem; color: var(--text-muted); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: color 0.2s;">
          <span>←</span> Kembali ke Beranda
        </router-link>
      </div>
    </div>
  </div>
</template>
