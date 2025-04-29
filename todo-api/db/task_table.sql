CREATE TABLE tasks (
    id INT PRIMARY KEY IDENTITY(1,1), -- Columna de ID autoincremental
    title NVARCHAR(255) NOT NULL,     -- Título de la tarea (cadena de texto)
    description NVARCHAR(MAX),        -- Descripción de la tarea (puede ser más larga)
    isCompleted BIT DEFAULT 0,        -- Estado de la tarea (0 para falso, 1 para verdadero)
    createdAt DATETIME DEFAULT GETDATE() -- Fecha de creación (automática)
);