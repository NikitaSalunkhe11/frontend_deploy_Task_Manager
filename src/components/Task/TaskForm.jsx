import React from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../features/tasks/taskThunks';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import FormikTextField from '../common/FormikTextField'; // Ensure it's a default export

const priorities = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const statuses = [
  { value: 'completed', label: 'Completed' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'pending', label: 'Pending' },
];

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  priority: Yup.string().required('Priority is required'),
  status: Yup.string().required('Status is required'),
  endDate: Yup.date()
    .required('End date is required')
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'End date cannot be in the past'),
});

const TaskForm = ({ onClose }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        priority: '',
        status: '',
        endDate: '',
      }}
      validationSchema={TaskSchema}
      onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
        try {
          await dispatch(createTask(values)).unwrap();
          toast.success('Task is successfully created', {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}); // ✅ Success message
          resetForm();
          if (onClose) onClose();
        } catch (error) {
          setErrors({ submit: error || 'Failed to create task' });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form noValidate autoComplete="off">
          <Box p={2}>
            <Stack spacing={2}>
              <FormikTextField name="title" label="Title" required margin="normal" />
              <FormikTextField name="description" label="Description" multiline rows={3} margin="normal" />
              <FormikTextField name="priority" label="Priority" select options={priorities} required margin="normal" />
              <FormikTextField name="status" label="Status" select options={statuses} required margin="normal" />
              <FormikTextField
                name="endDate"
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
                margin="normal"
              />

              {errors.submit && (
                <Typography color="error" align="center" variant="body2" mt={1}>
                  {errors.submit}
                </Typography>
              )}

              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Task'}
              </Button>
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
