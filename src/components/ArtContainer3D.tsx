import React, { useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import './ArtContainer3D.scss';

interface PathParameters {
  name: string;
}

type Props3D = RouteComponentProps<PathParameters> & {
  seed: string;
};

const importArtInfo = async (name) => {
  const response = await import(`./artwork/${name}.ts`);
  return response;
};

const ArtContainer3D = (props: Props3D) => {
  const artName = props.match.params.name;

  const [artLoading, setArtLoading] = useState(true);
  const [drawFunction, setDrawFunction] = useState();

  importArtInfo(artName).then((artInfo) => {
    const { draw } = artInfo;
    setDrawFunction(() => draw);
    setArtLoading(false);
  });

  const setup = (p5, canvasParentRef: HTMLElement) => {
    const width = canvasParentRef.parentElement.clientWidth;
    const height = canvasParentRef.parentElement.clientWidth; // there will be no height yet, only width
    p5.background(0);
    return p5.createCanvas(width, height).parent(canvasParentRef);
  };

  return (
    <div className='canvas-wrapper'>
      {!artLoading && <Sketch setup={setup} draw={drawFunction} />}
      {artLoading && <div>Loading...</div>}
    </div>
  );
};

export default withRouter(ArtContainer3D);
