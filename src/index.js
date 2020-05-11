import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>My Generative Artworks</h1>
                </div>

                <Switch>
                    <Route exact path="/">
                    </Route>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));