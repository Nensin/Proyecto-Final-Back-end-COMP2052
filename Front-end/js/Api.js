
const API_URL = 'http://localhost:3000/tasks';

// Referencias a los elementos del formulario y la lista de tareas en tu HTML
const taskForm = document.getElementById('task-form');
const taskIdInput = document.getElementById('task-id'); 
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const statusSelect = document.getElementById('status');
const taskListDiv = document.getElementById('task-list');
const cancelButton = document.getElementById('cancel-btn');


// --- GET  ---
async function fetchAllTasks() {
    try {
        const response = await fetch(API_URL); 

        if (!response.ok) {
            console.error('Error al obtener tareas:', response.status, response.statusText);
            taskListDiv.innerHTML = '<p>Error al cargar las tareas.</p>';
            return []; // Devuelve un array vacío en caso de error
        }

        const tasks = await response.json(); 
        console.log('Tareas obtenidas:', tasks);
        return tasks; // Devuelve el array de tareas
    } catch (error) {
        console.error('Error en la solicitud GET fetchAllTasks:', error);
        taskListDiv.innerHTML = '<p>No se pudo conectar con el servidor de tareas.</p>';
        return []; // Devuelve un array vacío en caso de error
    }
}

// --- GET by ID---
async function fetchTaskById(id) {
     try {
        const response = await fetch(`${API_URL}/${id}`); // URL con el ID

        if (!response.ok) {
            console.error(`Error al obtener tarea con ID ${id}:`, response.status, response.statusText);
            alert(`Error: Tarea con ID ${id} no encontrada.`);
            return null; // Devuelve null si no se encuentra o hay error
        }

        const task = await response.json(); 
        console.log(`Tarea con ID ${id} obtenida:`, task);
        return task; // Devuelve el objeto tarea
    } catch (error) {
        console.error(`Error en la solicitud GET fetchTaskById (${id}):`, error);
        alert(`Error de conexión o interno al obtener tarea con ID ${id}.`);
        return null; // Devuelve null en caso de error
    }
}


// --- POST ---
async function createTask(taskData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST', // Método HTTP POST
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(taskData) // Convertimos el objeto JS a string JSON
        });

        const result = await response.json(); // Leemos la respuesta (éxito o error)

        if (!response.ok) {
            console.error('Error al crear tarea:', response.status, response.statusText, result);
            alert('Error al crear tarea: ' + (result.error || response.statusText));
            return null; // Devuelve null en caso de error
        }

        console.log('Tarea creada:', result);
        alert('Tarea creada exitosamente.');
        return result; // Devuelve el resultado exitoso
    } catch (error) {
        console.error('Error en la solicitud POST createTask:', error);
        alert('Error de conexión o interno al crear tarea.');
        return null; // Devuelve null en caso de error
    }
}

// --- PUT ---
async function updateTask(id, taskData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { // URL con el ID
            method: 'PUT', // Método HTTP PUT
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(taskData) // Convertimos el objeto JS a string JSON
        });

        const result = await response.json(); // Leemos la respuesta (éxito o error)

        if (!response.ok) {
            console.error(`Error al actualizar tarea con ID ${id}:`, response.status, response.statusText, result);
            alert(`Error al actualizar tarea: ` + (result.error || response.statusText));
            return null; // Devuelve null en caso de error
        }

        console.log('Tarea actualizada:', result);
        alert(`Tarea con ID ${id} actualizada exitosamente.`);
        return result; // Devuelve el resultado exitoso
    } catch (error) {
        console.error(`Error en la solicitud PUT updateTask (${id}):`, error);
        alert(`Error de conexión o interno al actualizar tarea con ID ${id}.`);
        return null; // Devuelve null en caso de error
    }
}

// --- DELETE  ---
async function deleteTask(id) {
     if (!confirm(`¿Estás seguro de que deseas eliminar la tarea con ID ${id}?`)) {
         return false; // Cancela la eliminación si el usuario no confirma
     }

    try {
        const response = await fetch(`${API_URL}/${id}`, { // URL con el ID
            method: 'DELETE' // Método HTTP DELETE
        });

         const result = await response.json(); // Leemos la respuesta (éxito o error)

        if (!response.ok) {
            console.error(`Error al eliminar tarea con ID ${id}:`, response.status, response.statusText, result);
            alert(`Error al eliminar tarea: ` + (result.error || response.statusText));
            return false; // Indica que la eliminación falló
        }

        console.log(`Tarea con ID ${id} eliminada:`, result);
        alert(`Tarea con ID ${id} eliminada exitosamente.`);
        return true; // Indica que la eliminación fue exitosa

    } catch (error) {
        console.error(`Error en la solicitud DELETE deleteTask (${id}):`, error);
        alert(`Error de conexión o interno al eliminar tarea con ID ${id}.`);
        return false; // Indica que la eliminación falló
    }
}



