Here's the formatted documentation for your Task Management System:

# Task Management System

This is a **Task Management System** built with **Next.js**, **React**, and **Zustand** for efficient state management. The app supports features such as adding new tasks, editing existing tasks, and filtering tasks by status and title.

## Features

- **Task Creation**: Add new tasks with details such as title, assignee, priority, due date, and status.
- **Task Editing**: Seamlessly edit existing tasks.
- **Task Filtering**: Filter tasks by title or status for easy navigation.
- **Pagination**: Supports pagination to display tasks in chunks for better performance.
- **Form Validation**: Uses Yup for schema-based validation and React Hook Form for form handling.
- **Notifications**: Utilizes React Toastify for real-time notifications and user feedback.

## Technologies Used

- **Next.js**: For server-side rendering, routing, and API support.
- **React**: For building the user interface.
- **Zustand**: For state management, providing a simple yet powerful way to manage global state.
- **React Hook Form**: For efficient form handling and validation.
- **Yup**: For schema-based form validation.
- **React Toastify**: For providing user-friendly toast notifications.

## Packages Used

- **next**: The framework used for server-side rendering and static site generation.
- **react**: Core library for building UI components.
- **react-dom**: Provides DOM-specific methods for React.
- **zustand**: Used for managing the application’s global state without the boilerplate of Redux.
- **react-hook-form**: Simplifies form management with minimal re-renders.
- **@hookform/resolvers**: Provides schema validation (Yup in this case) for React Hook Form.
- **yup**: A schema builder for value parsing and validation.
- **react-toastify**: Adds toast notifications for user feedback.

## Getting Started

To run the project locally, follow the instructions below.

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your local machine.

### Clone the Repository

```bash
git clone https://github.com/your-repo/task-management-system.git
```

### Go to Project Directory

```bash
cd task-management-system
```

### Install Dependencies

```bash
npm install
```

### Run the Project

```bash
npm run dev
```

Now you can access the Task Management System at `http://localhost:3000`. Enjoy managing your tasks!