import React, { useState } from "react";
import { Popover, Typography, Box, Avatar, Chip } from "@mui/material";
import { User } from "../../types/User";

const OwnerMenu = ({ owner }: { owner: User }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const stringToColor = (string: string): string => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).slice(-2);
    }
    return color;
  };

  const avatarColor = stringToColor(owner?.name || owner?.username || "unknown");

  return (
    <Box
      sx={{ display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
       <Avatar sx={{ bgcolor: avatarColor, cursor: "pointer" }}>
        {owner?.name?.charAt(0).toUpperCase() || owner?.username?.charAt(0).toUpperCase() || "?"} {/* Fallback to "?" if name is undefined */}
      </Avatar>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleMouseLeave}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ pointerEvents: "none" }}
        disableRestoreFocus
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar sx={{ bgcolor: avatarColor, mr: 2 }}>
            {owner?.name?.charAt(0).toUpperCase() || owner?.username?.charAt(0).toUpperCase() || "?"}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {owner?.name || owner?.username || "Unknown Name"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {owner?.email || "Unknown Email"}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={owner?.role || "Viewer"}
            color="success"
            size="small"
            sx={{ mb: 1, fontWeight: "bold" }}
          />
          <Typography variant="body2" sx={{ color: owner?.status === "online" ? "green" : "gray" }}>
            {owner?.status === "online" ? "● Online" : "● Offline"}
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};

export default OwnerMenu;
