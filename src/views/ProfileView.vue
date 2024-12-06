<script setup>
// TODO: Split in drei Komponenten
import DisplayProfileForm from "@/components/Auth/DisplayProfileForm.vue"
// TODO: ChangePasswordForm als FOrmular-Kpmonente zur Passwort-Änderung
import ChangePasswordForm from "@/components/Auth/ChangePasswordForm.vue";
// TODO: ChangeUsernameFOrm als FOrmular-Komponente zur Username Änderung
import ChangeUsernameForm from "@/components/Auth/ChangeUsernameForm.vue";

import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Toast from "@/components/Toast.vue";

const toastRef = ref(null);
const toastMessage = ref("");
const toastVariant = ref("");

const username = ref("");
const displayData = ref(true);
const changePassword = ref(false);
const changeUsername = ref(false);

onMounted(() => {
    onAuthStateChanged(getAuth(), function (user) {
        if (user) {
            username.value = user.displayName;
        }
    });
});

/** HANDLERS for this view */
const handleChangePassword = () => {
    displayData.value = false;
    changeUsername.value = false;
    changePassword.value = true;
}

const handleChangeUsername = () => {
    displayData.value = false;
    changeUsername.value = true;
    changePassword.value = false;
}

const handleCancelEmit = (message) => {
    displayData.value = true;
    changeUsername.value = false;
    changePassword.value = false;
    toastMessage.value = message;
    toastVariant.variant = "warning"
    triggerToast();
}

const handleSuccessEmit = (message) => {
    displayData.value = true;
    changePassword.value = false;
    changeUsername.value = false
    toastMessage.value = message;
    toastVariant.value = "success";
    triggerToast();
}

const triggerToast = () => {
    if (toastRef.value) {
        toastRef.value.showToast();
    }
};

</script>

<template>
    <main>
        <section class="row justify-content-center">
            <article class="p-3 mt-3 mb-3 form-wrapper">
                <h2 class="mb-3 text-center">Profil von {{ username }}</h2>
                <DisplayProfileForm v-if="displayData" />
                <ChangePasswordForm v-else-if="changePassword" @success="handleSuccessEmit"
                    @cancel="handleCancelEmit" />
                <ChangeUsernameForm v-else-if="changeUsername" />
                <div v-if="!changeUsername && !changePassword" class="d-flex justify-content-between mt-3">
                    <button @click="handleChangePassword" class="btn btn-secondary" :disabled="changePassword">Passwort
                        ändern</button>
                    <button @click="handleChangeUsername" class="btn btn-primary" :disabled="changeUsername">Daten
                        bearbeiten</button>
                </div>
                <Toast ref="toastRef" :message="toastMessage" :variant="toastVariant" />
            </article>
        </section>
    </main>
</template>

<style scoped>
.form-wrapper {
    width: 100%;
    max-width: 400px;
}
</style>