import React, { useState } from "react";
import {css} from '@emotion/css';
import Nav from './Components/nav';
import Stopwatch from './Components/timer';
import Clock from './Components/settime';
import TimerContainer from './Components/stopwatch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const Card = () => {
  const [background, setBackground] = useState("#fdfdfd");

  const [font, setFont] = useState("#424246");

  const setStyle = (background, font) => {
    setBackground(background);
    setFont(font);
  };

  const card = css`
    width: 2000px;
    height:2000px;
    padding: 40px 40px 20px 40px;
    background-color: ${background};
    h1 {
      font-family: "Abril Fatface", cursive;
      font-weight: 400;
      font-size: 36px;
      margin-bottom: 10px;
      color: ${font};
    }
    p {
      font-family: "Poppins", sans-serif;
      font-weight: 300;
      font-size: 16px;
      margin-bottom: 20px;
      color: ${font};
    }
  `;

  const cardButtons = css`
    display: flex;
    flex-wrap: wrap;
    div {
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 12px;
      padding: 10px 30px;
      margin-right: 20px;
      margin-bottom: 20px;
      border: none;
      border-radius: 50px;
      cursor: pointer;
    }
  `;

  const violetButton = css`
    color: #fdfdfd;
    background-color: #ab47bc;
    box-shadow: 1px 1px 1px 1px black;
  `;

  const orangeButton = css`
    color: #fdfdfd;
    background-color: #ff9800;
    box-shadow: 1px 1px 1px 1px black;
  `;

  const greenButton = css`
    color: #424246;
    background-color: #a5d6a7;
    box-shadow: 1px 1px 1px 1px black;
  `;

  return (
    <div className={card}>
        

      <h1>Click to change color</h1>
      <div className={cardButtons}>
        <div
          onMouseEnter={() => setStyle("#ab47bc", "#fdfdfd")}
          className={violetButton}
        >
          Violet
        </div>
        <div
          onMouseEnter={() => setStyle("#ff9800", "#fdfdfd")}
          className={orangeButton}
        >
          Orange
        </div>
        <div
          onMouseEnter={() => setStyle("#a5d6a7", "#424246")}
          className={greenButton}
        >
          Green
        </div>
      </div>
      
    </div>
  );
};

export default Card;