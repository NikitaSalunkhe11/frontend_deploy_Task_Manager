import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  deleteTask,
  updateTask,
} from "../../features/tasks/taskThunks";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Divider,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const lightColors = [
  "#FFFDE7",
  "#F1F8E9",
  "#E3F2FD",
  "#EDE7F6",
  "#FFF3E0",
  "#FCE4EC",
];

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [statusFilter, setStatusFilter] = useState("all");

  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
  dispatch(deleteTask(id))
    .unwrap()
    .then(() => {
      toast.success("Task successfully deleted!");
    })
    .catch(() => {
      toast.error("Failed to delete task.");
    });
};

  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditPriority(task.priority);
    setEditStatus(task.status);
    setEditEndDate(task.endDate?.slice(0, 10) || "");
  };

  const handleCancel = () => {
    setEditTaskId(null);
    setEditTitle("");
    setEditDesc("");
    setEditPriority("");
    setEditStatus("");
    setEditEndDate("");
  };

  const handleSave = (id) => {
  if (!id) {
    console.error("Task ID is undefined!");
    return;
  }
  dispatch(updateTask({
    id,
    title: editTitle,
    description: editDesc,
    priority: editPriority,
    status: editStatus,
    endDate: editEndDate,
  }))
  .unwrap()
  .then(() => {
    toast.success("Task successfully updated!");
    handleCancel();
  })
  .catch(() => {
    toast.error("Failed to update task.");
  });
};

  const getRandomColor = (index) => lightColors[index % lightColors.length];

  const filteredTasks = tasks.filter((task) =>
  statusFilter === "all" ||
  task.status.toLowerCase().trim() === statusFilter.toLowerCase().trim()
);


  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <Box maxWidth="100%" mx="auto" mt={5}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Your Tasks
        </Typography>

        <FormControl
          sx={{
            width: 200,
            backgroundColor: "#fff",
            boxShadow: 2,
            borderRadius: 2,
            "& .MuiInputLabel-root": {
              fontWeight: "bold",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
          size="small"
        >
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={statusFilter}
            label="Status Filter"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3}>
        {currentTasks.map((task, index) => (
          <Grid item xs={12} sm={4} md={4} key={task._id}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 4,
                borderRadius: 3,
                backgroundColor: getRandomColor(index),
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="start"
                >
                  <Box flex={1}>
                    {editTaskId === task._id ? (
                      <>
                        <TextField
                          fullWidth
                          label="Title"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Description"
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          multiline
                          rows={2}
                          sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <InputLabel>Priority</InputLabel>
                          <Select
                            value={editPriority}
                            label="Priority"
                            onChange={(e) => setEditPriority(e.target.value)}
                          >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={editStatus}
                            label="Status"
                            onChange={(e) => setEditStatus(e.target.value)}
                          >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="inprogress">In Progress</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          fullWidth
                          label="Due Date"
                          type="date"
                          value={editEndDate}
                          onChange={(e) => setEditEndDate(e.target.value)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </>
                    ) : (
                      <>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {task.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          gutterBottom
                        >
                          {task.description}
                        </Typography>
                      </>
                    )}

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      flexWrap="wrap"
                      mt={2}
                    >
                      <Chip
                        icon={<CalendarMonthIcon />}
                        label={`Due: ${task.endDate?.slice(0, 10) || "N/A"}`}
                        variant="outlined"
                      />
                      <Chip
                        icon={<PriorityHighIcon />}
                        label={`Priority: ${task.priority}`}
                        variant="filled"
                        sx={{
                          backgroundColor:
                            task.priority === "high"
                              ? "#f44336" // red
                              : task.priority === "medium"
                              ? "#ff9800" // orange
                              : "#ffeb3b", // yellow 
                          color: task.priority === "low" ? "#000" : "#fff", 
                        }}
                      />
                      <Chip
                        label={task.status}
                        color={
                          task.status === "completed" ? "success" : "warning"
                        }
                        variant="filled"
                      />
                    </Stack>
                  </Box>

                  <Stack direction="row" spacing={1} mt={1}>
                    {editTaskId === task._id ? (
                      <>
                        <Tooltip title="Save">
                          <IconButton
                            onClick={() => handleSave(task._id)}
                            color="primary"
                          >
                            <SaveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton onClick={handleCancel} color="default">
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => handleEdit(task)}
                            color="warning"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => handleDelete(task._id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
            </Card>
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Stack alignItems="center" mt={3} mb={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
             
          />
        </Stack>
      )}
    </Box>
  );
};

export default TaskList;
