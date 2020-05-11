import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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