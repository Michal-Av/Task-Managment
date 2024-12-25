import React from "react";
import { useTasks } from "../hooks/useTask";
import Header from "../components/Layout/Navigation/Header";
import Sidebar from "../components/Layout/Navigation/Sidebar";
import TaskManager from "./TaskManager";
import { Task } from "../types/Task";
import { addTask, deleteTask, getTasks, getTasksByProject, updateTask } from "../services/api-tasks";
import { addProject, deleteProject, getProjects } from "../services/api-projects";

const Home: React.FC = () => {
  const { tasks, setTasks, projects, setProjects, owners, selectedProject, setSelectedProject, filteredTasks ,setFilteredTasks } = useTasks();

  const handleRefresh = async () => {
    if (!selectedProject) return;
  
    try {
      const fetchedTasks = await getTasksByProject(selectedProject);
      const mappedTasks = fetchedTasks.map((task: any) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        owner: task.owner,
        priority: task.priority,
        deadline: task.deadline,
        createdBy: task.createdBy,
        project: task.project,
      }));
  
      setTasks(mappedTasks);
  
    
      if (filteredTasks.length > 0) {
        handleFilterApply({
          project: filteredTasks[0]?.project, 
          task: "", 
          owner: "",
          status: "",
        });
      } else {
        setFilteredTasks(mappedTasks); 
      }
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };

   // Add a new project
   const handleAddProject = async (newProject: {
    name: string;
    description: string;
    owner: string;
    sharedWith: string[];
  }) => {
    try {  
      const projectPayload = {
        name: newProject.name,
        description: newProject.description,
        owner: newProject.owner,
        sharedWith: newProject.sharedWith,
        tasks: [],
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
      };
  
      const addedProject = await addProject(projectPayload);
  

      const fetchedProjects = await getProjects();
  
      const mappedProjects = fetchedProjects.map((project: any) => ({
        id: project._id,
        name: project.name,
        description: project.description,
        owner: project.owner,
        tasks: project.tasks,
        sharedWith: project.sharedWith,
        createdAt: project.createdAt || "",
        updatedAt: project.updatedAt || "",
      }));
  
      setProjects(mappedProjects);
  
      console.log("New project added:", addedProject);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  
  // Delete a project
  const handleDeleteProject = async (projectId: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this project?")) {
        await deleteProject(projectId);
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        );

        if (selectedProject === projectId) {
          setSelectedProject(null); // Clear selected project if deleted
        }

        console.log("Project deleted ID:", projectId);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  
  // Handle sorting
  const handleSort = (column: keyof Task, order: string) => {
    const sorted = [...filteredTasks].sort((a, b) => {
      const valA = String(a[column] || "");
      const valB = String(b[column] || "");
  
      return order === "Ascending" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    setFilteredTasks(sorted);
  };
  

  // Handle filtering
  const handleFilterApply = (filters: { project?: string; task?: string; owner?: string; status?: string }) => {
    const filtered = tasks.filter((task) => {
      const matchesProject = !filters.project || projects.find((p) => p._id === task.projectId)?.name === filters.project;
      const matchesTask = !filters.task || task.title === filters.task;
      const matchesOwner = !filters.owner || owners.find((o) => o._id === task.createdBy)?.username === filters.owner || owners.find((o) => o._id === task.createdBy)?.name === filters.owner;
      const matchesStatus = !filters.status || task.status.toLowerCase() === filters.status.toLowerCase();
  
      return matchesProject && matchesTask && matchesOwner && matchesStatus;
    });
    console.log(filtered);
    
    setFilteredTasks(filtered);
  };
  

  // Handle status update
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateTask(id, { status: newStatus });
      handleRefresh();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  

  const handleSearch = (searchText: string) => {
    if (searchText.trim() === "") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  const handleTaskCreate = async (newTask: { 
    title: string; 
    priority: string; 
    createdBy: string; 
    description: string; 
    status: string; 
    deadline: string; 
    projectId: string; 
  }) => {
    console.log("New Task Created:", newTask);
    if (!selectedProject) return;
    try {
      await addTask(newTask);
      console.log("Task successfully created on the server.");
  
      const fetchedTasks = await getTasksByProject(selectedProject);
      const mappedTasks = fetchedTasks.map((task: any) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        owner: task.owner,
        priority: task.priority,
        deadline: task.deadline,
        createdBy: task.createdBy,
        project: task.project,
      }));
  
     
      setTasks(mappedTasks);
      setFilteredTasks(mappedTasks); 
    } catch (error) {
      console.error("Error creating task on the server:", error);
    }
  };

  const handleTaskUpdate = async (updatedTask: Task) => {
    try {
      // עדכון המשימה בשרת
      await updateTask(updatedTask.id, updatedTask);
      console.log("Task successfully updated on the server.");
  
      if (!selectedProject) return;
  
      const fetchedTasks = await getTasksByProject(selectedProject);
      const mappedTasks = fetchedTasks.map((task: any) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        owner: task.owner,
        priority: task.priority,
        deadline: task.deadline,
        createdBy: task.createdBy,
        project: task.project,
      }));
  
 
      setTasks(mappedTasks);
      setFilteredTasks(mappedTasks); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTasks = async (taskIds: string[]) => {
    if (!selectedProject) return;
    try {
      await deleteTask(taskIds[0])
      console.log("Tasks to delete:", taskIds);
  
      const fetchedTasks = await getTasksByProject(selectedProject);
      const mappedTasks = fetchedTasks.map((task: any) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        owner: task.owner,
        priority: task.priority,
        deadline: task.deadline,
        createdBy: task.createdBy,
        project: task.project,
      }));
  
     
      setTasks(mappedTasks);
      setFilteredTasks(mappedTasks); 
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };   
  
  const handleShowAllTasks = async () => {
    try {
      const allTasks = await getTasks();
      const mappedTasks = allTasks.map((task: any) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        owner: task.owner,
        priority: task.priority,
        deadline: task.deadline,
        createdBy: task.createdBy,
        projectId: task.projectId,
      }));
      setTasks(mappedTasks); 
      setFilteredTasks(mappedTasks); 
      setSelectedProject(null); 
    } catch (error) {
      console.error("Error fetching all tasks:", error);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar 
        projects={projects} 
        owners={owners.map((o) => ({ id: o._id, name: o.name || o.username }))}
        onShowAllTasks={handleShowAllTasks}
        onSelect={setSelectedProject}  
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
        />
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <TaskManager
            tasks={filteredTasks}
            setTasks={setTasks}
            projects={projects}
            owners={owners}
            onRefresh={handleRefresh}
            onSort={handleSort}
            onFilter={handleFilterApply}
            onSearch={handleSearch}
            onStatusUpdate={handleStatusUpdate}
            onNewTask={handleTaskCreate}
            onTaskUpdate={handleTaskUpdate}
            onDeleteTasks={handleDeleteTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
