import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const Sidebar = ({ projects, onSelect }: { projects: any[]; onSelect: (id: string) => void }) => {
  return (
    <div style={{ width: "240px", backgroundColor: "#fff", height: "100%", overflowY: "auto", marginTop:"10px", borderRadius:"0 20px 0 0"}}>
      <List>
      {projects.map((project, index) =>  (
          <ListItem key={project._id  || index} disablePadding onClick={() => onSelect(project._id)}
          sx={{
            width: "100%",
            justifyContent: "flex-start",
          }}>
            <ListItemButton 
              onClick={() => onSelect(project._id)}
              sx={{
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              <ListItemText primary={project.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
