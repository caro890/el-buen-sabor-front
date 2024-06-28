import { withAuthenticationRequired } from "@auth0/auth0-react";

type Props = {
    component: React.ComponentType<Object>
}

export const AuthenticationGuard = ({component}: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="d-flex flex-column align-items-center justify-contetn-center mx-3">
        <div className="mb-4  font-bold">Redireccionando...</div>
      </div>
    )
  });
  return <Component/>
}
