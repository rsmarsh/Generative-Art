import React from 'react';
import Sketch from 'react-p5';
import './P5Canvas.scss';
import { p5InstanceExtensions } from 'p5';

type Props3D = {
  seed: string;
  draw: (p5: p5InstanceExtensions, seed: string) => void;
};

const P5Canvas = (props: Props3D) => {
  const setup = (p5, canvasParentRef: HTMLElement) => {
    const width = canvasParentRef.parentElement.clientWidth;
    const height = canvasParentRef.parentElement.clientWidth; // there will be no height yet, only width
    p5.background(0);
    return p5.createCanvas(width, height, p5.WEBGL).parent(canvasParentRef);
  };

  return (
    <Sketch
      setup={setup}
      draw={(p5) => {
        return props.draw(p5, props.seed);
      }}
    />
  );
};

export default P5Canvas;
