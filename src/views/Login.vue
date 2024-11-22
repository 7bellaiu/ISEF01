<script setup>
/** IMPORTS */
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import Toast from "@/components/Toast.vue";
import AppLogo from "@/components/AppLogo.vue";

/** COMPONENT REFERENCES */
const router = useRouter();
const toastRef = ref(null);

/** STATES */
const email = ref("");
const password = ref("");
const toastMessage = ref("");
const toastVariant = ref("");
const userLoggedIn = ref(false);
// const userName = ref("");

/** check whether user is logged in when loading this view*/
onMounted(() => {
    onAuthStateChanged(getAuth(), function (user) {
        if (!user) {
            userLoggedIn.value = false;
        } else {
            userLoggedIn.value = true;
            // userName.value = user.email;
            router.push("/");
        }
    });
});

/** HANDLER */
const logIn = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            //console.log("Successfully logged in!", data);
            toastMessage.value = "Login was successfull!";
            toastVariant.value = "success";
            triggerToast();
        })
        .catch((error) => {
            toastMessage.value = "Login failed!";   //give no information bc hackers
            toastVariant.value = "danger";
            triggerToast();
        });
};

/** UTILITY */
const triggerToast = () => {
    if (toastRef.value) {
        toastRef.value.showToast();
    }
};
</script>

<!-- TODO: Alle Texte Deutsch-->
<template>
    <main class="d-flex justify-content-center">
        <div v-if="!userLoggedIn" class="p-3 mt-3 mb-3" style="width: 100%; max-width: 400px">
            <!-- Logo -->
            <AppLogo variant="light"/>
            <!-- Titel -->
            <h2 class="mb-3">Please sign in</h2>

            <!-- Login-Formular -->
            <form @submit.prevent="logIn" class="bg-body-tertiary">
                <div class="mb-2">
                    <input type="email" class="form-control" id="email" placeholder="Email address"
                        data-ddg-inputtype="credentials.username" v-model="email" required />
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" id="password" placeholder="Password"
                        data-ddg-inputtype="credentials.password.current" v-model="password" required />
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary w-100">Login</button>
                </div>
            </form>

            <!-- Toast Success/Failure -->
            <Toast ref="toastRef" :message="toastMessage" :variant="toastVariant" />
        </div>
    </main>
</template>