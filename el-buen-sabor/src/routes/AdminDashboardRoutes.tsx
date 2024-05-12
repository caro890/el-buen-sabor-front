import { Route } from "react-router"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { ProductosCrud, productosLoader } from "../components/AdminDashboard/ProductosCrud/ProductosCrud"
import { CategoriasCrud, categoriasLoader } from "../components/AdminDashboard/CategoriasCrud/CategoriasCrud"
import { InsumosCrud, insumosLoader } from "../components/AdminDashboard/InsumosCrud/InsumosCrud"

export const AdminDashboardRoutes = () => {
  return (
    <Route path="dashboard" element={<DashboardLayout/>}>
          <Route 
            path="productos" 
            element={<ProductosCrud/>}
            /*loader={productosLoader}*/>
              <Route
                path=":id"
                element={<ProductosCrud/>}
              />
          </Route>
          <Route 
            path="categorias" 
            element={<CategoriasCrud/>}
            /*loader={categoriasLoader}*/
          />
          <Route 
            path="insumos" 
            element={<InsumosCrud/>}
            /*loader={insumosLoader}*/
          />
    </Route>
  )
}
