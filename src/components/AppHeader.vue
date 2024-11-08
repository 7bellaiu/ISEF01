<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from '@/router';

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
        <section class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
                    <img src="../assets/logo.png" heigth="40" width="40" role="img"
                        aria-label="Equal's Counter Readings" alt="Logo" class="rounded-circle bg-light" />
                    <span class="text-white p-1">Quiz<span class="text-primary">iu</span>s Maximus</span>
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <router-link to="/" class="nav-link px-2 text-secondary">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/" class="nav-link px-2 text-white">Gamemodes</router-link>
                    </li>
                    <li>
                        <router-link to="/" class="nav-link px-2 text-white">Questionnaires</router-link>
                    </li>
                    <li>
                        <router-link to="/" class="nav-link px-2 text-white">Stats</router-link>
                    </li>
                    <li>
                        <router-link to="/" class="nav-link px-2 text-white">Edit Profile</router-link>
                    </li>
                </ul>

                <div v-if="!userLoggedIn" class="text-end">
                    <router-link type="button" class="btn btn-outline-primary me-2" to="/login">
                        Login
                    </router-link>
                    <router-link type="button" class="btn btn-primary" to="/register">Register</router-link>
                </div>

                <div v-else class="dropdown text-end">
                    <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="../assets/logo.PNG" alt="user" width="32" height="32"
                            class="rounded-circle bg-success" />
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