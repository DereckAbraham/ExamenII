document.addEventListener('DOMContentLoaded', function() {
    let btnModal = document.getElementById('btnModal');
    let modal = document.getElementById('modal');
    let cerrarModal = document.getElementById('cerrarModal');
    let formLogin = document.getElementById('formLogin');
    let usuariosContenedor = document.getElementById('usuarios');
    
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

        let usuarioDiv = document.createElement('div');
        usuarioDiv.className = 'usuario';
        
        let usuarioHeader = document.createElement('div');
        usuarioHeader.className = 'usuario-header';
        
        let perfil = document.createElement('img');
        perfil.src = 'https://cdn-icons-png.freepik.com/512/456/456212.png';
        perfil.alt = nombre;
        perfil.className = 'perfil';
        
        let nombreUsuario = document.createElement('span');
        nombreUsuario.className = 'nombre-usuario';
        nombreUsuario.textContent = `${nombre} (${email})`;
        
        let contadorTareas = document.createElement('span');
        contadorTareas.id = 'contador-tareas';
        contadorTareas.textContent = 'Tareas: 0';
        
        let btnAgregarTarea = document.createElement('button');
        btnAgregarTarea.className = 'btnAgregarTarea';
        btnAgregarTarea.textContent = '+';
        btnAgregarTarea.addEventListener('click', function() {
            let tarea = prompt('Ingrese la nueva tarea:');
            if (tarea) {
                let nuevaTarea = document.createElement('span');
                nuevaTarea.textContent = tarea;
                nuevaTarea.className = 'tarea';
                usuarioTareas.appendChild(nuevaTarea);
                totalTareas++;
                contadorTareas.textContent = `Tareas: ${totalTareas}`;
            }
        });
        
        let usuarioTareas = document.createElement('div');
        usuarioTareas.className = 'usuario-tareas';
        
        usuarioHeader.appendChild(perfil);
        usuarioHeader.appendChild(nombreUsuario);
        usuarioHeader.appendChild(contadorTareas);
        usuarioHeader.appendChild(btnAgregarTarea);
        
        usuarioDiv.appendChild(usuarioHeader);
        usuarioDiv.appendChild(usuarioTareas);
        
        usuariosContenedor.appendChild(usuarioDiv);
        
        formLogin.reset();
        
        let totalTareas = 0;
    });
});
