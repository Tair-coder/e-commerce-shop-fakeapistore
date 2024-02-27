import { useState } from "react";
import { Route } from "react-router-dom";
import Main from "./AuthPages/Main";
import Home from "./Products/Home";

function App() {
  const [user, setUser] = useState(null);
  const setUserHandler = (value) => {
    setUser(value);
  };

  const loginPage = <Main setUser={setUserHandler} />;
  return (
    <div className="App">
      <Route path="/" exact>
        {loginPage}
      </Route>
      <Route path="/login">{loginPage} </Route>
      <Route path="/products">{user ? <Home /> : loginPage}</Route>
    </div>
  );
}

export default App;
