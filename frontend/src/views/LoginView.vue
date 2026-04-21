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
  <div class="container fade-in" style="margin-top: 100px;">
    <div class="card">
      <div class="text-center mb-4">
        <ScoutLogo style="width: 40px; height: 40px; margin-bottom: 12px;" />
        <h2 style="font-size: 1.25rem;">Admin Login</h2>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="input" 
            placeholder="Masukkan password admin"
            required
          >
        </div>
        
        <p v-if="error" style="color: #d32f2f; font-size: 0.85rem; margin-bottom: 16px; text-align: center;">{{ error }}</p>
        
        <button type="submit" class="btn">Masuk</button>
      </form>
      
      <div class="text-center mt-4">
        <router-link to="/" style="font-size: 0.9rem; color: #666; text-decoration: none;">← Kembali</router-link>
      </div>
    </div>
  </div>
</template>
