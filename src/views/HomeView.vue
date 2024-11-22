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
    <main class="d-flex justify-content-center">
        <fieldset v-if="userLoggedIn">
            <legend>Willkommen zurück {{ userName }}!</legend>
            <div class="d-flex justify-content-center">
                <!-- TODO: Eigene Komponente for Logout-Button -->
                <button @click="signOut(getAuth());" class="btn btn-danger w-50">Ausloggen</button>
            </div>
        </fieldset>
    </main>
</template>