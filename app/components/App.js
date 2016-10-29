import React from 'react';
import {render} from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';


import Main from './Main';
import Weather from './Weather';
import About from './About';
import Examples from './Examples';

export default class App extends React.Component {
  render() {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Weather}/>
                <Route path="about" component={About}/>
                <Route path="examples" component={Examples}/>
            </Route>
        </Router>
    );
  }
}
