import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ArtList from './ArtList';
import ArtContainer from './ArtContainer';

import './App.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>My Projects</h1>
                </div>

                <Switch>
                    <Route exact path="/">
                        <ArtList />
                    </Route>

                    {/* the artwork name and dimension (2d/3d) from the url is automatically passed to the component */}
                    <Route exact path="/art/:dimensional/:name">
                        <ArtContainer />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;