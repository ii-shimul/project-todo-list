import useAuth from "./hooks/useAuth";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";

function App() {
  const { user } = useAuth();


  return (
    <>
      <Navbar />
      {user?.email ? <Todo /> : <Banner />}
    </>
  );
}

export default App;
