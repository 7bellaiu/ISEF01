<script setup>
const props = defineProps({
    moduleid: {
        type: String,
        required: true
    },
    shortname: {
        type: String,
        required: true
    },
    longname: {
        type: String,
        required: true
    }
});
</script>

<!-- TODO: Hier Bootstrap reinbringen entsprechend Wireframe -->
<template>
    <div class="card">
        <div class="card-text">
            <h2>{{ props.shortname }}</h2>
            <p>{{ props.longname }}</p>
            <p>{{ props.moduleid }}</p>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 310px;
    overflow: hidden;
    border-radius: 2%;
    box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.1);
    margin-bottom: 35px;
    margin-right: 20px;
    cursor: pointer;
}

.card .card-text {
    padding: 0 5px;
}

.card .card-text h2 {
    font-weight: bold;
}
</style>