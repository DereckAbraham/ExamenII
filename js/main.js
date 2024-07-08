document.addEventListener('DOMContentLoaded', function() {
    let btnModal = document.getElementById('btnModal');
    let modal = document.getElementById('modal');
    let cerrarModal = document.getElementById('cerrarModal');
    let formLogin = document.getElementById('formLogin');
    let perfil = document.querySelector('.perfil');
    let nombreUsuario = document.querySelector('.nombre-usuario');
    let btnAgregarTarea = document.getElementById('btnAgregarTarea');
    let tareasUsuario = document.getElementById('tareas-usuario');
    let contadorTareas = document.getElementById('contador-tareas');
    let totalTareas = 0;

    btnModal.addEventListener('click', function() {
        modal.style.display = 'block'; 
    });

    cerrarModal.addEventListener('click', function() {
        modal.style.display = 'none'; 
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none'; 
        }
    });

    formLogin.addEventListener('submit', function(event) {
        event.preventDefault(); 

        let nombre = document.getElementById('nombre').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        perfil.src = ''; 
        perfil.alt = nombre;

        nombreUsuario.textContent = `${nombre} (${email})`;

        tareasUsuario.innerHTML = ''; 
        totalTareas = 0;
        contadorTareas.textContent = `Tareas: ${totalTareas}`;

        formLogin.reset();
    });

    btnAgregarTarea.addEventListener('click', function() {
        let tarea = prompt('Ingrese la nueva tarea:');
        if (tarea) {
            let nuevaTarea = document.createElement('span');
            nuevaTarea.textContent = tarea;
            nuevaTarea.className = 'tarea';
            tareasUsuario.appendChild(nuevaTarea);
            totalTareas++;
            contadorTareas.textContent = `Tareas: ${totalTareas}`;
        }
    });
});
