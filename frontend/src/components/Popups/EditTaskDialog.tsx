import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

interface EditTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedTask: any) => void;
  task: any;
  owners: { id: string; name: string }[];
  statuses: string[];
  projects: { id: string; name: string }[];
  priorities: string[];
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  onClose,
  onSave,
  task,
  owners,
  statuses,
  projects,
  priorities,
}) => {
  const [editedTask, setEditedTask] = useState<any>({});
  const [selectedProject, setSelectedProject] = useState<string>("");
  
  // Update editedTask whenever task changes
  useEffect(() => {
    if (task) {
      console.log("Task data:", task);
      const project = projects.find((p) => p.id === task.projectId) || { id: "", name: "" };
      setEditedTask({
        ...task,
        projectId: task.projectId || project.id,
        priority: task.priority || "", // בדוק אם יש עדיפות קיימת
        status: task.status || "",    // טען את הסטטוס הקיים או ברירת מחדל
        deadline: task.deadline
          ? new Date(task.deadline).toISOString().slice(0, 16)
          : "",
      });
      setSelectedProject(task.projectId || project.id);
    }
  }, [task, projects]);
  
  const handleChange = (field: string, value: any) => {
    setEditedTask((prev: any) => ({ ...prev, [field]: value }));
    console.log(editedTask);
    
  };

  const handleProjectChange = (value: string) => {
    setSelectedProject(value);
    handleChange("projectId", value); // Update projectId in editedTask
  };

  const handleSave = () => {
    const updatedTask = {
      ...editedTask,
      deadline: editedTask.deadline
        ? new Date(editedTask.deadline).toISOString() // Convert back to ISO format for saving
        : null,
    };
    onSave(updatedTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Title"
          value={editedTask.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={editedTask.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
         <TextField
          select
          label="Priority"
          value={editedTask.priority || ""}
          onChange={(e) => handleChange("priority", e.target.value)}
          fullWidth
        >
          {priorities.map((priority) => (
            <MenuItem key={priority} value={priority}>
              {priority}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          value={editedTask.status || ""}
          onChange={(e) => handleChange("status", e.target.value)}
          fullWidth
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Deadline"
          type="datetime-local"
          value={editedTask.deadline || ""}
          onChange={(e) => handleChange("deadline", e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Owner"
          value={editedTask.createdBy || ""}
          onChange={(e) => handleChange("createdBy", e.target.value)}
          fullWidth
        >
          {owners.map((owner) => (
            <MenuItem key={owner.id} value={owner.id}>
              {owner.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Project"
          value={selectedProject}
          onChange={(e) => handleProjectChange(e.target.value)}
          fullWidth
        >
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
