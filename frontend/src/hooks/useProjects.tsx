import { useMutation, useQuery } from '@apollo/client';
import { PROJECTS_QUERY, PROJECT_CREATE, UPDATE_PROJECT, DELETE_PROJECT } from '@/queries';
import {  ProjectType, MutationCreateProjectArgs, MutationUpdateProjectArgs, MutationDeleteProjectArgs, DeleteProject } from '@/types';


interface ProjectResoponse {
    projects: ProjectType[]
}

interface CreateProjectResponse{
    project: ProjectType
}
export const useProjects = () => {
  const { data, loading, error, refetch } = useQuery<ProjectResoponse>(PROJECTS_QUERY,{
    fetchPolicy: 'network-only'
  });
  const [createProject, { loading: mutationLoading, error: mutationError }] = useMutation<
    CreateProjectResponse,
    MutationCreateProjectArgs
  >(PROJECT_CREATE, {
    onCompleted: () => {
      refetch();
    },
    fetchPolicy: 'no-cache'
  });

  const handleCreateProject = async (name: string, description?: string) => {
    await createProject({
      variables: { name, description },
    });
  };

  const [updateProject, { loading: updateLoading, error: updateError }] = useMutation<CreateProjectResponse, MutationUpdateProjectArgs>(
    UPDATE_PROJECT,
    {
      onCompleted: () => refetch(),
    }
  );

  const handleUpdateProject = async (id: string, name: string, description: string) => {
    await updateProject({ variables: { id, name, description } });
  };

  const [deleteProject, { loading: deleteLoading, error: deleteError }] = useMutation<DeleteProject, MutationDeleteProjectArgs>(
    DELETE_PROJECT,
    {
      onCompleted: () => refetch(),
    }
  );

  const handleDeleteProject = async (id: string) => {
    await deleteProject({ variables: { id } });
  };


  return {
    data,
    loading,
    error,
    updateLoading,
    updateError,
    mutationLoading,
    mutationError,
    deleteLoading,
    deleteError,
    handleCreateProject,
    handleUpdateProject,
    handleDeleteProject
  };
};
