import React from 'react';
import lottie from 'lottie-web';

const LoadingLogo = () => {
  const container = React.useRef(null);
  
  React.useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./loadingAnimation.json'),
    });
    return () => {
        animation.stop();
        animation.destroy();
      };
  }, []);

  return <div ref={container} style={{ width:"120px", 
                                        height: "120px", 
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
    }}/>;
};

export default LoadingLogo;
