import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  OutlinedInput,
  FormControl,
  InputLabel,
  Box,
  Chip,
  ListItemButtonBaseProps,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const Sidebar = ({
  projects,
  owners,
  onShowAllTasks,
  onSelect,
  onAddProject,
  onDeleteProject,
}: {
  projects: any[];
  owners: { id: string; name: string }[];
  onShowAllTasks: () => void;
  onSelect: (id: string) => void;
  onAddProject: (project: {
    name: string;
    description: string;
    owner: string;
    sharedWith: string[];
  }) => void;
  onDeleteProject: (id: string) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewingAll, setIsViewingAll] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    owner: "",
    sharedWith: [] as string[],
  });

  const handleAddProject = () => {
    onAddProject({
      name: newProject.name,
      description: newProject.description,
      owner: newProject.owner,
      sharedWith: newProject.sharedWith,
    });
    setIsDialogOpen(false);
    setNewProject({
      name: "",
      description: "",
      owner: "",
      sharedWith: [],
    });
  };

  return (
    <div
      style={{
        width: "240px",
        backgroundColor: "#fff",
        height: "100%",
        overflowY: "auto",
        marginTop: "10px",
        borderRadius: "0 20px 0 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#f4f5f7",
          borderRadius: "20px 20px 0 0",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          My Projects
        </Typography>
        <IconButton onClick={() => setIsDialogOpen(true)}  sx={{ color: "black" }}>
          <Add />
        </IconButton>
      </div>
      
      <List>
      <ListItem 
        disablePadding
        sx={{
          width: "92%",
          justifyContent: "flex-start",
          display: "flex",
          alignItems: "center",
        }}
          >
      <ListItemButton
              onClick={onShowAllTasks}
              sx={{
                width: "calc(100% - 40px)",
                justifyContent: "flex-start",
              }}
            >
              <ListItemText primary="Show All Tasks" />
            </ListItemButton>
      
      </ListItem>

        {projects.map((project, index) => (
          <ListItem
            key={project._id || index}
            disablePadding
            sx={{
              width: "92%",
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemButton
              onClick={() => onSelect(project._id)}
              sx={{
                width: "calc(100% - 40px)",
                justifyContent: "flex-start",
              }}
            >
              <ListItemText primary={project.name} />
            </ListItemButton>
            <IconButton
              onClick={() => onDeleteProject(project._id)}
              sx={{ color: "gray"}}
              edge="end"
            >
              <Delete sx={{ fontSize: 18 }} />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Add Project Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="owner-select-label">Owner</InputLabel>
            <Select
              labelId="owner-select-label"
              value={newProject.owner}
              onChange={(e) => {
                const selectedOwner = e.target.value;

                // Remove the selected owner from the Shared With list if it exists
                setNewProject((prev) => ({
                  ...prev,
                  owner: selectedOwner,
                  sharedWith: prev.sharedWith.filter((id) => id !== selectedOwner),
                }));
              }}
            >
              {owners.map((owner) => (
                <MenuItem key={owner.id} value={owner.id}>
                  {owner.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="shared-with-select-label">Shared With</InputLabel>
            <Select
              labelId="shared-with-select-label"
              multiple
              value={newProject.sharedWith}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  sharedWith: e.target.value as string[],
                })
              }
              input={<OutlinedInput label="Shared With" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={owners.find((o) => o.id === value)?.name} />
                  ))}
                </Box>
              )}
            >
              {owners
                .filter((owner) => owner.id !== newProject.owner) // Exclude the selected owner
                .map((owner) => (
                  <MenuItem key={owner.id} value={owner.id}>
                    {owner.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddProject} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
