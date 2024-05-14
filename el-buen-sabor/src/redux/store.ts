import { configureStore } from "@reduxjs/toolkit"
import TableDataReducer from "./slices/ProductosReducer"

export const store = configureStore({
    reducer: {
        tableDataReducer: TableDataReducer,
    }
})


// Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: { modalReducer: ModalState, tablaReducer: TablaState }
export type AppDispatch = typeof store.dispatch;