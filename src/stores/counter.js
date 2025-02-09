import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    cursos: [{
      id: 1,
      img: 'https://i.blogs.es/545cf8/es6-logo/450_1000.png',
      nombre: 'JavaScript Avanzado',
      costo: 30000,
      duracion: '2 meses',
      cupos: 20,
      inscritos: 10,
      completado: false,
      fecha_registro: '06/03/2022',
      descripcion: 'Curso con las nuevas actualizaciones de JavaScript.'
    },
    {
      id: 2,
      img: 'https://cdn.icon-icons.com/icons2/2415/PNG/512/css_plain_logo_icon_146573.png',
      nombre: 'CSS para principiantes',
      costo: 10000,
      duracion: '1 mes',
      cupos: 35,
      inscritos: 23,
      completado: false,
      fecha_registro: '05/03/2022',
      descripcion: 'Aprendiendo estilos con CSS desde el nivel más básico.'
    },
    {
      id: 3,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/768px-JavaScript-logo.png',
      nombre: 'JavaScript Básico de 0 a 100',
      costo: 20000,
      duracion: '2 meses',
      cupos: 25,
      inscritos: 0,
      completado: true,
      fecha_registro: '05/03/2022',
      descripcion: 'Programando para la web con JavaScript.'
    },
    {
      id: 4,
      img:'https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png',
      nombre:'HTML Básico',
      costo: 10000,
      duracion: '1 mes',
      cupos: 35,
      inscritos: 0,
      completado: true,
      fecha_registro: '31/01/2022',
      descripcion: 'Aprende HTML 5 y crea tus primeras páginas web paso a paso con decenas de ejercicios.'
    },
    {
      id: 5,
      img: 'https://masteringjs.io/assets/images/vue/vue.png',
      nombre: 'Vue JS de 0 a 100',
      costo: 85500,
      duracion: '5 meses',
      cupos: 35,
      inscritos: 35,
      completado:false,
      fecha_registro: '06/03/2022',
      descripcion: 'Aprende desde cero como usar VueJS, cómo usarlo en aplicaciones pequeñas y ver lo que ofrece el framework.'
    },
    {
      id: 6,
      img:'https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png',
      nombre: 'Estilos con SASS',
      costo: 45000,
      duracion: '1 mes',
      cupos:40,
      inscritos: 35,
      completado: false,
      fecha_registro: '06/03/2022',
      descripcion: 'Con SASS aprenderás a escribir mejor código de CSS con todas las funciones necesarias.'
    },
 ]
  }),
  actions: {
    editarCurso(cursoEditado) {
      const index = this.cursos.findIndex(curso => curso.id === cursoEditado.id);
      if (index !== -1) {
        this.cursos[index] = { ...cursoEditado };
      }
    },
    eliminarCurso(cursoEliminar) {
      this.cursos = this.cursos.filter(curso => curso.id !== cursoEliminar.id);
    },
    agregarCurso(cursoAgregar) {
      this.cursos.push(cursoAgregar)
    }
  }
})