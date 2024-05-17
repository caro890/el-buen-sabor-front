import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
       
        <main className="w-100 d-flex justify-content-center align-items-center" >
            <Outlet/>
        </main>
    </>
  )
}

export default RootLayout;