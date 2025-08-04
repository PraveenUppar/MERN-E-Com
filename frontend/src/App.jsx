import Header from "./components/Header";
import Footer from "./components/Footer";
//  enables the creation of nested routes, allowing to define a hierarchy of routes where child routes inherit aspects of their parent,
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container py-3 mx-auto flex-grow">
        <Outlet /> {/* matched child route components will be rendered.  */}
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
