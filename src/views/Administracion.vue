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
            contenedor: {},
            form: false,
            newId: 7,
        }
    },
    computed:{
        ...mapState(useCounterStore, ['cursos']),
        obtenerFechaActual() {
            const fechaActual = new Date();
            const dia = String(fechaActual.getDate()).padStart(2, '0');
            const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
            const year = fechaActual.getFullYear();
            return `${dia}/${mes}/${year}`;
        },
        totalCupos() {
            return this.cursos.reduce((sum, curso) => sum + curso.cupos, 0);
        },
        totalInscritos() {
            return this.cursos.reduce((sum, curso) => sum + curso.inscritos, 0);
        },
        cuposRestantes() {
            return this.cursos.reduce((sum, curso) => sum + (curso.cupos - curso.inscritos), 0);
        },
        cursosTerminados() {
            return this.cursos.filter(curso => curso.completado).length;
        },
        cursosActivos() {
            return this.cursos.filter(curso => !curso.completado).length;
        },
        totalCursos() {
            return this.cursos.length;
        },
    },
    methods: {
            ...mapActions(useCounterStore, ['editarCurso', 'eliminarCurso', 'agregarCurso']),

            //INTERACTUAN CON EL STORE
            agregandoCurso(){
                let cursoAgregar = {
                    id: this.newId,
                    nombre: this.curso.nombre,
                    img: this.curso.img,
                    cupos: this.curso.cupos,
                    inscritos: this.curso.inscritos,
                    duracion: this.curso.duracion,
                    costo: this.curso.costo,
                    descripcion: this.curso.descripcion,
                    completado: false,
                    fecha_registro: this.obtenerFechaActual,
                }
                this.newId++
                if (cursoAgregar.nombre === '' || cursoAgregar.costo === 0 || cursoAgregar.duracion === '' || cursoAgregar.cupos === 0) {
                    alert('Por favor ingrese correctamente los datos')
                    this.limpiarForm
                }
                else if (cursoAgregar.inscritos > cursoAgregar.cupos) {
                    alert('La cantidad de inscritos es mayor a la cantidad de cupos que tiene el curso...')
                }
                else {
                    if (cursoAgregar.completado)
                    console.log('EL OBJETO QUE SE ENVIARA AL STATE ES: ', cursoAgregar)
                    this.agregarCurso(cursoAgregar)
                    console.log('CURSO ENVIADO SIN PROBLEMAS POR PARTE DE ADMINISTRACION.VUE')
                }
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
                if (cursoEditado.nombre === '' || cursoEditado.costo === 0 || cursoEditado.duracion === '' || cursoEditado.cupos === 0) {
                    alert('Por favor ingrese correctamente los datos')
                }
                else if (cursoEditado.inscritos > cursoEditado.cupos) {
                    alert('La cantidad de inscritos es mayor a la cantidad de cupos que tiene el curso...')
                }
                else if (cursoEditado.completado === true) {
                    cursoEditado.inscritos = 0
                    console.log('EL OBJETO QUE SE ENVIARA AL STATE ES: ', cursoEditado)
                    this.editarCurso(cursoEditado)
                    console.log('CURSO ENVIADO SIN PROBLEMAS POR PARTE DE ADMINISTRACION.VUE')
                }
                else {
                    console.log('EL OBJETO QUE SE ENVIARA AL STATE ES: ', cursoEditado)
                    this.editarCurso(cursoEditado)
                    console.log('CURSO ENVIADO SIN PROBLEMAS POR PARTE DE ADMINISTRACION.VUE')
                }
            },
            borrarCurso() {
                console.log('se eliminara este curso: ', this.contenedor.id)
                this.eliminarCurso(this.contenedor)
            },

            //INTERACCIONES EN ADMINISTRACION VUE
            mostrarForm(cursoEditar) {
                console.log('el curso que se editara es: ', cursoEditar.id)
                this.curso = { ...cursoEditar };
                this.form = true
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
            cancelarModificacion(){
                this.form = false;
                this.limpiarForm()
            },
            cancelarEliminacion(){
                this.contenedor = {}
            },
            cambioVar(cursoEliminar) {
                console.log('curso recibido: ', cursoEliminar.id)
                this.contenedor = cursoEliminar
            }
    }
}
</script>
<template>
    <div class="container text-center ">
        <h1 class="mt-3">{{ title }}</h1>
        <button type="button" class="btn btn-primary mt-5" data-bs-toggle="modal" data-bs-target="#exampleModal"> {{ button }} </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar curso</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="border-rounded shadow-sm">
                            <input id="input1" type="text" placeholder="URL de imagen" v-model="this.curso.img">
                            <input id="input2" type="text" placeholder="Nombre" v-model="this.curso.nombre">
                            <label for="input3">Cupos: </label>
                            <input id="input3agregar" type="number" placeholder="Cupos" v-model="this.curso.cupos">
                            <label for="input4">Inscritos: </label>
                            <input id="input4agregar" type="number" placeholder="Inscritos" v-model="this.curso.inscritos">
                            <input id="input5agregar" type="text" placeholder="Duracion" v-model="this.curso.duracion">
                            <label for="input6">Costo: </label>
                            <input id="input6" type="number" placeholder="Costo" v-model="this.curso.costo">
                            <textarea id="input7" placeholder="Descripcion" v-model="this.curso.descripcion"></textarea>
                            <hr>
                        </form>
                    </div>
                    <div class="modal-footer d-flex justify-content-center mt-3">
                        <button type="button" @click.prevent="agregandoCurso" class="btn btn-primary me-2" data-bs-dismiss="modal">Agregar</button>
                        <button @click.prevent="limpiarForm" class="btn btn-warning me-2">Limpiar</button>
                        <button type="button" @click.prevent="cancelarModificacion" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
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
                    <td><i class="bi bi-pencil-square text-warning me-2" @click="mostrarForm(cantCursos)" role="button" title="Editar"></i> <i class="bi bi-trash text-danger" @click="cambioVar(cantCursos)" data-bs-toggle="modal" data-bs-target="#modalBorrar" role="button" title="Eliminar"></i></td>
                    <div class="modal fade" id="modalBorrar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">ELIMINAR CURSO</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <h5>Esta seguro que desea eliminar el curso seleccionado?<hr><span>(Esta accion eliminara completamente el curso)</span></h5>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancelarEliminacion">Cerrar</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="borrarCurso">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </tr>
            </tbody>
        </table>
        <form v-if="form" class="mt-4 p-3 border-rounded shadow-sm">
            <input id="input1" type="text" placeholder="URL de imagen" v-model="this.curso.img">
            <input id="input2" type="text" placeholder="Nombre" v-model="this.curso.nombre">
            <label for="input3">Cupos: </label>
            <input id="input3" type="number" placeholder="Cupos" v-model="this.curso.cupos">
            <label for="input4">Inscritos: </label>
            <input id="input4" type="number" placeholder="Inscritos" v-model="this.curso.inscritos">
            <label for="input5">Duracion:</label>
            <input id="input5" type="text" placeholder="Duracion" v-model="this.curso.duracion">
            <label>Terminado:</label>
            <select v-model="curso.completado" polaceholder="Terminado">
                <option :value="true">Sí</option>
                <option :value="false">No</option>
            </select>
            <input id="input-fecha" type="text" placeholder="Fecha de registro" v-model="this.curso.fecha_registro">
            <br>
            <br>
            <label for="input6">Costo: </label>
            <input id="input6" type="number" placeholder="Costo" v-model="this.curso.costo">
            <textarea id="input7" placeholder="Descripcion" v-model="this.curso.descripcion"></textarea>
            <hr>
            <div class="d-flex justify-content-center mt-3">
                <button @click.prevent="modificarCurso" class="btn btn-primary me-2">Modificar</button>
                <button @click.prevent="cancelarModificacion" class="btn btn-danger">Cancelar</button>
            </div>
        </form>
        <hr>
        <div class="alert alert-secondary" role="alert"><i class="bi bi-people-fill"></i> Cantidad total de alumnos permitidos: {{ totalCupos }} </div>
        <div class="alert alert-info" role="alert"><i class="bi bi-person-check"></i> Cantidad total de alumnos inscritos: {{ totalInscritos }} </div>
        <div class="alert alert-danger" role="alert"><i class="bi bi-person-add"></i> Cantidad total de cupos restantes: {{ cuposRestantes }}</div>
        <div class="alert alert-dark" role="alert"><i class="bi bi-ban"></i> Cantidad total de cursos terminados: {{ cursosTerminados }}</div>
        <div class="alert alert-warning" role="alert"><i class="bi bi-bell"></i> Cantidad total de cursos activos:  {{ cursosActivos }}</div>
        <div class="alert alert-light" role="alert"><i class="bi bi-optical-audio-fill"></i> Cantidad total de cursos: {{ totalCursos }}
        </div>
    </div>
</template>

<style scoped>
#input1 {
    width: 100%;
    margin-bottom: 10px;
}
#input2 {
    width: 100%;
    margin-right: 10px;
    margin-bottom: 10px;
}
#input3 {
    width: 6%;
    margin-left: 8px;
    margin-right: 8px;
}
#input4 {
    width: 6%;
    margin-left: 8px;
    margin-right: 8px;
}
#input5 {
    margin-left: 5px;
    width: 20%;
    margin-right: 10px;
}
select {
    margin-left: 5px;
    margin-right: 5px;
}
#input-fecha {
    margin-right: 5px;
    margin-left: 5px;
}
#input6 {
    width: 18%;
    margin-left: 8px;
    margin-right: 8px;
}
#input7 {
    margin-top: 10px;
    width: 80%;
    height: 200px;
}
#input3agregar {
    width: 15%;
    margin-left: 8px;
    margin-right: 8px;
}
#input4agregar {
    width: 15%;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 10px;
}
#input5agregar {
    margin-left: 5px;
    width: 30%;
    margin-right: 10px;
}
</style>