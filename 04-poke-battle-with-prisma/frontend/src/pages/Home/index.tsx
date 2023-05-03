import { useUser } from "../../store";

const Home = () => {
  const user = useUser();

  return <div className="container px-4 mx-auto">{user?.name}</div>;
};

export default Home;
