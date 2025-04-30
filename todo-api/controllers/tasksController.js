const { poolPromise } = require('../db/config');
const allowedStatuses = ['pendiente', 'en progreso', 'completada'];

const getAllTasks = async (req, res) => { // O const getTasks = ...
  try {

    const pool = await poolPromise;

    // Asegúrate de que la consulta SELECT incluya la nueva columna StatusString (esto ya lo modificaste)
    const result = await pool.request().query('SELECT id, title, description, isCompleted, createdAt, StatusString FROM tasks');
    


    // Enviar las tareas encontradas
    res.json(result.recordset);


  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor al obtener tareas.', details: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) return res.status(400).json({ error: 'El campo "title" es obligatorio.' });

    const pool = await poolPromise;
    await pool
      .request()
      .input('title', title)
      .input('description', description)
      .input('isCompleted', status === 'completada' ? 1 : 0)
      .input('statusString', status) 
      .query('INSERT INTO tasks (title, description, isCompleted, StatusString) VALUES (@title, @description, @isCompleted, @statusString)'); 

    res.status(201).json({ message: 'Tarea insertada correctamente' });
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

const getTaskById = async (req, res) => {
  try {
    // 1. Obtener el ID de los parámetros de la URL
    const { id } = req.params;

    // Validar si el ID es un número válido
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID proporcionado no es válido.' });
    }

    // 2. Obtener el pool de conexión
    const pool = await poolPromise;

    // 3. Ejecutar la consulta SQL para obtener la tarea por ID
    const result = await pool
      .request()
      .input('id', parseInt(id)) // Asegurarse de que el ID es un número entero para la consulta
      .query('SELECT id, title, description, isCompleted, createdAt, StatusString FROM tasks WHERE id = @id');
    // 4. Verificar si se encontró una tarea
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // 5. Si se encontró, devolver la primera (y única) tarea encontrada
    res.json(result.recordset[0]); 

  } catch (error) {
    console.error('Error al obtener tarea por ID:', error); // Loguea el error real
    res.status(500).json({ error: 'Error interno del servidor al obtener la tarea' }); // Envía error genérico
  }
};
const deleteTask = async (req, res) => {
  try {
    // 1. Obtener el ID de los parámetros de la URL
    const { id } = req.params;

    // Opcional: Validar si el ID es un número válido
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID proporcionado no es válido.' });
    }

    // 2. Obtener el pool de conexión
    const pool = await poolPromise;

    // 3. Ejecutar la consulta SQL para eliminar la tarea por ID
    const result = await pool
      .request()
      .input('id', parseInt(id)) // Asegurarse de que el ID es un número entero
      .query('DELETE FROM tasks WHERE id = @id');

    // 4. Verificar si se eliminó alguna tarea
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada para eliminar' });
    }

    // 5. Si se eliminó, enviar una respuesta de éxito
    res.status(200).json({ message: `Tarea con ID ${id} eliminada correctamente` });

  } catch (error) {
    console.error('Error al eliminar tarea:', error); 
    res.status(500).json({ error: 'Error interno del servidor al eliminar la tarea' }); // Envía error genérico
  }
};




const updateTask = async (req, res) => {
  try {
    // 1. Obtener el ID de los parámetros de la URL
    const { id } = req.params;

    // Opcional: Validar si el ID es un número válido
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID proporcionado no es válido.' });
    }

    // 2. Obtener los datos actualizados del cuerpo de la solicitud
    console.log('Valor de req.body:', req.body);
    const { title, description, status } = req.body;

    // 3. Validar el estado si se proporciona
    if (status && !allowedStatuses.includes(status)) {
        return res.status(400).json({ error: `El estado debe ser uno de: ${allowedStatuses.join(', ')}` });
    }

    // Validar si al menos un campo para actualizar fue proporcionado
    if (title === undefined && description === undefined && status === undefined) {
         return res.status(400).json({ error: 'Se debe proporcionar al menos un campo (title, description o status) para actualizar.' });
    }

    // 4. Construir dinámicamente la consulta UPDATE basada en los campos proporcionados
    let updateQuery = 'UPDATE tasks SET ';
    const pool = await poolPromise; 
    const request = pool.request();

    const updates = []; // Array para construir las partes SET de la consulta

    if (title !== undefined) {
        updates.push('title = @title');
        request.input('title', title);
    }
    if (description !== undefined) {
        updates.push('description = @description');
        request.input('description', description);
    }
     if (status !== undefined) {
        // Mapeo de estado de texto a BIT (0 o 1)
        const isCompletedBit = (status === 'completada' ? 1 : 0);
        updates.push('isCompleted = @isCompleted'); 
        request.input('isCompleted', isCompletedBit);

        updates.push('StatusString = @statusString'); 
        request.input('statusString', status); 
        
    }

    if (updates.length === 0) {
         return res.status(400).json({ error: 'No hay campos válidos para actualizar después de la validación.' });
    }

    updateQuery += updates.join(', ') + ' WHERE id = @id';
    request.input('id', parseInt(id));

    // 5. Ejecutar la consulta
    const result = await request.query(updateQuery); 

    // 6. Verificar si se actualizó alguna tarea
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada para actualizar' });
    }

    // 7. Si se actualizó, enviar una respuesta de éxito
    res.status(200).json({ message: `Tarea con ID ${id} actualizada correctamente` });

  } catch (error) {
    console.error('Error al actualizar tarea:', error); 
    res.status(500).json({ error: 'Error interno del servidor al actualizar la tarea' }); 
  }
};




// Exportar como objeto:
module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  deleteTask,
  updateTask
};
