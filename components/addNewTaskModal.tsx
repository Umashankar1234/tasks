import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TaskData } from '../store/tasks';
import userData from '../data/dummyData.json'; // Adjust the path as necessary

interface AddNewTaskModalProps {
    editMode?: boolean;
    data: TaskData | null;
    setCurrentTask?: (value: TaskData | null) => void;
    setEditMode?: (value: boolean) => void;
    onSubmit: (value: TaskData) => void;
}

const AddNewTaskModal: React.FC<AddNewTaskModalProps> = ({
    editMode = false,
    data,
    setCurrentTask,
    setEditMode,
    onSubmit,
}) => {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
        assignee: Yup.string().required('Assignee is required'),
        priority: Yup.string().required('Priority is required'),
        dueDate: Yup.date()
            .nullable()
            .transform((value, originalValue) => {
                return originalValue === '' ? null : value;
            })
            .required('Due date is required')
            .test('is-valid-date', 'Due date must be today or later', value => {
                return value && value >= new Date();
            }),
        status: Yup.string().required('Status is required'),
    });

    const closeBtnRef = useRef<HTMLButtonElement>(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<TaskData>({
        resolver: yupResolver(validationSchema),
    });

    // When data changes or editMode toggles, update the form
    useEffect(() => {
        if (editMode && data) {
            setValue('title', data.title);
            setValue('description', data.description || '');
            setValue('assignee', data.assignee || '');
            setValue('priority', data.priority || '');
            setValue('dueDate', data.dueDate ? new Date(data.dueDate).toISOString().split('T')[0] : '');
            setValue('status', data.status || '');
        } else {
            reset(); // Clear the form when it's not in editMode
        }
    }, [editMode, data, setValue, reset]);

    // Submit handler
    const handleFormSubmit = (formData: TaskData) => {
        const taskData: TaskData = {
            id: editMode && data ? data.id : String(Date.now()), // Use existing ID if in edit mode, else create a new one
            title: formData.title,
            description: formData.description,
            assignee: formData.assignee,
            priority: formData.priority,
            dueDate: formData.dueDate,
            status: formData.status,
        };
        if (editMode) return onSubmit(data!.id, taskData);
        onSubmit(taskData); // Call the parent's onSubmit handler
        reset(); // Reset form after submission
        closeBtnRef.current!.click();
    };

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                    if (setCurrentTask && setEditMode) {
                        setCurrentTask(null); // Reset current task
                        setEditMode(false); // Switch to add mode
                        reset(); // Clear form fields
                    }
                }}
            >
                Add New Task
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {editMode ? 'Edit Task' : 'Add New Task'}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                            {...register('title')}
                                        />
                                        {errors.title && <span className="text-danger">{errors.title.message}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea rows={4} className="form-control" {...register('description')} />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label className="form-label">Assignee</label>
                                        <select className={`form-select ${errors.assignee ? 'is-invalid' : ''}`} {...register('assignee')}>
                                            <option value="">-Select-</option>
                                            {userData.users.map(user => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.assignee && <span className="text-danger">{errors.assignee.message}</span>}
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label className="form-label">Priority</label>
                                        <select className={`form-select ${errors.priority ? 'is-invalid' : ''}`} {...register('priority')}>
                                            <option value="">-Select-</option>
                                            {userData.priorities.map(priority => (
                                                <option key={priority.id} value={priority.id}>
                                                    {priority.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.priority && <span className="text-danger">{errors.priority.message}</span>}
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label className="form-label">Due date</label>
                                        <input
                                            type="date"
                                            className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
                                            {...register('dueDate')}
                                        />
                                        {errors.dueDate && <span className="text-danger">{errors.dueDate.message}</span>}
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label className="form-label">Status</label>
                                        <select className={`form-select ${errors.status ? 'is-invalid' : ''}`} {...register('status')}>
                                            <option value="">-Select-</option>
                                            {userData.statuses.map(status => (
                                                <option key={status.id} value={status.id}>
                                                    {status.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.status && <span className="text-danger">{errors.status.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeBtnRef} >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editMode ? 'Update Task' : 'Save Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewTaskModal;
