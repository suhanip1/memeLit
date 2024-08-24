import Loading from "./components/Loading";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


function App() {

  return (
    <div>
      <div> djfdj</div>
      <Router>
        <Routes>
        <Route path="/Loading" element={<Loading />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
