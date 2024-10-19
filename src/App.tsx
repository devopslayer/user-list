import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user-list/" element={<UserList />} />
        <Route path="/user-list/list" element={<UserList />} />
        <Route path="/user-list/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
