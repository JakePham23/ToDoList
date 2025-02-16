import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    });

    const [newTasks, setNewTasks] = useState({
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Saturday: '',
        Sunday: '',
    });

    function handleInputChange(day, event) {
        setNewTasks(prev => ({
            ...prev,
            [day]: event.target.value
        }));
    }

    function addTask(day) {
        if (newTasks[day].trim() === '') return;

        setTasks(prev => ({
            ...prev,
            [day]: [...prev[day], newTasks[day]]
        }));

        setNewTasks(prev => ({
            ...prev,
            [day]: ''
        }));
    }

    function deleteTask(day, index) {
        setTasks(prev => ({
            ...prev,
            [day]: prev[day].filter((_, i) => i !== index)
        }));
    }

    function moveTaskUp(day, index) {
        setTasks(prev => {
            const newTasks = [...prev[day]];
            if (index > 0) {
                [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
            }
            return { ...prev, [day]: newTasks };
        });
    }

    function moveTaskDown(day, index) {
        setTasks(prev => {
            const newTasks = [...prev[day]];
            if (index < newTasks.length - 1) {
                [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
            }
            return { ...prev, [day]: newTasks };
        });
    }

    return (
        <div className="to-do-list">
            <h1>📅 Weekly To-Do List</h1>

            <div className="week-container">
                {Object.keys(tasks).map(day => (
                    <div key={day} className="day-column">
                        <h3>{day}</h3>
                        <input 
                            type="text" 
                            placeholder="Enter a task..."
                            value={newTasks[day] || ""} // Đảm bảo không lỗi khi nhập
                            onChange={(e) => handleInputChange(day, e)}
                            onKeyDown={(event) => event.key === "Enter" && addTask(day)} // Truyền `day`
                        />
                        <button className="add-button" onClick={() => addTask(day)}>➕</button>

                        <ul>
                            {tasks[day].map((task, index) => (
                                <li key={index} className="task-item">
                                <span>{task}</span> 
                                <div className="task-buttons">
                                    <button onClick={() => deleteTask(day, index)}>❌</button>
                                    <button onClick={() => moveTaskUp(day, index)}>🔼</button>
                                    <button onClick={() => moveTaskDown(day, index)}>🔽</button>
                                </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ToDoList;
