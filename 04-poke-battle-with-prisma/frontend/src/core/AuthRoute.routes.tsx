import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../store";
import { ROUTE } from "../routes";
import { Header } from "../components";

const AuthRoute = () => {
  const user = useUser();

  if (!user) return <Navigate to={ROUTE.login} />;

  return (
    <>
      <Header>{user.name}</Header>
      <Outlet />;
    </>
  );
};

export default AuthRoute;
