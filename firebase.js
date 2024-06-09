// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7ZsCLh30qxfyrwYKYWmBeYM4X0a0KLrg",
    authDomain: "electiva-4-prueba.firebaseapp.com",
    projectId: "electiva-4-prueba",
    storageBucket: "electiva-4-prueba.appspot.com",
    messagingSenderId: "288295482435",
    appId: "1:288295482435:web:f38d810e96a49980cdd0f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Metodos de Firestore
import { 
    getFirestore, 
    collection, 
    addDoc, 
    deleteDoc,
    onSnapshot,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Conexcion con la base de datos
const db = getFirestore();

/* PRIMERA COLECCION: TAREAS */

// Crea y guarda una nueva tarea en la colección 'tareas'
export const guardarTareas = (titulo, descripcion) => {
    addDoc(collection(db, 'tareas'), { titulo, descripcion });
};

// Escucha en tiempo real los cambios en la colección 'tareas' y ejecuta un callback
export const onTareas = (callback) => {
    onSnapshot(collection(db, 'tareas'), callback);
};

// Elimina una tarea específica por su id de la colección 'tareas'
export const borrarTarea = (id) => {
    deleteDoc(doc(db, 'tareas', id))
};

// Obtiene los datos de una tarea específica por su id
export const obtenerTarea = async (id) => {
    const tarea = await getDoc(doc(db, 'tareas', id))
    return tarea;
};

// Actualiza los campos de una tarea específica por su id con nuevos valores
export const actualizarTarea = (id, newFields) => {
    updateDoc(doc(db, 'tareas', id), newFields);
};

/* SEGUNDA COLECCION: RECETAS */

// Crea y guarda una nueva receta en la colección 'recetas'
export const guardarRecetas = (nombreReceta, tiempoPreparacion, cantidadPorciones, ingredientes, intrucciones) => {
    addDoc(collection(db, 'recetas'), { nombreReceta, tiempoPreparacion, cantidadPorciones, ingredientes, intrucciones });
};

// Escucha en tiempo real los cambios en la colección 'recetas' y ejecuta un callback
export const onRecetas = (callback) => {
    onSnapshot(collection(db, 'recetas'), callback);
};

// Elimina una receta específica por su id de la colección 'recetas'
export const borrarReceta = (id) => {
    deleteDoc(doc(db, 'recetas', id))
};

// Obtiene los datos de una receta específica por su id
export const obtenerReceta = async (id) => {
    const Receta = await getDoc(doc(db, 'recetas', id))
    return Receta;
};

// Actualiza los campos de una receta específica por su id con nuevos valores
export const actualizarReceta = (id, newFields) => {
    updateDoc(doc(db, 'recetas', id), newFields);
};

/* TERCERA COLECCION: EVENTOS */

// Crea y guarda una nueva evento en la colección 'eventos'
export const guardarEventos = (nombreEvento, fecha, receta) => {
    addDoc(collection(db, 'eventos'), { nombreEvento, fecha, receta });
};

// Escucha en tiempo real los cambios en la colección 'eventos' y ejecuta un callback
export const onEventos = (callback) => {
    onSnapshot(collection(db, 'eventos'), callback);
};

// Elimina una evento específica por su id de la colección 'eventos'
export const borrarEvento = (id) => {
    deleteDoc(doc(db, 'eventos', id))
};

// Obtiene los datos de una evento específica por su id
export const obtenerEvento = async (id) => {
    const Evento = await getDoc(doc(db, 'eventos', id))
    return Evento;
};

// Actualiza los campos de una evento específica por su id con nuevos valores
export const actualizarEvento = (id, newFields) => {
    updateDoc(doc(db, 'eventos', id), newFields);
};