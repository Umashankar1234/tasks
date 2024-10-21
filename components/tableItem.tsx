import React from 'react';
import useStore from '../store/tasks';
import userData from '../data/dummyData.json'; // Import the data.json file

interface TaskData {
    id: string;
    title: string;
    description?: string;
    assignee: string; // This will be the ID of the assignee
    priority: string; // This will be the ID of the priority
    dueDate: string;
    status: string; // This will be the ID of the status
}

interface TableItemProps {
    data: TaskData;
    onEdit: (data: TaskData) => void;
    index: number;
}

const TableItem: React.FC<TableItemProps> = ({ data, onEdit, index }) => {
    const updateStatus = useStore((state) => state.updateStatus);
    const removeTask = useStore((state) => state.removeTask);

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateStatus(data.id, event.target.value);
    };

    const handleRemove = () => {
        removeTask(data.id); // Call the removeTask function with the task ID
    };

    // Helper function to get user/priority/status name by ID
    const getUserNameById = (id: string) => {
        const user = userData.users.find(user => user.id === id);
        return user ? user.name : id; // Return user name or ID if not found
    };

    const getPriorityById = (id: string) => {
        const priority = userData.priorities.find(p => p.id === id);
        return priority ? priority.label : id; // Return priority level or ID if not found
    };

    const getStatusById = (id: string) => {
        const status = userData.statuses.find(s => s.id === id);
        return status ? status.id : id; // Return status or ID if not found
    };

    return (
        <tr>
            <td scope="row">{index}</td>
            <td>{data.title}</td>
            <td>{getUserNameById(data.assignee)}</td>
            <td>{getPriorityById(data.priority)}</td>
            <td>{new Date(data.dueDate).toLocaleDateString()}</td>
            <td>
                <select value={getStatusById(data.status)} className='form-select' onChange={handleStatusChange}>
                    {userData.statuses.map(status => (
                        <option key={status.id} value={status.id}>{status.label}</option>
                    ))}
                </select>
            </td>
            <td colSpan={2}>
                <button className='btn btn-info' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => onEdit(data)}>
                    Edit
                </button>
                <button className='btn btn-danger mx-2' onClick={handleRemove}>
                    Remove
                </button>
            </td>
        </tr>
    );
};

export default TableItem;
