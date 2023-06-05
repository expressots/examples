import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

// store
import { useUser } from "../store";

// routes
import { ROUTE } from "../routes";

// components
import { Button, Header, ThemeSelector } from "../components";
import { mountAuthRoute } from "../utils/mountAuthRoute";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

// ::
const AuthRoute = () => {
  const user = useUser();
  const navigate = useNavigate();

  if (!user) return <Navigate to={ROUTE.login} />;

  return (
    <>
      <Header>
        <div className="w-full flex items-center justify-between">
          <Link
            to={mountAuthRoute(ROUTE.home)}
            className="flex items-start justify-start gap-2"
          >
            <img
              className="h-12 w-12 rounded-sm"
              src={user?.avatar?.url}
              alt={`custom avatar`}
            />
            <div className="animate-leftSlide flex justify-between items-start flex-col">
              <p className="font-thin">sign in as</p>
              <h1 className="font-semibold">{user.name}</h1>
            </div>
          </Link>
          <div className="flex gap-2 items-center justify-center">
            <ThemeSelector />
            <Button
              onClick={() => navigate(ROUTE.logout)}
              className="bg-red-500 border-red-800"
            >
              <p className="text-white font-semibold">
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
              </p>
            </Button>
          </div>
        </div>
      </Header>
      <Outlet />
    </>
  );
};

export default AuthRoute;
