import React from 'react';
import "../styles/Userteam.css"

const Demo = () => {
  return (
    <div className='demo-div'>
      <iframe src='https://www.youtube.com/embed/RWLrlXMwWcM'
        className="iframe-style"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        title="Demo Video"
        />
    </div>
  );
};

export default Demo;