// Muestra la lista de tareas en el div #task-list
function displayTasks(tasks) {
    taskListDiv.innerHTML = ''; // Limpia el contenido actual

    if (tasks.length === 0) {
        taskListDiv.innerHTML = '<p>No hay tareas.</p>';
        return;
    }

    // Crea el HTML para cada tarea y lo añade a la lista
    tasks.forEach(task => {
        
        const taskElement = document.createElement('div');
        taskElement.classList.add('col-md-6', 'mb-3'); 

        // Usa task.isCompleted para determinar el estado visualmente
        const statusText = task.isCompleted ? 'Completada' : (task.status || 'Pendiente'); // Usa status si existe, si no, asume Pendiente/Completada
        const statusColorClass = task.isCompleted ? 'text-success' : 'text-warning'; // Color según estado

        taskElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description || 'Sin descripción'}</p>
                    <p class="card-text"><small class="${statusColorClass}">Estado: ${statusText}</small></p>

                    <button class="btn btn-sm btn-secondary me-2 edit-btn" data-id="${task.id}">Editar</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${task.id}">Eliminar</button>
                </div>
            </div>
        `;

        taskListDiv.appendChild(taskElement);
    });
}

// Limpia el formulario y lo prepara para crear una nueva tarea
function clearForm() {
    taskForm.reset(); // Resetea todos los campos a sus valores por defecto
    taskIdInput.value = ''; // Asegura que el campo oculto del ID esté vacío
   
    cancelButton.style.display = 'inline-block';
}

// Llena el formulario con los datos de una tarea para editarla
function populateFormForEdit(task) {
    taskIdInput.value = task.id; // Guarda el ID en el campo oculto
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    const statusValue = task.isCompleted ? 'completada' : (task.status || 'pendiente'); 
    statusSelect.value = statusValue;


    
    cancelButton.style.display = 'inline-block';

     window.scrollTo({ top: 0, behavior: 'smooth' });
}



// Maneja el envío del formulario (puede ser para crear o actualizar)
async function handleFormSubmit(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Recopila los datos del formulario
    const id = taskIdInput.value; // Verifica si hay un ID (modo edición)
    const title = titleInput.value;
    const description = descriptionInput.value;
    const status = statusSelect.value;

    // Crea el objeto con los datos de la tarea a enviar
    const taskData = { title, description, status };

    let success = false; // Variable para saber si la operación fue exitosa

    if (id) {
        // Si hay un ID, estamos editando
        console.log('Intentando actualizar tarea con ID:', id);
        // Llama a la función de actualizar y espera el resultado
        const updatedTask = await updateTask(id, taskData);
        if (updatedTask) {
            success = true;
        }

    } else {
        // Si no hay ID, estamos creando
        console.log('Intentando crear nueva tarea:', taskData);
        // Llama a la función de crear y espera el resultado
        const newTask = await createTask(taskData);
         if (newTask) {
            success = true;
        }
    }

    if (success) {
        clearForm(); // Limpia el formulario
        fetchAllTasks().then(tasks => displayTasks(tasks)); // Vuelve a cargar y mostrar la lista de tareas
    }
}


async function handleTaskListClick(event) {
    const target = event.target; 

    if (target.classList.contains('edit-btn')) {
        const taskId = target.dataset.id; 
        console.log('Clic en Editar para ID:', taskId);
        const taskToEdit = await fetchTaskById(taskId);
        if (taskToEdit) {
            populateFormForEdit(taskToEdit);
        }

    }
    else if (target.classList.contains('delete-btn')) {
         const taskId = target.dataset.id; // Obtiene el ID
         console.log('Clic en Eliminar para ID:', taskId);
         // Llama a la función para eliminar la tarea
         const deleted = await deleteTask(taskId);
         if (deleted) {
             fetchAllTasks().then(tasks => displayTasks(tasks));
         }
    }
}



// Cuando la ventana cargue completamente, obtén y muestra todas las tareas
window.addEventListener('load', () => {
    fetchAllTasks().then(tasks => displayTasks(tasks));
});

// Cuando el formulario se envíe, llama a la función handleFormSubmit
taskForm.addEventListener('submit', handleFormSubmit);

// Cuando se haga clic en el botón Cancelar, limpia el formulario
cancelButton.addEventListener('click', clearForm);

// Añade un event listener al div #task-list para manejar clics en botones Editar/Eliminar dentro de él
taskListDiv.addEventListener('click', handleTaskListClick);

// Inicialmente, asegura que el formulario esté limpio al cargar la página
clearForm();