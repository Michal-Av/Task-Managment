import React from "react";
import { Box, Button, TextField, Autocomplete, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import SortMenu from "./SortMenu";
import FilterMenu from "./FilterMenu";

interface ToolbarProps {
  onApplySort: (column: string, order: string) => void;
  onFilterApply: (filters: { project?: string; task?: string; owner?: string; status?: string }) => void;
  onRefresh: () => void;
  projects: string[];
  tasks: string[];
  owners: string[];
  onSearch: (searchText: string) => void; 
  onNewTaskClick: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onApplySort,
  onFilterApply,
  onRefresh,
  projects,
  tasks,
  owners,
  onSearch,
  onNewTaskClick,
}) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = (event: React.SyntheticEvent, value: string | null) => {
    setSearchValue(value || "");
    onSearch(value || ""); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Left Section */}
      <Box sx={{ display: "flex", gap: "10px" }}>
      <Button variant="contained" color="success" onClick={onNewTaskClick}>
        New Task
      </Button>
        <Autocomplete
          freeSolo
          options={tasks}
          value={searchValue}
          onInputChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              variant="outlined"
              placeholder="Search Tasks"
              InputProps={{
                ...params.InputProps,
                startAdornment: <SearchIcon sx={{ marginRight: "8px" }} />,
              }}
            />
          )}
          sx={{ width: 400 }}
        />
        <IconButton onClick={onRefresh} >
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* Right Section */}
      <Box sx={{ display: "flex", gap: "10px" }}>
        <FilterMenu
          projects={projects}
          tasks={tasks}
          owners={owners}
          status={["Todo", "Done", "In-Progress", "Stuck"]}
          onFilterApply={onFilterApply}
        />
        <SortMenu onApply={onApplySort} />
        {/* <Button color="success" variant="outlined">
          Group by
        </Button> */}
      </Box>
    </Box>
  );
};

export default Toolbar;
