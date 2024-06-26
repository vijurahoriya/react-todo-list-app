//TaskList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTask, editTask } from '../features/taskSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const handleSave = (id) => {
    dispatch(editTask({ id, text: editingText }));
    setEditingId(null);
    setEditingText('');
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {editingId === task.id ? (
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />
          ) : (
            task.text
          )}
          {editingId === task.id ? (
            <button onClick={() => handleSave(task.id)}>Save</button>
          ) : (
            <>
              <button onClick={() => dispatch(toggleTask(task.id))}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
              <button onClick={() => handleEdit(task)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

