import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import P5Canvas from './P5Canvas';

import './ArtContainer3D.scss';

interface PathParameters {
  name: string;
}

type Props3D = RouteComponentProps<PathParameters> & {
  seed: string;
};

type ThreeDLibraries = 'p5js' | 'threejs';

const importArtInfo = async (name) => {
  const response = await import(`./artwork/${name}`);
  return response;
};

// the function which executes the entire drawing
type drawFunction = () => void;

interface ArtInfo {
  draw: () => drawFunction;
  library: ThreeDLibraries;
}

const ArtContainer3D = (props: Props3D) => {
  const artName = props.match.params.name;
  const artMeta = artworkList.threeDimensional.find((art) => art.title === artName);

  const [artLoading, setArtLoading] = useState(true);
  const [drawFunction, setDrawFunction] = useState<drawFunction>();
  const [threeDLibrary, setThreeDLibrary] = useState<ThreeDLibraries>();

  importArtInfo(artMeta.filename).then((artInfo: ArtInfo) => {
    const { draw, library } = artInfo;
    setDrawFunction(() => draw);
    setArtLoading(false);

    setThreeDLibrary(library);
  });

  return (
    <div className='canvas-wrapper'>
      {artLoading && <div>Loading...</div>}
      {threeDLibrary === 'p5js' && <P5Canvas seed={props.seed} draw={drawFunction} />}
    </div>
  );
};

export default withRouter(ArtContainer3D);
