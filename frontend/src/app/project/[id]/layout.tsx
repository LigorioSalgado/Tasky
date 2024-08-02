import Navbar from '@/components/Navbar'

interface LayoutProps {
    children: React.ReactNode;
}
 
const  Layout: React.FC<LayoutProps> = ({ children }) => {
  return(
    <>
      <Navbar />
      <main className='container mx-auto'>{children}</main>
     
    </>
  )
}

export default Layout