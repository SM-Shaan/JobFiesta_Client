import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {

  return (
    <motion.div>
      <Navbar />
      <Outlet />
    </motion.div>
  );
}

export default App;

