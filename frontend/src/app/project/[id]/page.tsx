import { ArrowLeftIcon, } from '@heroicons/react/24/solid'
import  { getClient } from '@/lib/client'
import { PROJECT_GET } from '@/queries';
import { ProjectType } from '@/types'
import Tasks from '@/components/Tasks';



const ProjectPage: React.FC = async({ params }) => {
  const client = getClient()

  const  { data } = await client.query<ProjectType>({
    query: PROJECT_GET,
    variables:{
      id: params.id
    },
    fetchPolicy:'network-only'
  })

  return (
      <>
      <div className='p-7 flex '>
          <button>
            <ArrowLeftIcon className='size-6 text-slate-950 mr-5' />
          </button>
          <h2 className='text-xl'>My projects</h2>
      </div>
      <div className='p-7 mt-5'>
          <h2 className='font-bold text-3xl'>My project</h2>
      </div>
      <Tasks initColumns={data?.project?.columns || []} projectId={params.id} />
      </>

    

  );
};

export default ProjectPage;