import React, { useState } from 'react';
import AddNewTaskModal from './addNewTaskModal'; // Ensure correct path and case for the import
import TableItem from './tableItem'; // Ensure correct path and case for the import
import useStore, { TaskData } from '../store/tasks';

const Table = () => {
    const { tasks, addTask, updateTask } = useStore(); // Access tasks and actions from the store
    const [editMode, setEditMode] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<TaskData | null>(null); // Use `null` for empty state

    // Edit task handler
    const editTask = (task: TaskData) => {
        setCurrentTask(task); // Set the task to be edited
        setEditMode(true); // Enable edit mode
    };

    // Add new task handler
    

    return (
        <>
            <AddNewTaskModal
                editMode={editMode}
                setEditMode={setEditMode}
                setCurrentTask={setCurrentTask}
                data={currentTask}
                onSubmit={editMode ? updateTask : addTask} // Handle submit based on mode
            />

            {tasks && tasks.length > 0 ? <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Task Title</th>
                        <th scope="col">Assignee</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, i) => (
                        <TableItem
                            key={task.id}
                            index={i + 1}
                            data={task}
                            onEdit={editTask} // Pass edit handler
                        />
                    ))}
                </tbody>
            </table> : <h4>No tasks added</h4>}
        </>
    );
};

export default Table;
