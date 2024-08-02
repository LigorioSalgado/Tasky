import React from "react";
import Navbar from "../components/Navbar";
import { getClient } from '@/lib/client';
import { ProjectType } from '@/types'
import Projects from '@/components/Projects';
import { PROJECTS_QUERY } from '@/queries';



interface ProjectResponse{
  projects:ProjectType[]
}


export default async function Home() {
  const client = getClient()

  const  { data } = await client.query<ProjectResponse>({
    query: PROJECTS_QUERY
  })

  return (
    <main className="flex flex-col min-h-screen ">
    
    <Navbar />
    
    <div  className="container mx-auto w-full h-screen relative">
        <Projects  initProjects={data?.projects} />
     </div>

    </main>
  );
}


