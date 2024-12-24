import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";

interface NewTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (task: {
    title: string;
    description: string;
    status: string;
    priority: string;
    createdBy: string;
    deadline: string;
    projectId: string;
  }) => void;
  owners: { id: string; name: string }[];
  projects: { id: string; name: string }[];
}

const NewTaskDialog: React.FC<NewTaskDialogProps> = ({
  open,
  onClose,
  onCreate,
  owners,
  projects,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("medium");
  const [createdBy, setOwner] = useState("");
  const [deadline, setDeadline] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = () => {
    onCreate({
      title,
      description,
      status,
      priority,
      createdBy,
      deadline,
      projectId,
    });
    setTitle("");
    setDescription("");
    setStatus("Todo");
    setPriority("medium");
    setOwner("");
    setDeadline("");
    setProjectId("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Task</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            multiline
            rows={2}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Status"
            select
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="stuck">Stuck</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Priority"
            select
            fullWidth
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Owner"
            select
            fullWidth
            value={createdBy}
            onChange={(e) => setOwner(e.target.value)}
          >
            {owners.map((owner) => (
              <MenuItem key={createdBy} value={owner.id}>
                {owner.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project"
            select
            fullWidth
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTaskDialog;
