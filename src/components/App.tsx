import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArtList from './ArtList';
import ArtContainer2D from 'Components/ArtContainer2D';
import ArtContainer3D from 'Components/ArtContainer3D';
import FloatMenu from 'Components/FloatMenu';
import { getSeed, storeSeed } from '../data/session.js';

import ForwardIcon from 'Assets/icons/forward.svg';

import './App.scss';

const App = () => {
  const [seed, setSeed] = useState(getSeed() || 'WELCOME');

  // update the localStorage seed to retain across sessions/pages
  useEffect(() => {
    storeSeed(seed);
  }, [seed]);

  const renderHeading = (showBackButton) => {
    return (
      <div className='page-heading'>
        {showBackButton && (
          <a className='back-button' href='/'>
            <ForwardIcon />
          </a>
        )}
        <h1 className='page-title'>Generative JavaScript Art</h1>
      </div>
    );
  };

  return (
    <Router>
      <FloatMenu seed={seed} handleSeedChange={setSeed} />

      <Switch>
        <Route exact path='/'>
          {renderHeading(false)}
          <ArtList />
        </Route>

        {/* the artwork name and dimension (2d/3d) from the url is automatically passed to the component */}
        <Route exact path='/art/2d/:name'>
          {renderHeading(true)}
          <ArtContainer2D seed={seed} />
        </Route>

        {/* the artwork name and dimension (2d/3d) from the url is automatically passed to the component */}
        <Route exact path='/art/3d/:name'>
          {renderHeading(true)}
          <ArtContainer3D seed={seed} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
