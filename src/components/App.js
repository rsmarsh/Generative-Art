import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ArtList from './ArtList';
import ArtContainer from './ArtContainer';
import FloatMenu from './FloatMenu';
import { getSeed, storeSeed } from '../data/session.js';

import './App.css';


const App = () => {

    const [seed, setSeed] = useState(getSeed() || 'SEED');

    // update the localStorage seed to retain across sessions/pages
    useEffect(() => {
        storeSeed(seed);
    }, [seed]);


    return (
        <Router>
            <div>
                <h1>Generative Art</h1>
            </div>

            <Switch>
                <Route exact path="/">
                    <ArtList />
                </Route>

                {/* the artwork name and dimension (2d/3d) from the url is automatically passed to the component */}
                <Route exact path="/art/:dimensional/:name">
                    <ArtContainer seed={seed} />
                    <FloatMenu seed={seed} handleSeedChange={setSeed} />
                </Route>
            </Switch>
        </Router>
    )
};

export default App;