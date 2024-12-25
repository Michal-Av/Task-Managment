
# 📝 Task Management Application

A robust task management solution designed to help users organize their responsibilities across personal, family, and work domains. This app provides a seamless experience for managing tasks, projects, and collaborations, enabling users to capture, organize, and complete tasks efficiently.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React (TypeScript)
- **State Management:** Context API and Hooks
- **Styling:** Material-UI (MUI) for modern and responsive UI components
- **Libraries:** Axios, React Router

### **Backend**
- **Framework:** Node.js (Express)
- **Database:** MongoDB (Mongoose)
- **Validation:** Joi Middleware for request validation

---

## 🖥️ Features

### **Frontend**
- **Task Management:**
  - Create, update, and delete tasks with detailed attributes such as title, description, priority, deadline, and status.
- **Project Management:**
  - Organize tasks under projects for better categorization.
  - Create, and delete projects dynamically.
- **Task Filtering and Sorting:**
  - Filter tasks by status, priority, owner, or project.
  - Sort tasks by various attributes like deadline, title, or priority.
- **Search Functionality:**
  - Perform a keyword search to quickly locate specific tasks or projects.
- **Collaboration:**
  - Assign tasks to users and share projects with collaborators.

### **Backend**
- **RESTful API:**
  - Comprehensive endpoints for managing tasks and projects.
- **Data Validation:**
  - Ensures data integrity with Joi middleware.
- **MongoDB Integration:**
  - Persistent storage and retrieval of tasks and project data.

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js:** Version 14.x or higher.
- **MongoDB:** Installed locally or a MongoDB Atlas cloud database.
- **Git:** To clone the repository.

---

### **Installation Steps**

1. **Clone the Repository:**
   git clone https://github.com/Michal-Av/Tasks-Managment.git
   cd Tasks-Managment

2. **Install Dependencies:**
   - **Backend:**
     cd backend
     npm install
  
   - **Frontend:**

     cd ../frontend
     npm install
     

3. **Environment Setup:**


4. **Start the Application:**
   - **Backend:**
    
     cd backend
     npm start
    
   - **Frontend:**
     
     cd ../frontend
     npm start
  

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

---

## 📄 API Documentation

### **Base URL**
```
http://localhost:8000
```

### **Endpoints**
- **Tasks:**
  - `GET /tasks`: Fetch all tasks.
  - `POST /tasks`: Add a new task.
  - `PUT /tasks/:id`: Update a task by its ID.
  - `DELETE /tasks/:id`: Delete a task by its ID.
- **Projects:**
  - `GET /projects`: Fetch all projects.
  - `POST /projects`: Add a new project.
  - `PUT /projects/:id`: Update a project by its ID.
  - `DELETE /projects/:id`: Delete a project and all associated tasks.

---

## 📂 Folder Structure

```plaintext
/backend
├── config/        # Configuration files (e.g., database, environment)
├── controllers/   # Request handlers
├── models/        # Mongoose models for tasks and projects
├── routes/        # API routes
├── services/      # Business logic
├── utils/         # Utility functions
└── middleware/    # Validation and authentication middleware

/frontend
├── src/
│   ├── assets/    # Images and icons
│   ├── components/ # Reusable UI components
│   ├── pages/     # Application views
│   ├── services/  # API call logic
│   ├── hooks/     # Custom React hooks
│   ├── styles/    # CSS or SCSS files
│   └── types/     # TypeScript types
```

---

## 🔧 Troubleshooting

- **MongoDB Connection Issues:** Ensure MongoDB is running and the connection string in `.env` is correct.
- **Port Conflicts:** Change ports in `.env` and `package.json` if conflicts arise.

---

## 📸 Screenshots

### **Task Table**
A comprehensive view of tasks, organized by project.

![Task Table Screenshot](screenshot_task_table.png)

### **Add/Edit Task Dialog**
Easily add or edit tasks with a user-friendly dialog.

![Task Dialog Screenshot](screenshot_task_dialog.png)

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🙌 Acknowledgements

- Material-UI for responsive and modern UI components.
- MongoDB for robust and scalable database solutions.
- React for an exceptional frontend development experience.

---

## 💬 Contact

- **Author:** Michal Avrahami
- **Email:** michalus.av@gmail.com
- **GitHub:** [Michal-Av](https://github.com/Michal-Av)

--- 

Feel free to modify the file to better fit your needs or include additional sections as required!
