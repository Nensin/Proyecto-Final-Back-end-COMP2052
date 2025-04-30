# Proyecto Final COMP 2025 - Gestor de Tareas

Este proyecto implementa un sencillo gestor de tareas, compuesto por una API REST desarrollada en Node.js y una interfaz de usuario básica construida con HTML, CSS y JavaScript.

## Características Principales

* **Gestión Completa de Tareas:** Permite crear, visualizar, actualizar y eliminar tareas.
* **Registro de Estado:** Las tareas pueden tener diferentes estados (Pendiente, En Progreso, Completada).
* **API RESTful:** El back-end proporciona endpoints estándar para interactuar con los datos de las tareas.
* **Interfaz de Usuario:** Un front-end basado en navegador para interactuar visualmente con la API.

## Tecnologías Utilizadas

**Back-end (todo-api):**

* Node.js & npm
* Express (Framework web)
* MS SQL Server (Base de Datos relacional)
* `mssql` (Driver para conexión a DB)
* `dotenv` (Gestión de variables de entorno)
* `cors` (Middleware para habilitar CORS)
* Nodemon (Herramienta para desarrollo, reinicio automático)

**Front-end (Front-end):**

* HTML5, CSS3 (con Bootstrap para estilos)
* JavaScript (Vanilla JS para lógica e interacciones con la API)
* Fetch API (Para realizar peticiones HTTP)
* `serve` (Servidor HTTP estático para servir los archivos del front-end)

## Prerrequisitos

Asegúrate de tener instalado en tu entorno de desarrollo:

* Node.js y npm
* Acceso a una instancia de MS SQL Server.
* Un cliente para administrar SQL Server (SSMS, Azure Data Studio, VS code).
* Opcional: Una herramienta para probar APIs (Postman).

## Configuración

1.  **Clonar el Repositorio:** Clona este repositorio a tu máquina local.
2.  **Configuración de la Base de Datos:**
    * Crea una base de datos en tu instancia de SQL Server.
    * Ejecuta el script SQL proporcionado en `todo-api/db/` para crear la tabla `tasks`. Asegúrate de que la tabla incluya las columnas `id`, `title`, `description`, `isCompleted` (BIT), `createdAt`, y `StatusString` (NVARCHAR).
3.  **Configuración del Back-end:**
    * Navega al directorio `todo-api`.
    * Instala las dependencias del proyecto (`npm install`).
    * Crea un archivo `.env` (basado en `.env.example`) con tus credenciales de conexión a la base de datos SQL Server y la configuración del puerto de la API.
4.  **Configuración del Front-end:**
    * Asegúrate de tener `serve` instalado globalmente (`npm install -g serve`).
    * Verifica la configuración de `API_URL` en `Front-end/js/Api.js` para que apunte correctamente a la dirección y puerto donde se ejecutará el back-end (por defecto `http://localhost:3000/tasks`).


## Ejecución

Para ejecutar el proyecto, necesitas iniciar el back-end y "serve" en  front-end en terminales separadas.

1.  **Iniciar Back-end:** Desde el directorio `todo-api`, ejecuta el comando para iniciar el servidor (usualmente `npm run dev` para desarrollo con Nodemon). El servidor indicará en qué dirección y puerto está escuchando.
2.  **Iniciar Front-end:** Desde el directorio raíz del proyecto, sirve la carpeta `Front-end` usando `serve`.
3.  **Acceso:** Abre tu navegador y navega a la dirección y puerto donde se sirve el front-end (ej: `http://localhost:5000`).

## API Endpoints

La API back-end  expone los siguientes endpoints para la gestión de tareas en la ruta base `/tasks`:

* **`GET /tasks`**
    * **Descripción:** Obtiene todas las tareas.
    * **Respuesta (Éxito 200 OK):** `Array` de objetos tarea, incluyendo `id`, `title`, `description`, `isCompleted` (boolean), `createdAt` (string ISO 8601), y `StatusString` (string).
    * **Respuesta (Error 500):** Objeto con detalles del error.

* **`GET /tasks/:id`**
    * **Descripción:** Obtiene una tarea específica por su ID.
    * **Respuesta (Éxito 200 OK):** Objeto tarea.
    * **Respuesta (Error 404):** Si el ID no existe.
    * **Respuesta (Error 500):** Objeto con detalles del error.

* **`POST /tasks`**
    * **Descripción:** Crea una nueva tarea.
    * **Cuerpo de la Solicitud (application/json):** Objeto con `{ "title": "string", "description": "string", "status": "string" }`. `title` es obligatorio. `status` puede ser "pendiente", "en progreso" o "completada".
    * **Respuesta (Éxito 201 Created):** Objeto de éxito.
    * **Respuesta (Error 400):** Si falta `title` o `status` inválido 
    * **Respuesta (Error 500):** Objeto con detalles del error.

* **`PUT /tasks/:id`**
    * **Descripción:** Actualiza una tarea existente por su ID.
    * **Cuerpo de la Solicitud (application/json):** Objeto con los campos a actualizar (pueden ser `title`, `description`, `status`, o una combinación).
    * **Respuesta (Éxito 200 OK):** Objeto de éxito.
    * **Respuesta (Error 400):** Si no hay campos válidos o `title` es vacío.
    * **Respuesta (Error 404):** Si el ID no existe.
    * **Respuesta (Error 500):** Objeto con detalles del error.

* **`DELETE /tasks/:id`**
    * **Descripción:** Elimina una tarea por su ID.
    * **Respuesta (Éxito 200 OK):** Objeto de éxito.
    * **Respuesta (Error 404):** Si el ID no existe.
    * **Respuesta (Error 500):** Objeto con detalles del error.

Puedes usar herramientas como Postman o Insomnia para probar estos endpoints directamente.
