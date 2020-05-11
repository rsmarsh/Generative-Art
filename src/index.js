import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ArtList from './components/ArtList';
import ArtCanvas from './components/ArtCanvas';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>My Generative Artworks</h1>
                </div>

                <Switch>
                    <Route exact path="/">
                        <ArtList />
                    </Route>

                    {/* the artwork name from the url is automatically passed to the component */}
                    <Route exact path="/view/:name">
                        <ArtCanvas />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));