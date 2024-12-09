import React, { Suspense, useEffect } from "react";
import Canvas from '../utils/Canvas';
import useResponsive from "../hooks/useResponsive";

const Model = ({ btcRef }) => {

  useEffect(() => {
    if (btcRef.current && btcRef.current.model) {
      console.log('Model is already loaded.');
    } else {
      console.log('Model is initializing...');
    }

    return () => {
      if (btcRef.current?.model) {
        btcRef.current.model.dispose(); // Clean up the WebGL context when unmounting
        btcRef.current = null; // Reset the reference
        console.log('Model cleaned up');
      }
    };
  }, [btcRef]); // Ensure this runs when the component is rendered or btcRef changes

  return (
    <div className={`w-full min-h-[50vh] md:h-full overflow-hidden relative flex items-center justify-center xl:scale-100 sm:scale-90`}>
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas
          scene="https://prod.spline.design/toBlmQipCMJXjajN/scene.splinecode"
          type3D="BTC"
          ref={btcRef}
        />
      </Suspense>
    </div>
  );
};

export default Model;