'use client'
import React, { useState } from 'react';
import Image from "next/image";
import Navbar from "../components/Navbar";
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from "../components/CreateProjectModal";

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProject = (title: string, description: string) => {
    // Lógica para guardar el proyecto
    console.log('Project saved:', { title, description });
  };


  return (
    <main className="flex flex-col min-h-screen ">
    
    <Navbar />
     
     <div onClick={handleOpenModal} className="container mx-auto w-full h-screen relative">
        <div className="w-full  flex h-screen flex-col justify-center items-center">
          <h4 className="mb-4 text-xl t">There are not projects yet...</h4>
          <button className="btn-add text-2xl max-w-xl flex flex-col justify-center items-center w-2/4 h-1/4">
            <span className="">+</span>
            <span>New Project</span>
          </button>

        </div>

        <div className="w-full h-screen  grid lg:grid-cols-3  sm:grid-cols-2 gap-8">

        <ProjectCard  title='Titulo de la tarjeta' description='Esta es una descripción de ejemplo para la tarjeta. Aquí puedes agregar cualquier texto que desees.'/>

        <button onClick={handleOpenModal} className="btn-add text-2xl max-w-sm flex flex-col justify-center items-center  max-h-56">
            <span className="">+</span>
            <span>New Project</span>
          </button>
        </div>

     </div>

     <CreateProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProject}
      />

    </main>
  );
}
