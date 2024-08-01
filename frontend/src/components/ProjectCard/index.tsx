import React from 'react';
import useBackground from '@/hooks/useBackground';


interface ProjectCardProps {
  title: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description }) => {
    const { background, contrastColor } = useBackground();
  return (
    <div className="bg-white rounded-2xl max-w-sm max-h-56 overflow-hidden shadow hover:shadow-lg hover:cursor-pointer">
      <div className={`w-full p-6  ${background}`}>
        <h5 className={` font-bold text-xl mb-2 ${contrastColor} `}>{title}</h5>
      </div>
      <div className="w-full px-6">
        <p className="text-gray-700 text-base mt-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
