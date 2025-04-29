const express = require('express');
const router = express.Router();

const controller = require('../controllers/tasksController');

router.get('/', controller.getAllTasks); 
router.post('/', controller.createTask);

router.get('/:id', controller.getTaskById); 

router.delete('/:id', controller.deleteTask);

router.put('/:id', controller.updateTask);


module.exports = router;
