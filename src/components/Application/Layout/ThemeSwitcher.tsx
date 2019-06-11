import { THEME, useTheme } from 'data';
import { css } from 'emotion';
import React, { useState } from 'react';

interface ThemeSwitcherState {
  appTheme: THEME;
}

const ThemeSwitcBtn = css`
  width: 40px;
  height: 40px;
  outline: none;
  border: 1px solid #FFF;
  font-size: 0;
  cursor: pointer;
`;

const WORKDAY_BLUE = css`background-color: #0165c7`;
const REACT_LIGHTBLUE = css`background-color: #61dafb`;
const ANGULAR_RED = css`background-color: #dd0130`;
const NODE_GREEN = css`background-color: #026e00`;
// const ACID_TRIP = css`
//   background-image: radial-gradient(circle,
//     #00ff8c, #88e244, #b6c100, #d49d00, #e57500, #da7c00, #cf8200, #c58700, #a0ad2f, #73cb71, #34e2ba, #00f4ff
//   )
// `;

const AnimatedSpecialChar = css`
  animation: spin 5000ms infinite linear;
  background-color: transparent;
  border-radius: 32px;
  padding: 0;
  margin: 0 0 0 10px;
  font-size: 32px;
  display: block;
  outline: none;
  border: none;
  cursor: pointer;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    } to {
      transform: rotate(360deg);
    }
  }
`;

const ThemeSwitcherCSS = css`
  box-shadow: 0 0 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 32px 0 0 32px;
  background-color: #FFF;
  position: fixed;
  border: none;
  right: 0;
  top: 50vh;
  display: grid;
  grid-template-columns: 20% 80%;
  width: 235px;
  transition: translateX, .3s linear;

  ul {
    list-style: none;
    padding: 9px 0;
    margin: 0;
    text-align: center;

    li {
      display: inline-block
    }
  }
`;

function ThemeSelected(theme: THEME) {
  switch (theme) {
    case THEME.WORKDAY_BLUE: return 1;
    case THEME.REACT_LIGHTBLUE: return 2;
    case THEME.ANGULAR_RED: return 3;
    case THEME.NODE_GREEN: return 4;
  }
}

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [{ appTheme }, dispatch] = useTheme();

  const switchAppTheme = (e: any) => {
    dispatch({ type: 'SWITCH_APP_THEME', payload: e.target.innerText });
  };

  const ThemeSwitcherTransform = css`transform: translateX(${!isOpen ? '190px' : 0})`;
  const li = css`li:nth-of-type(${ThemeSelected(appTheme)}) { border: 1px solid }`;

  return (
    <div className={`${ThemeSwitcherCSS} ${ThemeSwitcherTransform}`}>
      <button onClick={() => setIsOpen(!isOpen)} className={AnimatedSpecialChar}>&#x1D530;</button>
      <ul className={li} onClick={switchAppTheme}>
        <li><button className={`${ThemeSwitcBtn} ${WORKDAY_BLUE}`}>WORKDAY_BLUE</button></li>
        <li><button className={`${ThemeSwitcBtn} ${REACT_LIGHTBLUE}`}>REACT_LIGHTBLUE</button></li>
        <li><button className={`${ThemeSwitcBtn} ${ANGULAR_RED}`}>ANGULAR_RED</button></li>
        <li><button className={`${ThemeSwitcBtn} ${NODE_GREEN}`}>NODE_GREEN</button></li>
        {/* <li><button className={`${ThemeSwitcBtn} ${ACID_TRIP}`}>ACID_TRIP</button></li> */}
      </ul>
    </div>
  );
}
