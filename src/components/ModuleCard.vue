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

<template>
    <div class="col">
        <div class="card shadow-sm border-primary border-opacity-25">
            <div class="card-header text-bg-primary border-primary border-opacity-25 bg-opacity-75">
                {{ props.shortname }}: {{ props.moduleid }}
            </div>
            <div class="card-body bg-primary bg-opacity-10">
                <h6 class="card-subtitle">{{ props.longname }}</h6>
                <p class="card-text">Hier könnte zusätzlich noch ein Beschreibungstext rein.</p>
                <div class="d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-sm btn-outline-danger w-25 mx-2">PvP</button>
                    <button type="button" class="btn btn-sm btn-outline-success w-25 mx-2">Koop</button>
                </div>
            </div>
        </div>
    </div>
</template>