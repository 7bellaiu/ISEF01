<script setup>
/** IMPORTS */
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Toast from "@/components/Toast.vue";
import AppLogo from "@/components/AppLogo.vue";

/** COMPONENT REFERENCES */
const router = useRouter();
const toastRef = ref(null);

/** STATES */
const userName = ref(""); //kein Vor- & Nachname, wegen Datenschutz (pers.bez. Daten)
const email = ref("");
const password = ref("");
const passwordRepeat = ref("");
const toastMessage = ref("");
const toastVariant = ref("");
const userLoggedIn = ref(false);
const acceptTermsAndPrivacy = ref(false);

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
    // TODO: Validation of Passwords
    // TODO: Validation of Username
    // TODO: Validation of Terms & Conditions && Privacy Policy
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
            <AppLogo variant="light"/>
            <!-- Titel -->
            <h2 class="mb-3">Bitte registrieren</h2>

            <!-- Login-Formular -->
            <form @submit.prevent="register" class="bg-body-tertiary">
                <!-- TODO: Username Input -->
                <div class="mb-2">
                    <input type="email" class="form-control" id="email" placeholder="Email address"
                        data-ddg-inputtype="credentials.username" v-model="email" required />
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" id="password" placeholder="Password"
                        data-ddg-inputtype="credentials.password.current" v-model="password" required />
                </div>
                <!-- TODO: Repeat Password -->
                <!-- TODO: Checkbox Agree T&C + PrivPol -->
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary w-100">Registrieren</button>
                </div>
                <!-- TODO: Add Textbox with Link to Home-View for Login -->
            </form>

            <!-- Erfolgs-/Fehlermeldung -->
            <Toast ref="toastRef" :message="toastMessage" :variant="toastVariant" />
        </div>
    </main>
</template>