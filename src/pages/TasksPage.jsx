import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskForm from '../components/Task/TaskForm';
import TaskList from '../components/Task/TaskList';
import {
  Box,
  Typography,
  Button,
  Modal,
  Fade,
  Backdrop,
  Divider,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TasksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { tasks } = useSelector((state) => state.tasks);

  // Calculate task status counts
  const pendingCount = tasks.filter(task => task.status === 'pending').length;
  const inProgressCount = tasks.filter(task => task.status === 'inprogress').length;
  const completedCount = tasks.filter(task => task.status === 'completed').length;

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <Box maxWidth="100%" mx="auto" mt={5} px={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">
          Welcome to TaskQue
        </Typography>
        <Button
          variant={showForm ? 'outlined' : 'contained'}
          startIcon={showForm ? <CloseIcon /> : <AddIcon />}
          onClick={toggleForm}
        >
          {showForm ? 'Close Form' : 'Create Task'}
        </Button>
      </Box>

      {/* Task Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#ffecb3', color: '#8d6e63' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <PendingActionsIcon fontSize="large" sx={{ mr: 1 }} />
                <Typography variant="h6">Pending Tasks</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">{pendingCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#b3e5fc', color: '#0277bd' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <AutorenewIcon fontSize="large" sx={{ mr: 1 }} />
                <Typography variant="h6">In Progress</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">{inProgressCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#c8e6c9', color: '#2e7d32' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <CheckCircleIcon fontSize="large" sx={{ mr: 1 }} />
                <Typography variant="h6">Completed</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">{completedCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Task Form */}
      <Modal
  open={showForm}
  onClose={toggleForm}
  closeAfterTransition
  slots={{ backdrop: Backdrop }}
  slotProps={{ backdrop: { timeout: 500 } }}
>
  <Fade in={showForm}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        width: { xs: '90%', sm: '70%', md: '50%' },
      }}
    >
      <Typography variant="h6" mb={2}>
        Create New Task
      </Typography>
      <TaskForm onClose={toggleForm} />
    </Box>
  </Fade>
</Modal>

      {/* Task List */}
      <TaskList />
    </Box>
  );
};

export default TasksPage;
