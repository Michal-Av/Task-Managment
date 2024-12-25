import { useState, useEffect } from "react";
import { getProjects } from "../services/api-projects";
import { getTasksByProject, updateTask, addTask } from "../services/api-tasks";
import { getUsers } from "../services/api-users";
import { Task } from "../types/Task";
import { Project } from "../types/Project";
import { User } from "../types/User";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [owners, setOwners] = useState<User[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
      if (fetchedProjects.length > 0) setSelectedProject(fetchedProjects[0]._id);
    };
    fetchProjects();
  }, []);

  useEffect(() => { 
    const fetchTasks = async () => {
      if (!selectedProject) return;
      const fetchedTasks = await getTasksByProject(selectedProject);
      setTasks(fetchedTasks);
      setFilteredTasks(fetchedTasks);
    };
    fetchTasks();
  }, [selectedProject]);

  useEffect(() => {
    const fetchOwners = async () => {
      const fetchedOwners = await getUsers();
      setOwners(fetchedOwners);
    };
    fetchOwners();
  }, []);


  return {
    tasks,
    setTasks,
    projects,
    setProjects,
    owners,
    selectedProject,
    setSelectedProject,
    filteredTasks,
    setFilteredTasks,
    isDialogOpen,
    setIsDialogOpen,
  };
};
