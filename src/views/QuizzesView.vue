<script setup>
import { ref, onMounted, computed } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ModuleCard from '@/components/ModuleCard.vue';

    const modules = ref([]);
    const search = ref("");

    onMounted(() => {
        getDocs(collection(getFirestore(), 'module'))
        .then((moduleSnapshot) =>{
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

</script>



<template>
  <div class="container">
    <header>
      <h1>Quizze</h1>
      <input type="text" v-model="search" placeholder="Suchen...">
      <button>+</button>
    </header>
    <div class="options-container">
      <ModuleCard v-for="module in filteredModules"
      :moduleid="module.id"
      :shortname="module.shortname"
      :longname="module.longname"
      />
    </div>
  </div>
</template>





<style scoped>
.container {
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

.options-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
}



</style>
