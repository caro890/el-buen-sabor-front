import { useNavigate } from "react-router";
import { Base } from "../../../types/Base";
import { IconButton } from "@mui/material";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilTrash, } from "@coreui/icons";
import { useAppDispatch } from "../../../hooks/redux";
import { setElementActive } from "../../../redux/slices/ProductosReducer";

interface IPropsButtonTable<T extends Base> {
    item: T;
    handleDelete: (id: number) => void;
}

export const GenericTableButtons = <T extends Base>({
    item,
    handleDelete
}: IPropsButtonTable<T>) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleDeleteItem = () => {
      handleDelete(item.id);
    };

    const handleEdit = () => {
      dispatch(setElementActive({element: item}));
      navigate(`form/${item.id}`);
    };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      gap: 2,
    }}>
      <IconButton aria-label="editar" style={{backgroundColor: "var(--itemsColor)"}} onClick={handleEdit}>
        <CIcon icon={cilPencil} size="lg" />
      </IconButton>
      <IconButton aria-label="eliminar" style={{backgroundColor: "var(--itemsColor)"}} onClick={handleDeleteItem}>
        <CIcon icon={cilTrash} size="lg" />
      </IconButton>
    </div>
  )
}
