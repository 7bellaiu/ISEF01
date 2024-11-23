<script setup>
import { ref, onMounted, computed } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ModuleCard from '@/components/ModuleCard.vue';

const modules = ref([]);
const search = ref("");

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
    <section class="py-4 text-center container">
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
        <ModuleCard v-for="module in filteredModules" :moduleid="module.id" :shortname="module.shortname"
          :longname="module.longname" />
      </div>
    </section>
  </main>
</template>