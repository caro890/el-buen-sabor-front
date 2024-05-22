import { createSlice } from "@reduxjs/toolkit"; 
import { PayloadAction } from "@reduxjs/toolkit";
import { Sucursal } from "../../types/Empresas/Sucursal";
import { Empresa } from "../../types/Empresas/Empresa";

interface IEmpresaReducerType {
    empresa: null | Empresa;
    activeSucursal: null | Sucursal;
}

const initialState: IEmpresaReducerType = {
    empresa: null,
    activeSucursal: null,
}

export const EmpresaReducer = createSlice({
    name: "EmpresaReducer",
    initialState,
    reducers: {
        setEmpresa(state, action: PayloadAction<any>) {
            state.empresa = action.payload;
        },
        setActiveSucursal(state, action: PayloadAction<any>) {
            state.activeSucursal = action.payload;
        }
    }
});

export const { setEmpresa, setActiveSucursal } = EmpresaReducer.actions;

export default EmpresaReducer.reducer;