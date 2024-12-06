<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import SectionCard from '@/components/SectionCard.vue';

const route = useRoute();
const module = ref(null);
const questionnaires = ref([]);

//modules where RouterLink
onMounted(() => {
  const moduleId = route.params.moduleid;
  getDoc(doc(getFirestore(), 'module', moduleId))
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        module.value = { id: docSnapshot.id, ...docSnapshot.data() };
      }
    });
});

//questionnaires where moduleID == moduleId
onMounted(async () => {
  const moduleId = route.params.moduleid;

  const db = getFirestore();
  const moduleRef = doc(db, 'module', moduleId);

  const questionnairesQuery = query(
    collection(db, "questionnaires"),
    where("moduleID", "==", moduleRef)
  );

  const questionnairesSnapshot = await getDocs(questionnairesQuery);

  const questionnairesData = await Promise.all(
    questionnairesSnapshot.docs.map(async (questionnaireDoc) => {
      const sectionsSnapshot = await getDocs(collection(questionnaireDoc.ref, 'sections'));
      const sections = sectionsSnapshot.docs.map(sectionDoc => ({
        id: sectionDoc.id,
        ...sectionDoc.data()
      }));

      return {
        id: questionnaireDoc.id,
        ...questionnaireDoc.data(),
        sections
      };
    })
  );

  questionnaires.value = questionnairesData;

});

</script>


<template>
  <div class="header_container">
    <header>
      <h1>Lektionen</h1>
      <button>+</button>
    </header>

    <div v-if="module" class="module_details">
      <h1>{{ module.shortname }}</h1>
      <p>{{ module.longname }}</p>
    </div>
  </div>

  <div class="options_container">
    <div v-for="questionnaire in questionnaires" :key="questionnaire.id">
      <!-- <h2>{{ questionnaire.id }}</h2> -->
      <div v-for="section in questionnaire.sections" :key="section.id">
        <SectionCard
        :questionnaireid="questionnaire.id"
        :name="section.name"
        :number="section.number" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.module_details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.header_container {
  max-width: 1000px;
  margin: 0 auto;
}

header {
  margin-bottom: 10px;
  margin-top: 30px;
  display: flex;
  align-items: center;
}

header h1 {
  font-weight: bold;
  margin-right: 30px;
}

header input {
  border: none;
  background-color: rgb(214, 214, 214);
  padding: 10px;
  border-radius: 5px;
}

header button {
  border: none;
  background-color: rgb(214, 214, 214);
  padding: 10px;
  border-radius: 5px;
  margin-left: 30px;
  width: 40px;
  font-size: 20px;
}

.options_container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>