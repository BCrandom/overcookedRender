/* importar metodos de Firestore */
import {
    guardarTareas, onTareas, borrarTarea, obtenerTarea, actualizarTarea,
    guardarRecetas, onRecetas, borrarReceta, obtenerReceta, actualizarReceta,
    guardarEventos, onEventos, borrarEvento, obtenerEvento, actualizarEvento
} from "./firebase.js";

/* capturar los elementos html de los cuales se va a obtener informacion */

/* primera coleccion */
const obtenerTareas = document.querySelector('#ingresarTareas');
const listaTareas = document.querySelector('#listaTareas');
let editStatusT = false;
/* segunda coleccion */
const obtenerRecetas = document.querySelector('#ingresar-recetas');
const listaRecetas = document.querySelector('#listaRecetas');
let editStatusR = false;
/* tercera coleccion */
const obtenerEventos = document.querySelector('#ingresar-eventos');
const listaEventos = document.querySelector('#listaEventos');
let editStatusE = false;

let id = ''

/* tareas */
window.addEventListener('DOMContentLoaded', async () => {

    onTareas((querySnapshot) => {
        let html = ''

        querySnapshot.forEach((doc) => {
        const tarea = doc.data()
        html += `
            <div id="tarea">
                <h3>${tarea.titulo}</h3>
                <p>${tarea.descripcion}</p>
                <button class='btn-borrar-t' data-id="${doc.id}" id="btn">Borrar</button>
                <button class='btn-editar-t' data-id="${doc.id}" id="btn">Editar</button>
            </div>
        `
        });

        listaTareas.innerHTML = html;

        const btnsBorrar = listaTareas.querySelectorAll('.btn-borrar-t')
        btnsBorrar.forEach((btn) => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                borrarTarea(dataset.id)
            })
        });

        const btnsEditar = listaTareas.querySelectorAll('.btn-editar-t')
        btnsEditar.forEach((btn) => {
            btn.addEventListener('click', async ({target: {dataset}}) => {
                const doc = await obtenerTarea(dataset.id)
                const t = doc.data();

                obtenerTareas['tarea-titulo'].value = t.titulo;
                obtenerTareas['tarea-descripcion'].value = t.descripcion;

                editStatusT = true;
                id = dataset.id;

                obtenerTareas['guardar-tarea'].innerText = 'Actualizar'
            })
        });
    });
});

obtenerTareas.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = obtenerTareas['tarea-titulo'].value;
    const descripcion = obtenerTareas['tarea-descripcion'].value;

    if (!editStatusT) {
        guardarTareas(titulo, descripcion);
    } else {
        actualizarTarea(id, {
            titulo: titulo, 
            descripcion: descripcion})
            obtenerTareas['guardar-tarea'].innerText = 'Guardar'

        editStatusT = false;
    }

    obtenerTareas.reset();
})

/* recetas */
window.addEventListener('DOMContentLoaded', async () => {

    onRecetas((querySnapshot) => {
        let htmlR = ''

        querySnapshot.forEach((doc) => {
        const receta = doc.data()
        htmlR += `
            <div id="receta">
                <h3>${receta.nombreReceta}</h3>
                <h4>${receta.tiempoPreparacion}</h4>
                <h4>${receta.cantidadPorciones}</h4>
                <p>${receta.ingredientes}</p>
                <p>${receta.intrucciones}</p>
                <button class='btn-borrar-r' data-id="${doc.id}" id="btn">Borrar</button>
                <button class='btn-editar-r' data-id="${doc.id}" id="btn">Editar</button>
            </div>
        `
        });

        listaRecetas.innerHTML = htmlR;

        const btnsBorrar = listaRecetas.querySelectorAll('.btn-borrar-r')
        btnsBorrar.forEach((btn) => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                borrarReceta(dataset.id)
            })
        });

        const btnsEditar = listaRecetas.querySelectorAll('.btn-editar-r')
        btnsEditar.forEach((btn) => {
            btn.addEventListener('click', async ({target: {dataset}}) => {
                const doc = await obtenerReceta(dataset.id)
                const r = doc.data();

                obtenerRecetas['guardar-nombreReceta'].value = r.nombreReceta;
                obtenerRecetas['guardar-tiempoPreparacion'].value = r.tiempoPreparacion;
                obtenerRecetas['guardar-cantidadPorciones'].value = r.cantidadPorciones;
                obtenerRecetas['guardar-Ingredientes'].value = r.ingredientes;
                obtenerRecetas['guardar-IntruccionesReceta'].value = r.intrucciones;

                editStatusR = true;
                id = dataset.id;

                obtenerRecetas['guardar-receta'].innerText = 'Actualizar';
            })
        });
    });
});

