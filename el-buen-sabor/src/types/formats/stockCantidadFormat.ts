import { UnidadMedida } from "../UnidadMedida";

const formatCantidad = (amount: number, unidad: UnidadMedida): string => {
    var res: string = String(amount) + " " + unidad.denominacion;
    return res;
}

export default formatCantidad;