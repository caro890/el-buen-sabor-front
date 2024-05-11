import { 
  createBrowserRouter,
  Route, 
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { ProductosCrud } from "../components/AdminDashboard/ProductosCrud/ProductosCrud"
import { CategoriasCrud } from "../components/AdminDashboard/CategoriasCrud/CategoriasCrud"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
        <Route path="dashboard" element={<DashboardLayout/>}>
          <Route path="productos" element={<ProductosCrud/>}></Route>
          <Route path="categorias" element={<CategoriasCrud/>}></Route>
        </Route>
    </Route>
  )
)

export const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}
