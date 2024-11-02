<script setup>
/** IMPORTS */
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Toast from "@/components/Toast.vue";

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

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            toastMessage.value = "Registration was successfull!";
            toastVariant.value = "success";
            triggerToast();
        })
        .catch((error) => {
            switch (error.code) {
                case "auth/weak-password":
                    toastMessage.value = "Your Password should be at least 6 characters long";
                    break;

                default:
                    toastMessage.value = error.code;
                    break;
            }
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

<template>
    <main class="d-flex justify-content-center">
        <div v-if="!userLoggedIn" class="p-3 mt-3 mb-3" style="width: 100%; max-width: 400px">
            <!-- Logo -->
            <img src="../assets/logo.jpeg" alt="Logo" class="mb-3" width="55%" height="25%" />
            <!-- Titel -->
            <h2 class="mb-3">Please register</h2>

            <!-- Login-Formular -->
            <form @submit.prevent="register" class="bg-body-tertiary">
                <div class="mb-2">
                    <input type="email" class="form-control" id="email" placeholder="Email address"
                        data-ddg-inputtype="credentials.username" v-model="email" required />
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" id="password" placeholder="Password"
                        data-ddg-inputtype="credentials.password.current" v-model="password" required />
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary w-100">Register</button>
                </div>
            </form>

            <!-- Erfolgs-/Fehlermeldung -->
            <Toast ref="toastRef" :message="toastMessage" :variant="toastVariant" />
        </div>
        <!-- <fieldset v-else>
            <legend>Welcome {{ userName }}!</legend>
            <div class="d-flex justify-content-center">
                <button @click="signOut(getAuth());" class="btn btn-danger w-100">Logout</button>
            </div>
        </fieldset> -->
    </main>
</template>