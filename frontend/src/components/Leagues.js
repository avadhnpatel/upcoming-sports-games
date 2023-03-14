import React, { useEffect } from 'react';
import "../styles/LeagueSlider.css"
const Leagues = () => {

  useEffect(() => {
    const root = document.documentElement;
    const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
    const marqueeContent = document.querySelector("ul.marquee-content");

    root.style.setProperty("--marquee-elements", marqueeContent.children.length);
    console.log(marqueeContent.children.length)
    for(let i=0; i<marqueeElementsDisplayed; i++) {
      marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
    }
  }, []); 

  return (
    <>
    <div className='bodyy'>
        <div className="marquee">
        <ul className="marquee-content">
            <li><i><img src="https://pngimg.com/uploads/nba/nba_PNG15.png" alt="nba" className="carouselImage"></img></i></li>
            <li><i><img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png" className="carouselImage" alt="nfl"></img></i></li>
            <li><i><img src="https://blog.logomyway.com/wp-content/uploads/2021/11/NHL-logo.png" className="carouselImage" alt="nhl"></img></i></li>
            <li><i><img src="https://builds.mlbstatic.com/mlb.com/builds/site-core/1606751303311/dist/images/favicon.png" className="carouselImage" alt="mlb"></img></i></li>
            <li><i><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/NCAA_logo.svg/2048px-NCAA_logo.svg.png" className="carouselImage" alt="ncaa"></img></i></li>
            <li><i><img src="https://www.fifplay.com/img/public/premier-league-2-logo.png" className="carouselImage" alt="premier league"></img></i></li>
            <li><i><img src="https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.jpg" className="carouselImage" alt="la liga"></img></i></li>
            <li><i><img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/UEFA_Champions_League.svg/1200px-UEFA_Champions_League.svg.png" className="carouselImage" alt="champions league"></img></i></li>
            <li><i><img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/800px-Bundesliga_logo_%282017%29.svg.png" className="carouselImage" alt="bundesliga"></img></i></li>
            <li><i><img src="https://4.bp.blogspot.com/-4LwsXxqR5wY/Xu9eHQlhwuI/AAAAAAACdf8/6uIxrhfUHnYpXzfqMwwkq--mOq7WxlNgQCNcBGAsYHQ/s550/ligue-1-logo-%25284%2529.png" className="carouselImage" alt="ligue 1"></img></i></li>
            <li><i><img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/77/UEFA_Europa_League_%28football_competition%29_logo.svg/1200px-UEFA_Europa_League_%28football_competition%29_logo.svg.png" className="carouselImage" alt="europa league"></img></i></li>
            <li><i><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/MLS_crest_logo_RGB_gradient.svg/1200px-MLS_crest_logo_RGB_gradient.svg.png" className="carouselImage" alt="mls"></img></i></li>
            <li><i><img src="https://upload.wikimedia.org/wikipedia/en/5/55/FA_Cup_2020.png" className="carouselImage" alt="fa cup"></img></i></li>
        </ul>
        </div>
    </div>
    </>
  );
}

export default Leagues;

