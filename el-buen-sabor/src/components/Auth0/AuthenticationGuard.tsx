import { withAuthenticationRequired } from "@auth0/auth0-react";
import { getRol } from "../../services/LocalStorageService";
import { useNavigate } from "react-router";

type Props = {
  component: React.ComponentType<Object>,
  rolAutorizado: string[]
}

export const AuthenticationGuard = ({component, rolAutorizado}: Props) => {
  const navigate = useNavigate();
  const rol = getRol();

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="d-flex flex-column align-items-center justify-contetn-center mx-3">
        <div className="mb-4  font-bold">Redireccionando...</div>
      </div>
    )
  });

  if(rol) {
    let flag = false;
    flag = rolAutorizado.some((rA) => rA.includes(rol));
    if(flag) {
      return <Component/>
    }
  } else {
    navigate("/");
  }
}
