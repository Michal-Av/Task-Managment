import React, { useState } from "react";
import {
  Button,
  Menu,
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

const SortMenu = ({ onApply }: { onApply: (column: string, order: string) => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [column, setColumn] = useState("");
  const [order, setOrder] = useState("Ascending");

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColumnChange = (event: SelectChangeEvent) => {
    setColumn(event.target.value);
  };

  const handleOrderChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  };

  return (
    <Box>
  <Button variant="outlined"  color="success" onClick={handleOpen}>
    Sort
  </Button>

  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
  >
    <Box
      sx={{
        padding: "15px",
        minWidth: "400px", // הגדלת רוחב התפריט
        display: "flex",
        gap: "20px", // מרווח בין השדות
        alignItems: "center",
      }}
    >
      <FormControl fullWidth size="small">
        <InputLabel>Choose column</InputLabel>
        <Select value={column} onChange={handleColumnChange} label="Choose column">
          <MenuItem value="title">Task</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="createdBy">Owner</MenuItem>
          <MenuItem value="deadline">Deadline</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Order</InputLabel>
        <Select value={order} onChange={handleOrderChange} label="Order">
          <MenuItem value="Ascending">Ascending</MenuItem>
          <MenuItem value="Descending">Descending</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="success"
        onClick={() => {
          onApply(column, order);
          handleClose();
        }}
        sx={{ height: "fit-content" }}
      >
        Apply
      </Button>
    </Box>
  </Menu>
</Box>

  );
};

export default SortMenu;
