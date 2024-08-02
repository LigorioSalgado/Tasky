import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full max-h-20 shadow-md	 p-4 bg-slate-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          {/* Reemplaza con tu logo */}
          <h2 className='text-3xl font-normal'>Tasky</h2>
        </div>
        <div className="space-x-4">
      
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
