<script>
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
    data() {
        return{
            title: 'Administracion',
            button: 'Agregar curso',
            curso: {
                id: 0,
                img: '',
                nombre: '',
                costo: 0,
                duracion: '',
                cupos: 0,
                inscritos: 0,
                completado: null,
                fecha_registro: '',
                descripcion: '',
            },
            form: false,
        }
    },
    computed:{
        ...mapState(useCounterStore, ['cursos']),
    },
    methods: {
            ...mapActions(useCounterStore, ['editarCurso']),
            mostrarForm(cursoEditar) {
                console.log('el curso que se editara es: ', cursoEditar.id)
                this.curso.id = cursoEditar.id
                this.form = true
            },
            modificarCurso() {
                this.form = false;
                console.log('EL CURSO QUE SE VA A EDITAR ES EL CURSO CON EL ID: ', this.curso.id)
                let ID = this.curso.id;
                let IMG = this.curso.img;
                let NOMBRE = this.curso.nombre;
                let COSTO = this.curso.costo;
                let DURACION = this.curso.duracion;
                let CUPOS = this.curso.cupos;
                let INSCRITOS = this.curso.inscritos;
                let COMPLETADO = this.curso.completado;
                let FECHA_REGISTRO = this.curso.fecha_registro;
                let DESCRIPCION = this.curso.descripcion;

                let cursoEditado = {
                    id: ID,
                    img: IMG,
                    nombre: NOMBRE,
                    costo: COSTO,
                    duracion: DURACION,
                    cupos: CUPOS,
                    inscritos: INSCRITOS,
                    completado: COMPLETADO,
                    fecha_registro: FECHA_REGISTRO,
                    descripcion: DESCRIPCION,
                }
                console.log('EL OBJETO QUE SE ENVIARA AL STATE ES: ', cursoEditado)
                this.editarCurso(cursoEditado)
                console.log('CURSO ENVIADO SIN PROBLEMAS POR PARTE DE ADMINISTRACION.VUE')

            },
            eliminarCurso(cursoEliminar) {
                console.log('el curso que se eliminara es: ', cursoEliminar.id)
            }
    }
}
</script>
<template>
    <div class="container text-center">
        <h1 class="mt-3">{{ title }}</h1>
        <button class="btn btn-primary mt-5">{{ button }}</button>

        <table class="table table-bordered mt-4">
            <thead class="table-light">
                <tr>
                    <th>Curso</th>
                    <th>Cupos</th>
                    <th>Inscritos</th>
                    <th>Duración</th>
                    <th>Costo</th>
                    <th>Terminado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cantCursos in cursos" :key="cantCursos.id">
                    <td>{{ cantCursos.nombre }}</td>
                    <td>{{ cantCursos.cupos }}</td>
                    <td>{{ cantCursos.inscritos }}</td>
                    <td>{{ cantCursos.duracion }}</td>
                    <td class="text-success">{{ cantCursos.costo }}</td>
                    <td><span :class="cantCursos.completado === true ? 'badge bg-success' : 'badge bg-secondary'">{{ cantCursos.completado }}</span></td>
                    <td>{{ cantCursos.fecha_registro }}</td>
                    <td><i class="bi bi-pencil-square text-warning me-2" @click="mostrarForm(cantCursos)" role="button" title="Editar"></i><i class="bi bi-trash text-danger" @click="eliminarCurso(cantCursos)" role="button" title="Eliminar"></i></td>
                </tr>
            </tbody>
        </table>
        <form v-if="form">
            <input type="text" placeholder="URL de imagen" v-model="this.curso.img">
            <input type="text" placeholder="Nombre" v-model="this.curso.nombre">
            <input type="number" placeholder="Costo" v-model="this.curso.costo">
            <input type="text" placeholder="Duracion" v-model="this.curso.duracion">
            <input type="number" placeholder="Cupos" v-model="this.curso.cupos">
            <input type="number" placeholder="Inscritos" v-model="this.curso.inscritos">
            <input type="text" placeholder="Completado (si/no)">
            <input type="text" placeholder="Fecha de registro" v-model="this.curso.fecha_registro">
            <input type="text" placeholder="Descripcion" v-model="this.curso.descripcion">

            <button @click.prevent="modificarCurso" class="btn btn-primary">Modificar</button>
        </form>
    </div>
</template>

<style scoped>
</style>