obtenerRecetas.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreReceta = obtenerRecetas['guardar-nombreReceta'].value;
    const tiempoPreparacion = obtenerRecetas['guardar-tiempoPreparacion'].value;
    const cantidadPorciones = obtenerRecetas['guardar-cantidadPorciones'].value;
    const ingredientes = obtenerRecetas['guardar-Ingredientes'].value;
    const intrucciones = obtenerRecetas['guardar-IntruccionesReceta'].value;

    if (!editStatusR) {
        guardarRecetas(nombreReceta, tiempoPreparacion, cantidadPorciones, ingredientes, intrucciones);
    } else {
        actualizarReceta(id, {
            nombreReceta: nombreReceta, 
            tiempoPreparacion: tiempoPreparacion,
            cantidadPorciones: cantidadPorciones,
            ingredientes: ingredientes,
            intrucciones: intrucciones})
            obtenerRecetas['guardar-receta'].innerText = 'Guardar'

        editStatusR = false;
    }

    obtenerRecetas.reset();
})

/* eventos */
window.addEventListener('DOMContentLoaded', async () => {

    onEventos((querySnapshot) => {
        let htmlE = ''

        querySnapshot.forEach((doc) => {
        const evento = doc.data();
        let fecha = evento.fecha.toDate();
        let año = fecha.getFullYear();
        let mes = fecha.getMonth() + 1;
        let dia = fecha.getDate();
        htmlE += `
            <div id="evento">
                <h3>${evento.nombreEvento}</h3>
                <h4>${año}/${mes}/${dia}</h4>
                <p>${evento.receta}</p>
                <button class='btn-borrar-e' data-id="${doc.id}" id="btn">Borrar</button>
                <button class='btn-editar-e' data-id="${doc.id}" id="btn">Editar</button>
            </div>
        `
        });

        listaEventos.innerHTML = htmlE;

        const btnsBorrar = listaEventos.querySelectorAll('.btn-borrar-e')
        btnsBorrar.forEach((btn) => {
            btn.addEventListener('click', ({target: {dataset}}) => {
                borrarEvento(dataset.id)
            })
        });

        const btnsEditar = listaEventos.querySelectorAll('.btn-editar-e')
        btnsEditar.forEach((btn) => {
            btn.addEventListener('click', async ({target: {dataset}}) => {
                const doc = await obtenerEvento(dataset.id)
                const e = doc.data();

                obtenerEventos['evento-nombreEvento'].value = e.nombreEvento;
                let fecha = e.fecha.toDate().toISOString().split('T')[0];
                obtenerEventos['evento-fecha'].value = fecha;
                obtenerEventos['evento-receta'].value = e.receta;

                editStatusE = true;
                id = dataset.id;

                obtenerEventos['guardar-evento'].innerText = 'Actualizar';
            })
        });
    });
});

obtenerEventos.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreEvento = obtenerEventos['evento-nombreEvento'].value;
    const fecha = new Date(obtenerEventos['evento-fecha'].value);
    const receta = obtenerEventos['evento-receta'].value;

    if (!editStatusE) {
        guardarEventos(nombreEvento, fecha, receta);
    } else {
        actualizarEvento(id, {
            nombreEvento: nombreEvento, 
            fecha: fecha,
            receta: receta})
            obtenerEventos['guardar-evento'].innerText = 'Guardar'

        editStatusE = false;
    }

    obtenerEventos.reset();
})