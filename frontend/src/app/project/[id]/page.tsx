import React from 'react';
import { ArrowLeftIcon, } from '@heroicons/react/24/solid'
import  { getClient } from '@/lib/client'
import { PROJECT_GET } from '@/queries';
import { ColumnType, ProjectType } from '@/types'
import Tasks from '@/components/Tasks';


interface ProjectResponse {
  project: ProjectType
}



const ProjectPage: React.FC<{params:{id: string}}> = async({ params }) => {

  const client = getClient()

  const  { data } = await client.query<ProjectResponse>({
    query: PROJECT_GET,
    variables:{
      id: params.id
    },
    fetchPolicy:'network-only'
  })

  return (
      <>
      <div className='p-7 flex '>
          <button >
            <ArrowLeftIcon className='size-6 text-slate-950 mr-5' />
          </button>
          <h2 className='text-xl'>My projects</h2>
      </div>
      <div className='p-7 mt-5'>
          <h2 className='font-bold text-3xl'>{data.project.name}</h2>
      </div>
      <Tasks initColumns={data?.project?.columns as ColumnType[]} projectId={params.id} />
      </>

    

  );
};

export default ProjectPage;