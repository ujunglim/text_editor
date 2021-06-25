import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import MyEditor from './MyEditor';

export default function AppRouter() {
  return(
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/myeditor" component={MyEditor}/>
        </Switch>
      </HashRouter>
    </>
  );
}