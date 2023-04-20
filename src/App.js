import './App.css';
import Docs from './components/docs';
import EditDocs from './components/EditDocs';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Docs/>} />
      <Route path="/editDocs/:id" element={<EditDocs/>} />
    </Routes>
  );
}

export default App;
