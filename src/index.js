import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
    render() {
        return (
                <div>
                    <h1>My Generative Artworks</h1>
                </div>

        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));