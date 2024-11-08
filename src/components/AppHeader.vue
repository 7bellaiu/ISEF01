<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from '@/router';
import AppLogo from './AppLogo.vue';

const userLoggedIn = ref(false);
const userName = ref("");

/** check whether user is logged in when loading this view*/
onMounted(() => {
    onAuthStateChanged(getAuth(), function (user) {
        if (!user) {
            userLoggedIn.value = false;
            router.push("/login");
        } else {
            userLoggedIn.value = true;
            userName.value = user.email;
        }
    });
});
</script>

<template>
    <header class="navbar bg-dark p-2" data-bs-theme="dark">
        <a href="/">
            <AppLogo />
        </a>
        <a href="/" class="text-decoration-none">
            <span class="text-white p-1 h2">Quiz<span class="text-primary">iu</span>s Maximus</span>
        </a>
        <div v-if="!userLoggedIn" class="dropdown">
            <router-link type="button" class="btn btn-outline-primary" to="/register">Register</router-link>
        </div>
        <div v-else>
            <button class="btn btn-dark navbar-toggler" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><router-link class="dropdown-item" to="/">My Profile</router-link></li>
                <li><router-link class="dropdown-item" to="/">Play Quiz</router-link></li>
                <li><router-link class="dropdown-item" to="/">Help & Contact</router-link></li>
                <li>
                    <hr class="dropdown-divider" />
                </li>
                <li><button class="dropdown-item" @click="signOut(getAuth());">Sign out</button></li>
            </ul>
        </div>
    </header>
</template>

