<script setup>
import { EmailAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import Toast from "@/components/Toast.vue";


const toastRef = ref(null);
const toastMessage = ref("");
const toastVariant = ref("");

const userLoggedIn = ref(false);
const changeProfileData = ref(false);
const changePassword = ref(false);
const username = ref("");
const currentUsername = ref("");
const email = ref("");
const currentEmail = ref("");
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

onMounted(() => {
    onAuthStateChanged(getAuth(), function (user) {
        if (!user) {
            userLoggedIn.value = false;
        } else {
            userLoggedIn.value = true;
            username.value = user.displayName;
            email.value = user.email;
        }
    });
});

/** HANDLER */
const updateProfile = () => {
    if (changePassword.value) {
        if (newPassword.value !== confirmPassword.value) {
            toastMessage.value = "Die eingegebenen Passwörter stimmen nicht überein!";
            toastVariant.value = "warning"
            triggerToast();
            return;
        } else if (newPassword.value === currentPassword.value) {
            toastMessage.value = "Das neue und alte Passwort dürfen nicht identisch sein!";
            toastVariant.value = "warning"
            triggerToast();
            return;
        } else {
            reauthenticateWithCredential(getAuth().currentUser, EmailAuthProvider.credential(currentEmail.value, currentPassword.value))
                .then(() => {
                    console.log('reauthentication succeeded');
                    updatePassword(getAuth().currentUser, newPassword.value)
                        .then(() => {
                            console.log('updatePassword succeeded');
                            toastMessage.value = 'Das Passwort wurde erfolgreich aktualisiert';
                            toastVariant.value = "success";
                            triggerToast();
                            handleDiscard();
                        })
                        .catch((updatePasswordError) => {
                            // Firebase: Missing password requirements: [Password must contain at least 12 characters, Password must contain a numeric character, Password must contain a non-alphanumeric character] (auth/password-does-not-meet-requirements).
                            console.error('updatePasswordError: ', updatePasswordError);
                            toastMessage.value = updatePasswordError.message;
                            toastVariant.value = "danger";
                            triggerToast();
                        });
                })
                .catch((reauthenticationError) => {
                    switch (reauthenticationError.code) {
                        case 'auth/invalid-credential':
                            toastMessage.value = 'Das eingegebene aktuelle Passwort ist falsch!';
                            break;

                        default:
                            toastMessage.value = reauthenticationError.code;
                            break;
                    }
                    console.error('reauthenticationError: ', reauthenticationError);
                    toastVariant.value = "danger";
                    triggerToast();
                });
        }
    }

    if (changeProfileData.value) {
        // TODO: Validierung der Eingaben
        // nichts leer (nach trim)
        // newUsername !== currentUserName
        // newUsername > 5 Zeichen
        // newMail !== invalid && !== currentMail
        if (!currentUsername.value) {
            currentUsername.value = '';
        }

        if (!username.value || !email.value) {
            console.log("Fehler 1");
            //Toast
        } else if (username.value.trim() === currentUsername.value.trim() || email.value.trim() === currentEmail.value.trim()) {
            console.log("Fehler 3");
        } else if (username.value.trim() === '' || email.value.trim() === '') {
            console.log("Fehler 3");
        } else {
            // TODO: Neue Profildaten übernehmen
        }
    }
};

const handleChange = () => {
    changeProfileData.value = true;
    currentUsername.value = username.value;
    currentEmail.value = email.value;
};

const handlePassword = () => {
    changePassword.value = true;
};

const handleDiscard = () => {
    changeProfileData.value = false;
    changePassword.value = false;
    username.value = currentUsername.value;
    email.value = currentEmail.value;
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
};

/** UTILITY */
const triggerToast = () => {
    if (toastRef.value) {
        toastRef.value.showToast();
    }
};
</script>

<template>
    <main>
        <section class="row justify-content-center">
            <article class="p-3 mt-3 mb-3" style="width: 100%; max-width: 400px">
                <h2 class="mb-3 text-center">Mein Profil</h2>

                <form v-if="userLoggedIn" @submit.prevent="updateProfile">
                    <!-- username -->
                    <div class="input-group mb-2">
                        <div class="input-group-text" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-person" viewBox="0 0 16 16">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                        </div>
                        <input type="text" class="form-control" id="username" placeholder="Benutzername"
                            aria-label="Benutzername" data-ddg-inputtype="credentials.username" v-model="username"
                            :disabled="!changeProfileData" :required="changeProfileData">
                    </div>
                    <!-- email -->
                    <div class="input-group mb-2">
                        <div class="input-group-text" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-envelope" viewBox="0 0 16 16">
                                <path
                                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                            </svg>
                        </div>
                        <input type="email" class="form-control" id="email" placeholder="E-Mail" aria-label="E-Mail"
                            data-ddg-inputtype="credentials.email" v-model="email" :disabled="!changeProfileData"
                            :required="changeProfileData" />
                    </div>
                    <!-- current password -->
                    <div v-if="changePassword" class="input-group mb-2">
                        <div class="input-group-text" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-lock" viewBox="0 0 16 16">
                                <path
                                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                            </svg>
                        </div>
                        <input type="password" class="form-control" id="currentPassword"
                            placeholder="Aktuelles Passwort" aria-label="Aktuelles Passwort"
                            data-ddg-inputtype="credentials.password.current" v-model="currentPassword"
                            :disabled="!changePassword" :required="changePassword" />
                    </div>
                    <!-- new password -->
                    <div v-if="changePassword && currentPassword.trim() !== ''" class="input-group mb-2">
                        <div class="input-group-text" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-lock" viewBox="0 0 16 16">
                                <path
                                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                            </svg>
                        </div>
                        <input type="password" class="form-control" id="newPassword" placeholder="Neues Passwort"
                            aria-label="Neues Passwort" data-ddg-inputtype="credentials.password.new"
                            v-model="newPassword" :disabled="!changePassword" :required="changePassword" />
                    </div>
                    <!-- confirm new password -->
                    <div v-if="changePassword && newPassword.trim() !== ''" class="input-group mb-2">
                        <div class="input-group-text" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-lock" viewBox="0 0 16 16">
                                <path
                                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                            </svg>
                        </div>
                        <input type="password" class="form-control" id="confirmPassword"
                            placeholder="Neues Passwort bestätigen" aria-label="Neues Passwort bestätigen"
                            data-ddg-inputtype="credentials.password.confirmation" v-model="confirmPassword"
                            :disabled="!changePassword" :required="changePassword" />
                    </div>

                    <div v-if="changeProfileData || changePassword" class="d-flex justify-content-between mt-3">
                        <button @click="handleDiscard" class="btn btn-outline-danger"
                            :disabled="!changeProfileData && !changePassword">Abbrechen</button>
                        <button class="btn btn-primary w-50"
                            :disabled="!changeProfileData && !changePassword">Speichern</button>
                    </div>
                    <div v-else class="d-flex justify-content-between mt-3">
                        <button @click="handlePassword" class="btn btn-secondary" :disabled="changePassword">Passwort
                            ändern</button>
                        <button @click="handleChange" class="btn btn-primary" :disabled="changeProfileData">Daten
                            bearbeiten</button>
                    </div>
                </form>
                <!-- Erfolgs-/Fehlermeldung -->
                <Toast ref="toastRef" :message="toastMessage" :variant="toastVariant" />
            </article>
        </section>
        <section class="row justify-content-center">
            <article class="row justify-content-center">
                <h2 class="mb-3 text-center">Meine Statistik</h2>
            </article>
        </section>
    </main>
</template>