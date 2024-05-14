import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { ProductosCrud, productosLoader } from "../components/AdminDashboard/ProductosCrud/ProductosCrud"
import { CategoriasCrud, categoriasLoader } from "../components/AdminDashboard/CategoriasCrud/CategoriasCrud"
import { InsumosCrud, insumosLoader } from "../components/AdminDashboard/InsumosCrud/InsumosCrud"
import { ProductoForm } from "../components/AdminDashboard/ProductosCrud/ProductoForm/ProductoForm"
import { InsumosForm } from "../components/AdminDashboard/InsumosCrud/InsumosForm.tsx/InsumosForm"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="productos">
          <Route index element={<ProductosCrud />} loader={productosLoader} />
          <Route path="form/:id?" element={<ProductoForm />} />
        </Route>
        <Route path="categorias">
          <Route index element={<CategoriasCrud />} loader={categoriasLoader} />
          <Route path="form/:id?" element={<ProductoForm />} />
        </Route>
        <Route path="insumos">
          <Route index element={<InsumosCrud />} loader={insumosLoader} />
          <Route path="form/:id?" element={<InsumosForm />} />
        </Route>
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
