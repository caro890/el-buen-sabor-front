import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { UnidadMedidaService } from "../../../services/UnidadMedidaService";
import { UnidadMedida } from "../../../types/Articulos/UnidadMedida";
import { useLoaderData/*, useNavigate*/ } from "react-router";
import { setDataTable } from "../../../redux/slices/TablaDataReducer";
//import Swal from "sweetalert2";
import { Form/*, Col, Row, Button, InputGroup, Dropdown, DropdownButton*/ } from "react-bootstrap";

export const UnidadesMedidaCrud = () => {
    const unidadesMedida = useLoaderData() as UnidadMedida[];
    const dispatch = useAppDispatch();
    //const navigate = useNavigate();
    //const service: UnidadMedidaService = new UnidadMedidaService();

    useEffect(() => {
        dispatch(setDataTable(unidadesMedida));
    }, []);

    /*const getUnidadesMedida = async () => {
        await service.getAll().then((data) => {
            dispatch(setDataTable(data));
        });
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Seguro que desea eliminar la unidad de medida?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                service.delete(id).then(() => {
                    getUnidadesMedida();
                });
            }
        });
    };*/

    return (
        <>
            <div>UnidadMedidaCrud</div>

            <Form.Select>
                <option>Elija una unidad de medida</option>
                {unidadesMedida.map((unidadMedida) => (
                    <option key={unidadMedida.id} value={unidadMedida.id}>
                        {unidadMedida.denominacion}
                    </option>
                ))}
            </Form.Select>

        </>
    )
}


//loader function
export const unidadesMedidaLoader = async () => {
    const service: UnidadMedidaService = new UnidadMedidaService();
    return service.getAll();
}
