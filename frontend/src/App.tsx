import Loading from "./components/Loading";
import InputFileUpload from "./pages/Memify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


function App() {

  return (
    <div>
      <Router>
        <Routes>
        <Route path="/Loading" element={<Loading />} />
        <Route path="/upload" element={<InputFileUpload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
