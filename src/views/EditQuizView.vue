<script setup>
import EditQuizCard from '@/components/EditQuizCard.vue';
import { ref } from 'vue';

const quizBlock = ref([
  {
    question: '',
    answers: [
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
    ]
  }
]);

const addQuizBlock = () => {
  quizBlock.value.push({
    question: '',
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
</script>

<template>
  <main>
    <section class="py-4 text-center container">
      <div class="row py-lg-3">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">Quiz bearbeiten</h1>
        </div>
      </div>
    </section>

    <section class="album py-3 container">
      <div class="d-flex flex-column gap-3">
        <div class="col">
          <div class="card shadow-sm border-custom border-opacity-25">
            <div class="card-body bg-header bg-opacity-10 d-flex align-items-center">
              <h5 class="card-title me-3 fixed-width">Modulkürzel:</h5>
              <input type="text" class="form-control custom-input" placeholder="Modulkürzel" maxlength="100">
            </div>
            <div class="card-body bg-header bg-opacity-10 d-flex align-items-center">
              <h5 class="card-title me-3 fixed-width">Modulname:</h5>
              <input type="text" class="form-control custom-input" placeholder="Modulname" maxlength="100">
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
              <textarea v-model="block.question" class="form-control custom-input" placeholder="Quizfrage (max. 300 Zeichen)" maxlength="300"></textarea>
            </div>
            <div v-for="(answer, answerIndex) in block.answers" :key="answerIndex"
              class="card-body bg-custom bg-opacity-10 d-flex align-items-center">
              <h5 class="card-title me-3 fixed-width">{{ answerIndex + 1 }}. Antwort:</h5>
              <textarea v-model="answer.text" class="form-control custom-input cb-distance" placeholder="Antwortmöglichkeit" maxlength="300"></textarea>
              <input v-model="answer.correct" type="checkbox" :id="'answer' + index + '-' + answerIndex + '-correct'"
                class="me-1">
              <label :for="'answer' + index + '-' + answerIndex + '-correct'" class="me-2">Antwort korrekt</label>
            </div>

            <div class="card-body bg-custom bg-opacity-10 d-flex align-items-center justify-items-between">
              <button @click="removeQuizBlock(index)" type="button" class="btn btn-sm btn-outline-danger w-5 mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                </svg>
              </button>

              <button @click="addQuizBlock" type="button" class="btn btn-sm btn-outline-success w-5 mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>

  </main>
</template>