import React from "react";
import TaskTable from "../components/Containers/TaskTable";
import Toolbar from "../components/Layout/Toolbar/Toolbar";
import NewTaskDialog from "../components/Popups/NewTaskDialog";
import { Task } from "../types/Task";
import { User } from "../types/User";
import { Project } from "../types/Project";

interface TaskManagerProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  projects: Project[];
  owners: User[];
  onRefresh: () => void;
  onSort: (column: keyof Task, order: string) => void;
  onFilter: (filters: any) => void;
  onSearch: (searchText: string) => void;
  onStatusUpdate: (id: string, newStatus: string) => void;
  onNewTask: (newTask: any) => void;
  onTaskUpdate: (updatedTask: Task) => void;
  onDeleteTasks: (taskIds: string[]) => void; 
}

const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  setTasks,
  projects,
  owners,
  onRefresh,
  onSort,
  onFilter,
  onSearch,
  onStatusUpdate,
  onNewTask,
  onTaskUpdate,
  onDeleteTasks
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);


  return (
    <div>
      <Toolbar
        onApplySort={onSort}
        onFilterApply={onFilter}
        onRefresh={onRefresh}
        projects={projects.map((p) => p.name)}
        tasks={tasks.map((t) => t.title)}
        owners={owners.map((o) => o.name || o.username)}
        onSearch={onSearch}
        onNewTaskClick={() => setIsDialogOpen(true)}
      />
      <TaskTable
        tasks={tasks}
        owners={owners}
        projects={projects.map((p) => ({ id: p._id || "unknown-id", name: p.name }))}
        onStatusUpdate={onStatusUpdate}
        onTaskUpdate={onTaskUpdate}
        onDeleteTasks={onDeleteTasks}
      />
      <NewTaskDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={onNewTask}
        owners={owners.map((o) => ({ id: o._id, name: o.name || o.username }))}
        projects={projects.map((p) => ({ id: p._id || "unknown-id", name: p.name }))}
        />
    </div>
  );
};

export default TaskManager;
