<script setup>
import EditQuestionnairesCard from '@/components/EditQuestionnairesCard.vue';
import { ref, onMounted, computed } from 'vue';
import { getFirestore, collection, addDoc, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyARCmMDIU5LPjBMj_v_tYrhcUh8Aloynpo",
  authDomain: "isef01-quizius-maximus-v2.firebaseapp.com",
  projectId: "isef01-quizius-maximus-v2",
  storageBucket: "isef01-quizius-maximus-v2.appspot.com",
  messagingSenderId: "555791080708",
  appId: "1:555791080708:web:c890c0d237eb00c2764451"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const quizBlock = ref([
  {
    question: '',
    selectedAnswer: null, // Nur 1 CB darf pro Block ausgewählt werden
    answers: [
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
    ]
  }
]);

const moduleShortName = ref('');
const moduleLongName = ref('');

const addQuizBlock = () => {
  quizBlock.value.push({
    question: '',
    selectedAnswer: null, // Nur 1 CB darf pro Block ausgewählt werden
    answers: [
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
    ],
  });
};

const removeQuizBlock = (index) => {
  quizBlock.value.splice(index, 1);
};

const saveData = async () => {
  try {
    // Überprüfen, ob das Modul bereits existiert
    const moduleQuery = query(collection(db, 'module'), where('shortname', '==', moduleShortName.value));
    const moduleSnapshot = await getDocs(moduleQuery);

    let moduleId;
    if (moduleSnapshot.empty) {
      // Neues Modul erstellen
      const moduleDocRef = await addDoc(collection(db, 'module'), {
        shortname: moduleShortName.value,
        longname: moduleLongName.value
      });
      moduleId = moduleDocRef.id;
    } else {
      // Existierendes Modul verwenden
      moduleId = moduleSnapshot.docs[0].id;
      await updateDoc(doc(db, 'module', moduleId), {
        shortname: moduleShortName.value,
        longname: moduleLongName.value
      });
    }

    // Fragen und Antworten speichern
    const questionnaireDocRef = await addDoc(collection(db, 'questionnaires'), {
      moduleID: `module/${moduleId}`
    });

    for (const block of quizBlock.value) {
      await addDoc(collection(db, `questionnaires/${questionnaireDocRef.id}/questions`), {
        question: block.question,
        option1: block.answers[0].text,
        option2: block.answers[1].text,
        option3: block.answers[2].text,
        option4: block.answers[3].text,
        correctAnswer: `option${block.selectedAnswer + 1}`
      });
    }

    alert('Daten erfolgreich gespeichert!');
  } catch (error) {
    console.error('Fehler beim Speichern der Daten:', error);
    alert('Fehler beim Speichern der Daten.');
  }
};
</script>

<template>
  <main>
    <section class="py-4 text-center container">
      <div class="row py-lg-3">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">Quiz bearbeiten</h1>
          <button @click="saveData" type="button" class="btn btn-orange">Speichern</button>
        </div>
      </div>
    </section>

    <section class="album py-3 container">
      <div class="d-flex flex-column gap-3">
        <div class="col">
          <div class="card shadow-sm border-custom border-opacity-25">
            <div class="card-body bg-header bg-opacity-10 d-flex align-items-center">
              <h5 class="card-title me-3 fixed-width">Modulkürzel:</h5>
              <input v-model="moduleShortName" type="text" class="form-control custom-input" placeholder="Modulkürzel" maxlength="100" required>
            </div>
            <div class="card-body bg-header bg-opacity-10 d-flex align-items-center">
              <h5 class="card-title me-3 fixed-width">Modulname:</h5>
              <input v-model="moduleLongName" type="text" class="form-control custom-input" placeholder="Modulname" maxlength="100" required>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="album py-3 container">
      <div class="d-flex flex-column gap-3">
        <div v-for="(block, index) in quizBlock" :key="index" class="col">
          <div class="card shadow-sm border-custom border-opacity-25">
            <div class="card-body bg-custom bg-opacity-10 d-flex align-items-center">
              <h5 class="card-title me-3 fixed-width">{{ index + 1 }}. Frage:</h5>
              <textarea v-model="block.question" class="form-control custom-input" placeholder="Quizfrage (max. 300 Zeichen)" maxlength="300" required></textarea>
            </div>
            <div v-for="(answer, answerIndex) in block.answers" :key="answerIndex" class="card-body bg-custom bg-opacity-10 d-flex align-items-center">
              <h5 class="card-title me-3 fixed-width">{{ answerIndex + 1 }}. Antwort:</h5>
              <textarea v-model="answer.text" class="form-control custom-input cb-distance" placeholder="Antwortmöglichkeit" maxlength="300" required></textarea>
              <input v-model="block.selectedAnswer" type="radio" :value="answerIndex" :name="'answer' + index" class="me-1" required>
              <label :for="'answer' + index + '-' + answerIndex + '-correct'" class="me-2">Antwort korrekt</label>
            </div>

            <div class="card-body bg-custom bg-opacity-10 d-flex align-items-center justify-items-between">
              <button @click="removeQuizBlock(index)" type="button" class="btn btn-sm btn-outline-danger w-5 mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"/>
                </svg>
              </button>

              <button @click="addQuizBlock" type="button" class="btn btn-sm btn-outline-success w-5 mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>