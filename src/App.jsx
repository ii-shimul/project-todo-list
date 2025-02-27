import useAuth from "./hooks/useAuth";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";

function App() {
  const { user } = useAuth();

  return (
    <>
      <div className="bg-neutral-200 w-screen min-h-screen">
        <Navbar />
        {user?.email ? <Todo /> : <Banner />}
      </div>
    </>
  );
}

export default App;
