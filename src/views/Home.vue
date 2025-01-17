<script>
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import { computed } from 'vue';

export default {
  computed:{
    ...mapState(useCounterStore, ['cursos']),
  }
}
</script>

<template>
  <div class="container d-flex flex-wrap justify-content-center">
    <div class="card m-3" id="card" style="width: 22rem;" v-for="cantCursos in cursos">
      <img v-bind:src=cantCursos.img class="card-img-top" v-bind:alt=cantCursos.nombre>
      <div class="card-body">
        <h5 class="card-title">{{ cantCursos.nombre }}</h5>
        <h6>Informacion:</h6>
        <p class="card-text">Costo: {{ cantCursos.costo }}</p>
        <p class="card-text">Duracion: {{ cantCursos.duracion }}</p>
        <p class="card-text">Cupos: {{ cantCursos.cupos }}</p>
        <p class="card-text">Completado: {{ cantCursos.completado }}</p>
        <p class="card-text">Fecha de registro: {{ cantCursos.fecha_registro }}</p>
        <p class="card-text fw-bold">Descripcion: {{ cantCursos.descripcion }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
template {
  background-color: gray;
}
</style>