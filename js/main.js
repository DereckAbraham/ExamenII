let root = document.querySelector("#root");
let userCounter = 0;

let componentes = `
  <button class="agregar-usuario-btn">Agregar nuevo usuario</button>
  <div id="user-info"></div>
`;

root.innerHTML = componentes;

function initialize() {
    let btn = document.querySelector('.agregar-usuario-btn');

    btn.addEventListener('click', openModal);

    function openModal() {
        let modal = document.createElement('div');
        modal.id = 'modal';
        modal.classList.add('modal');
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Registro</h2>
                <form id="login-form">
                    <label for="username">Usuario:</label>
                    <input type="text" id="username" name="username" required>
                    <br>
                    <label for="email">Correo:</label>
                    <input type="email" id="email" name="email" required>
                    <br>
                    <button class="btnSubir" type="submit">Enviar</button>
                </form>
            </div>
        `;
        root.appendChild(modal);

        let closeBtn = modal.querySelector('.close');
        closeBtn.onclick = function() {
            modal.style.display = 'none';
            modal.remove();
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                modal.remove();
            }
        }

        let form = modal.querySelector('#login-form');
        form.onsubmit = function(event) {
            event.preventDefault();
            
            let username = form.querySelector('#username').value;
            let email = form.querySelector('#email').value;
            
            userCounter++;

            let userInfo = document.getElementById('user-info');
            userInfo.innerHTML += `
                <div class="user-profile" id="user-profile-${userCounter}">
                    <img src="https://pbs.twimg.com/profile_images/1741493705884749825/tFPuUQW-_400x400.jpg" alt="Perfil">
                    <div class="user-info-content">
                        <p>Nombre: ${username}</p>
                        <p>Correo: ${email}</p>
                        <button class="add-task-btn" data-user="${userCounter}">Agregar Tarea</button>
                    </div>
                    <div class="user-icon">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="task-list">
                        <ul id="task-list-${userCounter}"></ul>
                    </div>
                </div>
            `;

            let addTaskBtns = document.querySelectorAll('.add-task-btn');
            addTaskBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    let userId = this.getAttribute('data-user');
                    let task = prompt('Ingrese la tarea:');
                    if (task) {
                        let taskList = document.querySelector(`#task-list-${userId}`);
                        let newTask = document.createElement('div');
                        newTask.textContent = task;
                        taskList.appendChild(newTask);
                    }
                });
            });
            
            modal.style.display = 'none';
            modal.remove();
        }
        modal.style.display = 'block';
    }
}
document.addEventListener('DOMContentLoaded', initialize);
