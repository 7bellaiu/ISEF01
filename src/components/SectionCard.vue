<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    questionnaireid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div class="section_card">
        <div class="section_card_text">
            <h3>Lektion {{ props.number }}: {{ props.name }}</h3>
        </div>
    </div>
</template>

<style scoped>
.section_card {
    width: 750px;
    overflow: hidden;
    border-radius: 2%;
    box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.1);
    cursor: pointer;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.section_card .section_card_text {
    padding: 0 10px;
}
</style>