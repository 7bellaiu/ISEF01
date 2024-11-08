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
    <header class="p-3 text-bg-dark">
        <section class="row align-items-center justify-items-center">
            <div class="col-3">
                <a href="/">
                    <AppLogo />
                </a>
            </div>
            <div class="col-6 text-center">
                <a href="/" class="text-decoration-none">
                    <span class="text-white p-1 h2">Quiz<span class="text-primary">iu</span>s Maximus</span>
                </a>
            </div>
            <div class="col-3">
                <div v-if="!userLoggedIn" class="text-end">
                    <router-link type="button" class="btn btn-outline-primary" to="/register">Register</router-link>
                </div>

                <div v-else class="dropdown text-end">
                    <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="../assets/logo.PNG" class="bg-secondary logo-img" />
                    </a>
                    <ul class="dropdown-menu text-small">
                        <li>
                            <router-link class="dropdown-item" to="/">Home</router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/">Gamemodes</router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/">Questionnaires</router-link>
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/">Stats</router-link>
                        </li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>
                        <li>
                            <router-link class="dropdown-item" to="/">Edit Profile</router-link>
                        </li>
                        <li>
                            <button class="dropdown-item" @click="signOut(getAuth());">Sign out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </header>
</template>

<style scoped>
.logo-img {
    width: 15%;
    /* Relative Breite */
    height: auto;
    /* Erhält das Seitenverhältnis */
    min-width: 40px;
    /* Minimale Breite */
    max-width: 80px;
    /* Maximale Breite */
    min-height: 40px;
    /* Minimale Höhe */
    max-height: 80px;
    /* Maximale Höhe */
}
</style>