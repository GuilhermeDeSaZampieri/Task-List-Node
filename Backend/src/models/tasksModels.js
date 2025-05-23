const connection = require('../models/connection');

const getAll = async () =>{
    //
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const CreateTask = async(task) => {

    const { title } = task;
    
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title,status,created_at) VALUES (?,?,?)';
    const [createdTask] = await connection.execute(query, [title,'pendente',dateUTC]);

    const queryReturn = 'SELECT * FROM tasks WHERE id = ?';
    const [row] = await connection.execute(queryReturn, [createdTask.insertId]);
    
    return row[0];
};

const deleteTask = async (id) =>{
        const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
        return removedTask;
    };

const updateTask = async (id, task) =>{

        const {title, status} = task;

        const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
        await connection.execute(query, [title, status, id]);

        const queryReturn = 'SELECT * FROM tasks WHERE id = ?';
        const [result] = await connection.execute(queryReturn, [id]);

        return result[0];
    };


module.exports = {
    getAll,
    CreateTask,
    deleteTask,
    updateTask
};