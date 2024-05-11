import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="root-layout">
        <header>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default RootLayout;