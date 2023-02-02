
import TestPage from "./Pages/TestPage";
import { BrowserRouter, Routes,Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
