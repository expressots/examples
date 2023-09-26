import { useEffect } from "react";
import { useAuthActions, useUser } from "../../store";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../routes";
import { LoadingStatus } from "../../components";

const Logout = () => {
  const navigate = useNavigate();
  const user = useUser();
  const { logout } = useAuthActions();

  useEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    if (!user) navigate(ROUTE.login);
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-3">
      <LoadingStatus size={70} />
			<p className="text-lg animate-pulse">Logout...</p>
    </div>
  );
};

export default Logout;
