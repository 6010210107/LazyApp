import { Switch, Route } from "react-router-dom";
import { TodoApp, Sudoku, Home } from "../../pages/";

const Navigation = () => {
  return (
    <Switch>
      <Route path="/todo">
        <TodoApp />
      </Route>
      <Route path="/sudoku">
        <Sudoku />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Navigation;
