import React from 'react';
import { useParams } from 'react-router-dom';

const ArtCanvas = () => {
    // get the requested artwork name from the url
    let { name } = useParams();

    return (
        <div>
            <h2>
                { name }
            </h2>
            <canvas>

            </canvas>
        </div>
    );
}

export default ArtCanvas;