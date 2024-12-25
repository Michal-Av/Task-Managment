import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  Box,
  Chip,
  Typography,
  Divider,
} from "@mui/material";

interface FilterMenuProps {
  projects: string[];
  tasks: string[];
  owners: string[];
  status: string[];
  onFilterApply: (filters: { project?: string; tasks?: string; owner?: string; status?: string }) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ projects, tasks, owners, status, onFilterApply }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    project: "",
    task: "",
    owner: "",
    status: "",
  });

  useEffect(() => {
    // Reset filters if data updates
    setSelectedFilters({ project: "", task: "", owner: "", status: "" });
  }, [projects, tasks, owners, status]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: prev[key as keyof typeof prev] === value ? "" : value, // Toggle selection
    }));
  };
  

  const handleClearAll = () => {
    setSelectedFilters({ project: "", task: "", owner: "", status: "" });
    onFilterApply({}); // Clear filters in the parent component
  };
  
  const handleApplyFilters = () => {
    onFilterApply(selectedFilters);
    handleMenuClose();
  };

  return (
    <Box>
      <Button variant="outlined" color="success" onClick={handleMenuOpen}>
        Filter
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ minWidth: 500 }}
      >
        <Box sx={{ padding: 2, minWidth: 500 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Quick Filters
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Showing all tasks
          </Typography>

          <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", 
                gap: 4, 
            }}
            >
            {/* Project Filter */}
            <Box>
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                Project
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {projects.map((item, index) => (
                  <Chip
                    key={`project-${index}`}
                    label={item}
                    sx={{
                      margin: "2px 0",
                      backgroundColor: selectedFilters.project === item ? "#4CAF50" : undefined,
                      color: selectedFilters.project === item ? "#fff" : undefined,
                    }}
                    onClick={() => handleFilterChange("project", item)}
                  />
                ))}
              </Box>
            </Box>
            {/* Name Filter */}
            <Box>
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                Name
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {tasks.map((item, index) => (
                  <Chip
                    key={`task-${index}`}
                    label={item}
                    sx={{
                      margin: "2px 0",
                      backgroundColor: selectedFilters.task === item ? "#4CAF50" : undefined,
                      color: selectedFilters.task === item ? "#fff" : undefined,
                    }}
                    onClick={() => handleFilterChange("task", item)}
                  />
                ))}
              </Box>
            </Box>


            {/* Owner Filter */}
            <Box>
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                Owner
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {owners.map((item, index) => (
                  <Chip
                    key={`owner-${index}`}
                    label={item}
                    sx={{
                      margin: "2px 0",
                      backgroundColor: selectedFilters.owner === item ? "#4CAF50" : undefined,
                      color: selectedFilters.owner === item ? "#fff" : undefined,
                    }}
                    onClick={() => handleFilterChange("owner", item)}
                  />
                ))}
              </Box>
            </Box>

            {/* Status Filter */}
            <Box>
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                Status
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {status.map((item, index) => (
                  <Chip
                    key={`status-${index}`}
                    label={item}
                    sx={{
                      margin: "2px 0",
                      backgroundColor: selectedFilters.status === item ? "#4CAF50" : undefined,
                      color: selectedFilters.status === item ? "#fff" : undefined,
                    }}
                    onClick={() => handleFilterChange("status", item)}
                  />
                ))}
              </Box>
            </Box>

            </Box>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleClearAll}>Clear All</Button>
            <Button variant="contained" color="primary" onClick={handleApplyFilters}>
              Apply
            </Button>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default FilterMenu;
