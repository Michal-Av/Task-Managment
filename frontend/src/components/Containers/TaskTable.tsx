import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Chip, Paper, Box, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import StatusMenu from "../UIElements/StatusMenu";
import { format } from "date-fns";
import "./TaskTable.css";
import OwnerMenu from "../UIElements/ownerMenu";
import EditTaskDialog from "../Popups/EditTaskDialog";

const TaskTable = ({
  tasks,
  owners,
  projects,
  onStatusUpdate,
  onTaskUpdate,
  onDeleteTasks,
}: {
  tasks: any[];
  owners: any[];
  projects: any[];
  onStatusUpdate: (id: string, newStatus: string) => void;
  onTaskUpdate: (updatedTask: any) => void;
  onDeleteTasks: (taskIds: string[]) => void;

}) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const priorities = ["low", "medium", "high"];
  const statusOptions = ["todo", "in-progress", "done", "stuck"];

  const statusColors: Record<string, string> = {
    todo: "#2196F3",
    "in-progress": "#FF9800",
    done: "#4CAF50",
    stuck: "#F44336",
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    taskId: string
  ) => {
    setMenuAnchor(event.currentTarget);
    setCurrentTaskId(taskId);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setCurrentTaskId(null);
  };

  const handleStatusChange = (newStatus: string) => {
    if (currentTaskId) {
      onStatusUpdate(currentTaskId, newStatus);
    }
    handleCloseMenu();
  };

  const handleEditClick = (task: any) => {
    setSelectedTask(task);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedTask(null);
  };

  const handleEditSave = (updatedTask: any) => {
    onTaskUpdate(updatedTask);
    handleEditDialogClose();
  };

  const handleDelete = () => {
    if (selectedRows.length > 0) {
      onDeleteTasks(selectedRows);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Task",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        const statusKey = String(params.value).toLowerCase();
        const color = statusColors[statusKey] || "#9E9E9E";
        return (
          <Chip
            label={params.value}
            onClick={(event) => handleOpenMenu(event, params.row.id)}
            sx={{
              backgroundColor: color,
              color: "#fff",
              fontWeight: "500",
              textTransform: "capitalize",
              cursor: "pointer",
            }}
          />
        );
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
    },
    {
      field: "owner",
      headerName: "Owner",
      width: 150,
      renderCell: (params) => {
        const owner = owners.find((o) => o._id === params.row.createdBy);
        return (
          <OwnerMenu
            owner={
              owner || {
                name: "Unknown",
                email: "N/A",
                role: "N/A",
                location: "N/A",
                status: "offline",
              }
            }
          />
        );
      },
    },
    {
      field: "deadline",
      headerName: "Deadline",
      width: 200,
      renderCell: (params) => {
        const formattedDate = format(new Date(params.value), "dd/MM/yyyy HH:mm");
        const isPastDeadline = new Date(params.value) < new Date();
        return (
          <span style={{ color: isPastDeadline ? "#F44336" : "#4CAF50" }}>
            {formattedDate}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const rows = tasks.map((task) => ({
    ...task,
    id: task.id || task._id,
    status: task.status || "Todo",
  }));

  return (
    <Paper sx={{ height: 600, width: "100%", position: "relative" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 100]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => setSelectedRows(ids as string[])}
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "16px",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f1f1f1",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "14px",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#f5f5f5",
          },
        }}
      />
        <Box
    sx={{
      position: "absolute",
      bottom: 12,
      left: "12%",
      transform: "translateX(-90%)",
      display: "flex",
      alignItems: "center",
      gap: 0,
      cursor: selectedRows.length > 0 ? "pointer" : "not-allowed",
      pointerEvents: selectedRows.length > 0 ? "auto" : "none",
    }}
    onClick={handleDelete}
  >
    <DeleteIcon
      sx={{
        color: selectedRows.length > 0 ? "#F44336" : "#BDBDBD",
        fontSize: 30,
      }}
    />
        <Typography
      sx={{
        color: selectedRows.length > 0 ? "#F44336" : "#BDBDBD",
        
      }}
    >
      Delete
    </Typography>
      </Box>
      <StatusMenu
        anchorEl={menuAnchor}
        onClose={handleCloseMenu}
        options={statusOptions}
        currentStatus={
          currentTaskId
            ? tasks.find((task) => task.id === currentTaskId)?.status
            : ""
        }
        onStatusChange={handleStatusChange}
      />
      {selectedTask && (
        <EditTaskDialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
          onSave={handleEditSave}
          task={selectedTask}
          owners={owners.map((o) => ({ id: o._id, name: o.name || o.username }))}
          statuses={statusOptions}
          projects={projects.map((p) => ({ id: p.id, name: p.name}))}
          priorities={priorities}
        />
      )}
    </Paper>
  );
};

export default TaskTable;
