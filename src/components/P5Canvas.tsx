import React from 'react';
import Sketch from 'react-p5';
import './P5Canvas.scss';

type Props3D = {
  seed: string;
  draw: () => void;
};

const P5Canvas = (props: Props3D) => {
  const setup = (p5, canvasParentRef: HTMLElement) => {
    const width = canvasParentRef.parentElement.clientWidth;
    const height = canvasParentRef.parentElement.clientWidth; // there will be no height yet, only width
    p5.background(0);
    return p5.createCanvas(width, height).parent(canvasParentRef);
  };

  return <Sketch setup={setup} draw={props.draw} />;
};

export default P5Canvas;
