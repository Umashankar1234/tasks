import React, { useEffect, useState } from 'react';
import AddNewTaskModal from './addNewTaskModal'; // Ensure correct path and case for the import
import TableItem from './tableItem'; // Ensure correct path and case for the import
import useStore, { TaskData } from '../store/tasks';
import userData from '../data/dummyData.json'; // Adjust the path as necessary


const Table = () => {
    const { tasks, addTask, updateTask } = useStore(); // Access tasks and actions from the store
    const [editMode, setEditMode] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<TaskData | null>(null); // Use `null` for empty state
    const [taskList, setTaskList] = useState<TaskData[]>([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [tasksPerPage] = useState<number>(5); // Change this number to set tasks per page

    const [searchTitle, setSearchTitle] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');

    // Edit task handler
    const editTask = (task: TaskData) => {
        setCurrentTask(task);
        setEditMode(true);
    };

    useEffect(() => {
        setTaskList(tasks);
    }, [tasks]);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTitle, statusFilter]);
    useEffect(() => {
        if (tasks.length <= tasksPerPage)
            setCurrentPage(1);
    }, [tasks]);

    const filteredTasks = taskList.filter(task => {
        return (
            (!statusFilter || task.status === statusFilter) &&
            (!searchTitle || task.title.toLowerCase().includes(searchTitle.toLowerCase()))
        );
    });

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    return (
        <>
            <AddNewTaskModal
                editMode={editMode}
                setEditMode={setEditMode}
                setCurrentTask={setCurrentTask}
                data={currentTask}
                onSubmit={editMode ? updateTask : addTask} // Handle submit based on mode
            />



            {/* Task Table */}
            {currentTasks.length > 0 ? (
                <> <div className="row mb-3 p-3">
                    <div className="col-md-6  mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title..."
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            {userData.statuses.map(status => (
                                <option key={status.id} value={status.id}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                    <div className="table-responsive">
                        <table className="custom table table-bordered table-hover">
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
                                {currentTasks.map((task, i) => (
                                    <TableItem
                                        key={task.id}
                                        index={indexOfFirstTask + i + 1} // Adjust the index for pagination
                                        data={task}
                                        onEdit={editTask} // Pass edit handler
                                    />
                                ))}
                            </tbody>
                        </table>

                        {tasks && tasks.length > tasksPerPage && <nav>
                            <ul className="pagination">
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button onClick={() => paginate(index + 1)} className="page-link">
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>}
                    </div></>
            ) : (
                <h4 className="text-center m-4">No tasks found</h4>
            )}
        </>
    );
};

export default Table;
