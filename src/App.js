import { Route } from "react-router-dom";
import Main from "./AuthPages/Main";
import Home from "./Products/Home";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.fetch.uid);
  return (
    <div className="App">
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/login">
        <Main />
      </Route>
      <Route path="/products">{user ? <Home /> : <Main />}</Route>
    </div>
  );
}

export default App;
