import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';

function DaysInfo() {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopupVisibility = () => {
    setPopupVisibility(!isPopupVisible);
  };

  return (
    <div className="detail-tag-popup-container" onClick={(event) => event.stopPropagation()}>
      <button className="detail-tag-popup-button" onClick={togglePopupVisibility}>
        <br/>
        <InfoIcon sx={{ fontSize: 39, color: 'white', position: 'relative', top: '-5px', right:"-3px" }}/>
      </button>
      {isPopupVisible && (
        <div className="detail-tag-popup">
          <p style={{color:"black"}}>"Days" refers to the amount of days in advance you would like to be notified about games for the team. For example, if you selected Days to be 5 you would get notified of all of the team's games over the next 5 days.</p>
          <button className="detail-tag-popup-close-button" onClick={togglePopupVisibility}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default DaysInfo;
