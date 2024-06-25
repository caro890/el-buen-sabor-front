import { Navbar } from "../../components/NavBar/Navbar";
import { Outlet } from "react-router";

export const CocineroLayout = () => {
  return (
    <div>
        <Navbar/>    
        
        <div>
          <Outlet/>
        </div>
    </div>
  )
}
