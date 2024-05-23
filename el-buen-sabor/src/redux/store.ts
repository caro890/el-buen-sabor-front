import { configureStore } from "@reduxjs/toolkit"
import TableDataReducer from "./slices/TablaDataReducer"
import IngredientesReducer from "./slices/IngredientesReducer";
import EmpresaReducer from "./slices/EmpresaReducer";
import SucursalReducer from "./slices/SucursalReducer";

export const store = configureStore({
    reducer: {
        tableDataReducer: TableDataReducer,
        ingredientesReducer: IngredientesReducer,
        empresaReducer: EmpresaReducer,
        sucursalRedurer: SucursalReducer
    }
})


// Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: { modalReducer: ModalState, tablaReducer: TablaState }
export type AppDispatch = typeof store.dispatch;