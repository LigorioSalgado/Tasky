import { useMutation, useQuery } from '@apollo/client';
import { PROJECT_GET, CREATE_COLUMN, UPDATE_COLUMN, DELETE_COLUMN, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '@/queries';
import { ProjectType, MutationCreateColumnArgs, MutationUpdateColumnArgs, MutationDeleteColumnArgs, MutationCreateTaskArgs, MutationUpdateTaskArgs, MutationDeleteTaskArgs, ColumnType, TaskType } from '@/types';

interface ProjectResponse {
  project: ProjectType
}

interface CreateColumnResponse {
  createColumn: {
    column: ColumnType;
  };
}

interface CreateTaskParams {
  columnId: string;
  title: string;
  description?: string;
  endDate?: string;
  priority?: string;
  startDate?: string;
  tags?: string[];
}
interface UpdateColumnResponse {
  updateColumn: {
    column: ColumnType;
  };
}

interface DeleteColumnResponse {
  deleteColumn: {
    success: boolean;
    message: string;
  };
}

interface CreateTaskResponse {
  createTask: {
    task: TaskType;
  };
}

interface UpdateTaskResponse {
  updateTask: {
    task: TaskType;
  };
}

interface DeleteTaskResponse {
  deleteTask: {
    success: boolean;
    message: string;
  };
}

export const useProject = ({ id }: { id: string }) => {
  const { data, loading, error, refetch } = useQuery<ProjectResponse>(PROJECT_GET, {
    variables: { id },
    fetchPolicy: 'network-only',
  });

  const [createColumn, { loading: createColumnLoading, error: createColumnError }] = useMutation<CreateColumnResponse, MutationCreateColumnArgs>(CREATE_COLUMN, {
    onCompleted: () => refetch(),
    fetchPolicy: 'no-cache',
  });

  const [updateColumn, { loading: updateColumnLoading, error: updateColumnError }] = useMutation<UpdateColumnResponse, MutationUpdateColumnArgs>(UPDATE_COLUMN, {
    onCompleted: () => refetch(),
    fetchPolicy: 'no-cache',
  });

  const [deleteColumn, { loading: deleteColumnLoading, error: deleteColumnError }] = useMutation<DeleteColumnResponse, MutationDeleteColumnArgs>(DELETE_COLUMN, {
    onCompleted: () => refetch(),
    fetchPolicy: 'no-cache',
  });

  const [createTask, { loading: createTaskLoading, error: createTaskError }] = useMutation<CreateTaskResponse, MutationCreateTaskArgs>(CREATE_TASK, {
    onCompleted: () => refetch(),
    fetchPolicy: 'no-cache',
  });

  const [updateTask, { loading: updateTaskLoading, error: updateTaskError }] = useMutation<UpdateTaskResponse, MutationUpdateTaskArgs>(UPDATE_TASK, {
    onCompleted: () => refetch(),
    fetchPolicy: 'no-cache',
  });

  const [deleteTask, { loading: deleteTaskLoading, error: deleteTaskError }] = useMutation<DeleteTaskResponse, MutationDeleteTaskArgs>(DELETE_TASK, {
    onCompleted: () => refetch(),
    fetchPolicy: 'no-cache',
  });

  const handleCreateColumn = async (name: string, order: number, projectId: string) => {
    await createColumn({ variables: { name, order, projectId } });
  };

  const handleUpdateColumn = async (id: string, name?: string, order?: number, projectId?: string) => {
    await updateColumn({ variables: { id, name, order, projectId } });
  };

  const handleDeleteColumn = async (id: string, projectId: string) => {
    await deleteColumn({ variables: { id, projectId } });
  };

  
const handleCreateTask = async ({ columnId, title, description, endDate, priority, startDate, tags }: CreateTaskParams) => {
  await createTask({
    variables: { columnId, title, description, endDate, priority, startDate, tags }
  });
};

  const handleUpdateTask = async (id: string, columnId: string, title?: string, description?: string, endDate?: string, priority?: string, startDate?: string, tags?: string[]) => {
    await updateTask({ variables: { id, columnId, title, description, endDate, priority, startDate, tags } });
  };

  const handleDeleteTask = async (id: string, columnId: string) => {
    await deleteTask({ variables: { id, columnId } });
  };

  return {
    data,
    loading,
    error,
    createColumnLoading,
    createColumnError,
    updateColumnLoading,
    updateColumnError,
    deleteColumnLoading,
    deleteColumnError,
    createTaskLoading,
    createTaskError,
    updateTaskLoading,
    updateTaskError,
    deleteTaskLoading,
    deleteTaskError,
    handleCreateColumn,
    handleUpdateColumn,
    handleDeleteColumn,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
  };
};
