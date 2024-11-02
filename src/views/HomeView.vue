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
            <legend>Welcome back {{ userName }}!</legend>
            <div class="d-flex justify-content-center">
                <button @click="signOut(getAuth());" class="btn btn-danger w-50">Logout</button>
            </div>
        </fieldset>
    </main>
</template>