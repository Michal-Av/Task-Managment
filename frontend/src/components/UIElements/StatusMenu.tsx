import { Menu, MenuItem, Box } from "@mui/material";
import React from "react";

const StatusMenu = ({
  anchorEl,
  onClose,
  options,
  currentStatus,
  onStatusChange,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  options: string[];
  currentStatus: string;
  onStatusChange: (status: string) => void;
}) => {
  const statusColors: Record<string, string> = {
    todo: "#2196F3",
    "in-progress": "#FF9800",
    done: "#4CAF50",
    stuck: "#F44336",
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        style: { padding: "10px" },
      }}
    >
      {options.map((status) => (
        <MenuItem
          key={status}
          onClick={() => {
            onStatusChange(status);
            onClose();
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor:
              currentStatus?.toLowerCase() === status.toLowerCase()
                ? "#e0e0e0"
                : "transparent",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Box
            sx={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor:
                statusColors[status.toLowerCase()] || "#BDBDBD",
            }}
          ></Box>
          {status}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default StatusMenu;
