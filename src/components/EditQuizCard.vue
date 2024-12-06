<script setup>
</script>

<template>
</template>

<style>
.bg-custom {
    background-color: #ffdcb0;
}

.custom-input {
    background-color: #fff8ef;
}

.fixed-width {
    width: 15ch;             /*ch = Breite des Zeichens '0' der aktuellen Schriftart*/
    white-space: nowrap;     /*Verhindert Zeilenumbrüche*/
    overflow: hidden;        /*Versteckt überflüssigen Text*/
    text-overflow: ellipsis; /*Fügt '...' hinzu, wenn der Text zu lang ist*/
}

.bg-header {
    background-color: #ee9426;
}

.me-1 {
    margin-left: 0.25rem;
}

.me-2 {
    white-space: nowrap;
}

.cb-distance {
    margin-right: 2rem;      /*Abstand zu Checkboxen*/   
}

.btn.w-5 {
    width: 5%;    /*kleinere Breite. important = Überschreiben von w-25*/
}

</style>