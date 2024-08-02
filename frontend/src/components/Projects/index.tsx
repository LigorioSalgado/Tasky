'use client'
import React, {useState, useEffect} from 'react';
import { ProjectType } from '@/types';
import { useProjects } from '@/hooks/useProjects';
import ProjectCard from '../ProjectCard';
import CreateProjectModal from '../CreateProjectModal';

interface CreateProjectProps {
    initProjects: ProjectType[] | []
}

const Projects: React.FC<CreateProjectProps> = ({initProjects}) => {
    const [projects, setProjects] = useState<ProjectType[]>(initProjects)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data, handleCreateProject, handleDeleteProject, handleUpdateProject} = useProjects()

    useEffect(() => {
       if(data){
            setProjects(data?.projects)
        }
    },[data])

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleSaveProject = (title: string, description: string) => {
      handleCreateProject(title, description)
    };
  

    const renderProjects =  () => (
        <div className="w-full h-1/2 grid lg:grid-cols-3  sm:grid-cols-2 gap-8 mt-40">
            {projects.map( project => <ProjectCard  id={project.id}  
              title={project.name as string} 
              description={project.description as string} 
              onUpdate={handleUpdateProject} 
              onDelete={handleDeleteProject}
              
              />)}
            <button onClick={handleOpenModal} className="btn-add text-2xl max-w-sm flex flex-col justify-center items-center  max-h-56">
                <span className="">+</span>
                <span>New Project</span>
            </button>
        </div>
    )

    const renderEmptyProjects = () => (
        <div className="w-full  flex h-screen flex-col justify-center items-center">
          <h4 className="mb-4 text-xl t">There are not projects yet...</h4>
          <button onClick={handleOpenModal} className="btn-add text-2xl max-w-xl flex flex-col justify-center items-center w-2/4 h-1/4">
              <span className="">+</span>
              <span>New Project</span>
          </button>

      </div>
    )

  return (
    <>
    {
        projects?.length > 0 ? renderProjects() : renderEmptyProjects()
    }
     
    <CreateProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProject}
    />
    </>
  );
};

export default Projects;
