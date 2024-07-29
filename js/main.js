let root = document.querySelector("#root");
let contadorUsuarios = 0;

let componentes = `
  <header>
    <button class="agregar-usuario-btn">Agregar nuevo usuario</button>
  </header>
  <div id="info-usuario"></div>
`;

root.innerHTML = componentes;

// Inicializar la aplicación y eventos
function inicializar() {
    let btn = document.querySelector('.agregar-usuario-btn');
    btn.addEventListener('click', abrirModal);
}

// Abrir el modal para registrar un nuevo usuario
function abrirModal() {
    let modal = document.createElement('div');
    modal.id = 'modal';
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Registro</h2>
            <form id="formulario-registro">
                <label for="nombre-usuario">Usuario:</label>
                <input type="text" id="nombre-usuario" name="nombre-usuario" required>
                <br>
                <label for="correo">Correo:</label>
                <input type="email" id="correo" name="correo" required>
                <br>
                <button class="btnSubir modal-submit-btn" type="submit">Enviar</button>
            </form>
        </div>
    `;

    root.appendChild(modal);

    let botonCerrar = modal.querySelector('.close');
    botonCerrar.addEventListener('click', function() {
        modal.style.display = 'none';
        modal.remove();
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    });

    let formulario = modal.querySelector('#formulario-registro');
    formulario.addEventListener('submit', function() {
        let nombreUsuario = formulario.querySelector('#nombre-usuario').value;
        let correo = formulario.querySelector('#correo').value;

        contadorUsuarios++;

        let infoUsuario = document.getElementById('info-usuario');
        infoUsuario.innerHTML += `
            <div class="user-profile" id="perfil-usuario-${contadorUsuarios}">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH7Z6RxTG-C_tGQOI_GpF6Oog7JbYkyPTfvw&s" alt="Perfil">
                <div class="user-info-content">
                    <p>Nombre: ${nombreUsuario}</p>
                    <p>Correo: ${correo}</p>
                </div>
                <div class="botonesAgregar">
                    <p id="task-count-${contadorUsuarios}" class="task-count">0</p>
                    <button class="add-task-btn" data-usuario="${contadorUsuarios}">+</button>
                </div>
                <div class="user-icon">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="task-list" id="task-list-${contadorUsuarios}"></div>
            </div>
        `;

        // Agregar evento al nuevo botón de agregar tarea
        document.querySelector(`.add-task-btn[data-usuario="${contadorUsuarios}"]`).addEventListener('click', function() {
            mostrarModalTarea(contadorUsuarios);
        });

        modal.style.display = 'none';
        modal.remove();
    });

    modal.style.display = 'block';
}

// Mostrar el modal para agregar una nueva tarea
function mostrarModalTarea(idUsuario) {
    let modalTarea = document.createElement('div');
    modalTarea.classList.add('modal');

    modalTarea.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Nueva Tarea</h2>
            <form id="formulario-tarea">
                <label for="nombre-tarea">Tarea:</label>
                <input type="text" id="nombre-tarea" name="nombre-tarea" required>
                <br>
                <button class="btnSubir modal-submit-btn" type="submit">Agregar</button>
            </form>
        </div>
    `;

    root.appendChild(modalTarea);

    let botonCerrar = modalTarea.querySelector('.close');
    botonCerrar.addEventListener('click', function() {
        modalTarea.style.display = 'none';
        modalTarea.remove();
    });

    window.addEventListener('click', function(event) {
        if (event.target === modalTarea) {
            modalTarea.style.display = 'none';
            modalTarea.remove();
        }
    });

    let formularioTarea = modalTarea.querySelector('#formulario-tarea');
    formularioTarea.addEventListener('submit', function() {
        let tarea = formularioTarea.querySelector('#nombre-tarea').value;
        if (tarea !== "") {
            let listaTareas = document.querySelector(`#task-list-${idUsuario}`);
            let nuevaTarea = document.createElement('div');
            nuevaTarea.classList.add('task-item');
            nuevaTarea.textContent = tarea;
            listaTareas.appendChild(nuevaTarea);

            // Actualizar el contador de tareas
            let contadorTareas = document.querySelector(`#task-count-${idUsuario}`);
            contadorTareas.textContent = (parseInt(contadorTareas.textContent) || 0) + 1;

            modalTarea.style.display = 'none';
            modalTarea.remove();
        }
    });

    modalTarea.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', inicializar);
