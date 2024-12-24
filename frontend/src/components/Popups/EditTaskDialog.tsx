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
}

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  onClose,
  onSave,
  task,
  owners,
  statuses,
}) => {
  const [editedTask, setEditedTask] = useState<any>({});

  // Update editedTask whenever task changes
  useEffect(() => {
    if (task) {
      setEditedTask({
        ...task,
        deadline: task.deadline
          ? new Date(task.deadline).toISOString().slice(0, 16) // Convert to datetime-local format
          : "",
      });
    }
  }, [task]);

  const handleChange = (field: string, value: any) => {
    setEditedTask((prev: any) => ({ ...prev, [field]: value }));
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
