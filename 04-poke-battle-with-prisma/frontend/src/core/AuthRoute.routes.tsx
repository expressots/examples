import { Navigate, Outlet, useNavigate } from "react-router-dom";

// store
import { useUser } from "../store";

// routes
import { ROUTE } from "../routes";

// components
import { Button, Header } from "../components";

// ::
const AuthRoute = () => {
  const user = useUser();
  const navigate = useNavigate();

  if (!user) return <Navigate to={ROUTE.login} />;

  return (
    <>
      <Header>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-start justify-start gap-2">
            <img
              className="h-12 w-12 rounded-sm"
              src={user?.avatar?.url}
              alt={`custom avatar`}
            />
            <div className="animate-leftSlide flex justify-between items-start flex-col">
              <p className="font-thin">sign in as</p>
              <h1 className="font-semibold">{user.name}</h1>
            </div>
          </div>
          <Button className="bg-red-500 border-red-800">
            <p
              onClick={() => navigate(ROUTE.logout)}
              className="text-white font-semibold"
            >
              Logout
            </p>
          </Button>
        </div>
      </Header>
      <Outlet />
    </>
  );
};

export default AuthRoute;
