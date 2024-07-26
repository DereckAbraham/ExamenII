let root = document.querySelector("#root");
let contadorUsuarios = 0;

let componentes = `
  <header>
    <button class="agregar-usuario-btn">Agregar nuevo usuario</button>
  </header>
  <div id="info-usuario"></div>
`;

root.innerHTML = componentes;

function inicializar() {
    let btn = document.querySelector('.agregar-usuario-btn');
    btn.addEventListener('click', abrirModal);

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
                        <button class="add-task-btn" data-usuario="${contadorUsuarios}">Agregar Tarea</button>
                    </div>
                    <div class="user-icon">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="task-list" id="task-list-${contadorUsuarios}">
                    </div>
                </div>
            `;

            document.querySelectorAll('.add-task-btn').forEach(boton => {
                boton.addEventListener('click', function() {
                    let idUsuario = this.getAttribute('data-usuario');
                    let tarea = prompt('Ingrese la tarea:');
                    if (tarea) {
                        let listaTareas = document.querySelector(`#task-list-${idUsuario}`);
                        let nuevaTarea = document.createElement('div');
                        nuevaTarea.textContent = tarea;
                        listaTareas.appendChild(nuevaTarea);
                    }
                });
            });

            modal.style.display = 'none';
            modal.remove();
        });

        modal.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', inicializar);
