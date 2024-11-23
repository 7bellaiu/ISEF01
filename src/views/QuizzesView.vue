<script setup>
import { ref, onMounted, computed } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ModuleCard from '@/components/ModuleCard.vue';

const modules = ref([]);
const search = ref("");
const top3Names = ref([]);

onMounted(() => {
  getDocs(collection(getFirestore(), 'module'))
    .then((moduleSnapshot) => {
      modules.value = moduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
});

const filteredModules = computed(() => {
  return modules.value.filter(module => {
    const searchTerm = search.value.toLowerCase();
    return (
      module.shortname.toLowerCase().includes(searchTerm) ||
      module.longname.toLowerCase().includes(searchTerm)
    );
  });
});

const top3Modules = computed(() => {
  return [filteredModules.value[0], filteredModules.value[1], filteredModules.value[3]]
});
</script>

<template>
  <main>
    <section class="py-2 text-center container">
      <div class="row py-lg-3">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">Module</h1>
          <p class="lead text-body-secondary">
            <span class="btn btn-outline-danger">PvP</span> startet ein Quiz zum gewählten Modul im Duell.
          </p>
          <p class="lead text-body-secondary">
            <span class="btn btn-outline-success">Koop</span> startet eine Runde als 2er Team.
          </p>
          <p>
            <!-- 'search' statt 'text' => for screen readers & browser + "x" to clear-->
            <!-- <input type="search" class="form-control" v-model="search" placeholder="Suchen..."> -->
            <input type="search" class="form-control" v-model="search"
              placeholder="Suche nach einem Modul für ein Quiz..." list="datalistOptions" id="exampleDataList">
            <!-- TODO: Testen mit mehr als 2 bzw. 3 und mehr Modulen -->
            <datalist id="datalistOptions">
              <option v-for="module in filteredModules" :value="module.longname"></option>
            </datalist>
          </p>
        </div>
      </div>
    </section>
    <section class="album py-3 container">
      <div class="row row-cols-1 row-cols-lg-2 row-cols-xxl-3 g-3">
        <div v-for="module in filteredModules" :moduleid="module.id" :shortname="module.shortname" class="col">
          <div class="card shadow-sm border-primary border-opacity-25">
            <div class="card-header text-bg-primary border-primary border-opacity-25 bg-opacity-75">{{ module.shortname
              }}</div>
            <div class="card-body bg-primary bg-opacity-10">
              <h6 class="card-subtitle">{{ module.longname }}</h6>
              <p class="card-text">Hier könnte zusätzlich noch ein Beschreibungstext rein.</p>
              <div class="d-flex justify-content-center align-items-center">
                <button type="button" class="btn btn-sm btn-outline-danger w-25 mx-2">PvP</button>
                <button type="button" class="btn btn-sm btn-outline-success w-25 mx-2">Koop</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.card {
  max-width: 30rem;
}
</style>
