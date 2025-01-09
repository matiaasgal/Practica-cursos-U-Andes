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
            form2: false,
            newId: 7,
            totalAlumnos: 0,
            totalInscritos: 0,
            totalCupos: 0,
            totalTerminados: 0,
            totalActivos: 0,
            totalCursos: 0,
        }
    },
    computed:{
        ...mapState(useCounterStore, ['cursos']),
    },
    methods: {
            ...mapActions(useCounterStore, ['editarCurso', 'eliminarCurso']),
            mostrarAgregar(){
                console.log("SE AGREGARA UN NUEVO CURSO");
                this.form2 = true
            },
            agregandoCurso(){
                this.form2 = false;
                let cursoAgregar = {
                    id: this.newId,
                    img: this.curso.img,
                    nombre: this.curso.nombre,
                    costo: this.curso.costo,
                    duracion: this.curso.duracion,
                    cupos: this.curso.cupos,
                    inscritos: this.curso.inscritos,
                    completado: this.curso.completado,
                    fecha_registro: this.curso.fecha_registro,
                    descripcion: this.curso.descripcion,
                }
                this.newId++
                console.log('EL OBJETO QUE SE ENVIARA AL STATE ES: ', cursoAgregar)
                this.agregarCurso(cursoAgregar)
                console.log('CURSO ENVIADO SIN PROBLEMAS POR PARTE DE ADMINISTRACION.VUE')
            },
            mostrarForm(cursoEditar) {
                console.log('el curso que se editara es: ', cursoEditar.id)
                this.curso = { ...cursoEditar };
                this.form = true
            },
            modificarCurso() {
                this.form = false;
                console.log('EL CURSO QUE SE VA A EDITAR ES EL CURSO CON EL ID: ', this.curso.id)

                let cursoEditado = {
                    id: this.curso.id,
                    img: this.curso.img,
                    nombre: this.curso.nombre,
                    costo: this.curso.costo,
                    duracion: this.curso.duracion,
                    cupos: this.curso.cupos,
                    inscritos: this.curso.inscritos,
                    completado: this.curso.completado,
                    fecha_registro: this.curso.fecha_registro,
                    descripcion: this.curso.descripcion,
                }
                console.log('EL OBJETO QUE SE ENVIARA AL STATE ES: ', cursoEditado)
                this.editarCurso(cursoEditado)
                console.log('CURSO ENVIADO SIN PROBLEMAS POR PARTE DE ADMINISTRACION.VUE')

            },
            limpiarForm(){
                this.curso = {
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
                };
            },
            borrarCurso(cursoEliminar) {
                console.log('el curso que se eliminara es: ', cursoEliminar.id)
                this.eliminarCurso(cursoEliminar);
            },
            cancelarModificacion(){
                this.form = false;
                this.form2 = false;
                this.limpiarForm()
            }
    }
}
</script>
<template>
    <div class="container text-center">
        <h1 class="mt-3">{{ title }}</h1>
        <button class="btn btn-primary mt-5" @click.prevent="mostrarAgregar">{{ button }}</button>

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
                    <td><i class="bi bi-pencil-square text-warning me-2" @click="mostrarForm(cantCursos)" role="button" title="Editar"></i><i class="bi bi-trash text-danger" @click="borrarCurso(cantCursos)" role="button" title="Eliminar"></i></td>
                </tr>
            </tbody>
        </table>
        <form v-if="form" class="mt-4 p-3 border-rounded shadow-sm">
            <input id="input1" type="text" placeholder="URL de imagen" v-model="this.curso.img">
            <input id="input2" type="text" placeholder="Nombre" v-model="this.curso.nombre">
            <input id="input3" type="number" placeholder="Cupos" v-model="this.curso.cupos">
            <input id="input4" type="number" placeholder="Inscritos" v-model="this.curso.inscritos">
            <input id="input5" type="text" placeholder="Duracion" v-model="this.curso.duracion">
            <input id="input6" type="number" placeholder="Costo" v-model="this.curso.costo">
            <select v-model="curso.completado" polaceholder="Terminado">
                <option :value="true">Sí</option>
                <option :value="false">No</option>
            </select>
            <input id="input7" type="text" placeholder="Fecha de registro" v-model="this.curso.fecha_registro">
            <input id="input8" type="text" placeholder="Descripcion" v-model="this.curso.descripcion">
            <hr>
            <div class="d-flex justify-content-center mt-3">
                <button @click.prevent="modificarCurso" class="btn btn-primary me-2">Modificar</button>
                <button @click.prevent="cancelarModificacion" class="btn btn-danger">Cancelar</button>
            </div>
        </form>
        <form v-if="form2" class="mt-4 p-3 border-rounded shadow-sm">
            <input id="input1" type="text" placeholder="URL de imagen" v-model="this.curso.img">
            <input id="input2" type="text" placeholder="Nombre" v-model="this.curso.nombre">
            <input id="input3" type="number" placeholder="Cupos" v-model="this.curso.cupos">
            <input id="input4" type="number" placeholder="Inscritos" v-model="this.curso.inscritos">
            <input id="input5" type="text" placeholder="Duracion" v-model="this.curso.duracion">
            <input id="input6" type="number" placeholder="Costo" v-model="this.curso.costo">
            <select v-model="curso.completado" polaceholder="Terminado">
                <option :value="true">Sí</option>
                <option :value="false">No</option>
            </select>
            <input id="input7" type="text" placeholder="Fecha de registro" v-model="this.curso.fecha_registro">
            <input id="input8" type="text" placeholder="Descripcion" v-model="this.curso.descripcion">
            <hr>
            <div class="d-flex justify-content-center mt-3">
                <button @click.prevent="agregandoCurso" class="btn btn-primary me-2">Agregar</button>
                <button @click.prevent="limpiarForm" class="btn btn-warning me-2">Limpiar</button>
                <button @click.prevent="cancelarModificacion" class="btn btn-danger">Cancelar</button>
            </div>
        </form>
        <hr>
        <div class="alert alert-secondary" role="alert"><i class="bi bi-people-fill"></i> Cantidad total de alumnos permitidos: </div>
        <div class="alert alert-info" role="alert"><i class="bi bi-person-check"></i> Cantidad total de alumnos inscritos: </div>
        <div class="alert alert-danger" role="alert"><i class="bi bi-person-add"></i> Cantidad total de cupos restantes: </div>
        <div class="alert alert-dark" role="alert"><i class="bi bi-ban"></i> Cantidad total de cursos terminados: </div>
        <div class="alert alert-warning" role="alert"><i class="bi bi-bell"></i> Cantidad total de cursos activos: </div>
        <div class="alert alert-light" role="alert"><i class="bi bi-optical-audio-fill"></i> Cantidad total de cursos: </div>
    </div>
</template>

<style scoped>
#input1 {
    width: 30%;
    margin-right: 10px;
}
#input2 {
    width: 30%;
    margin-right: 10px;
}
#input3 {
    width: 4%;
    margin-right: 10px;
}
#input4 {
    width: 4%;
    margin-right: 10px;
}
#input5, #input6 {
    width: 8%;
    margin-right: 10px;
}
#input7 {
    margin-right: 10px;
}
#input7, #input8 {
    margin-top: 10px;
}
#input8 {
    width: 60%;
}
</style>