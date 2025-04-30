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
* Opcional: Un cliente para administrar SQL Server (SSMS, Azure Data Studio).
* Opcional: Una herramienta para probar APIs (Postman).


## Ejecución

Para ejecutar el proyecto, necesitas iniciar el back-end y "serve" en  front-end en terminales separadas.
