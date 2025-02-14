import React, {useState} from 'react' 

function ToDoList(){
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    
    function handleInputChange(event){
        setNewTask(event.target.value)
    }

    function addTask(){
        if(newTask.trim() !== ''){
            setTasks(t => [...t, newTask])
            setNewTask('')    
        }
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i)=> i !== index)
        setTasks(updatedTasks)
    }

    function moveTaskUp(index) {
        if (index > 0) {
            setTasks(prevTasks => {
                const updatedTasks = [...prevTasks];
                [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
                return updatedTasks;
            });
        }
    }
    
    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            setTasks(prevTasks => {
                const updatedTasks = [...prevTasks];
                [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
                return updatedTasks;
            });
        }
    }
    
    return (
        <div className="to-do-list">
            <h1>To Do List</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={(event) => event.key === "Enter" && addTask()} 
                />
            </div>

            <button className="add-button" onClick={addTask}>
                Add Task
            </button>
            <ol>{tasks.map((task, index)=>
                <li key={index}>
                    <span className="text">{task}</span>
                    <button className="delete-button" onClick={()=>deleteTask(index)}>Delete task</button>
                    <button className="move-button" onClick={()=>moveTaskUp(index)}>UP</button>
                    <button className="move-button" onClick={()=>moveTaskDown(index)}>Down</button>
                
                </li>
            )}</ol>
        </div>
    )
}

export default ToDoList