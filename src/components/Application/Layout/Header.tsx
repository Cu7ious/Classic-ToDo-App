import { THEME_COLORS, useTheme } from 'data';
import { css } from 'emotion';
import React, { useCallback } from 'react';

const navButton = css`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQAAAAB/ecQqAAAAAnRSTlMAAHaTzTgAAAAWSURBVHgBY6AFYP4PBAewUoPbFMoBAE11OPW6yVcZAAAAAElFTkSuQmCC) no-repeat 50%;
  display: inline-block;
  width: 57px;
  height: 57px;
  cursor: pointer;
  padding: 10px;
  outline: none;
  background-size: 65%;
  border: 0;
`;

const headerLeft = css`grid-area: header-left`;
const headerCenter = css`grid-area: header-center; text-align: center;`;
const headerRight = css`grid-area: header-right`;

const brandLogo = css`
  display: inline-block;
  width: 150px;
  margin: 21px 0 0;

  @media screen and (max-width:700px) {
    text-align: right
  }

  @media screen and (max-width:500px) {
    display: none
  }
`;

const githubBadge = css`
  position: absolute;
  top: 12px;
  right: 15px
`;

const header = css`
  position: fixed;
  display: grid;
  width: 100%;
  height: 55px;
  top: 0;
  z-index: 10;
  /* box-shadow: 0 0 2px #000000; */

  grid-template-columns: 25% 50% 25%;
  grid-template-rows: auto;
  grid-template-areas: "header-left header-center header-right";
  transition: background-image 0.2s ease-in-out;

  & h1 {
    margin: 0
  }

  & svg {
    position: absolute;
    left: 165px;
    top: 20px
  }

  & span {
    font-weight: 100;
    font-style: italic;
    position: absolute;
    top: 16px;
    color: #fff;
    font-size: 24px;
    left: 55px
  }

  @media screen and (max-width:700px) {
    & svg {
      width: 60%
    }
  }
}
`;

export default function Header (props: any) {
  const [{appTheme}] = useTheme();
  const openSidebar = useCallback(() => props.setActivePanel(true), [props]);

  const headerColors = css`
    background-image: linear-gradient(
      to right,
      ${(THEME_COLORS as any)[appTheme].MAIN_COLOR},
      ${(THEME_COLORS as any)[appTheme].MAIN_COLOR_DARK}
    );
    border-bottom: 4px solid ${(THEME_COLORS as any)[appTheme].MAIN_COLOR_DARK}
  `;
  return (
    <header className={`${header} ${headerColors}`}>
      <h1 className={headerLeft} title="React.js based Classic Todo App">
        <button className={navButton} onClick={openSidebar} />
        <span>Todo App</span>
        <svg width="27px" height="20px" viewBox="0 0 27 20">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-396.000000, -3254.000000)" fill="#FFFFFF">
              <polygon
                transform="translate(409.502930, 3263.995337) scale(1, -1) translate(-409.502930, -3263.995337)"
                points="406.412678 3254.8501 422.207764 3269.49995 418.511719 3273.14058 406.412678 3261.72944
                  400.39917 3267.03779 396.798096 3263.45283"
              />
            </g>
          </g>
        </svg>
      </h1>
      <div className={headerCenter}>
        <a target="_blank" rel="noopener noreferrer" href="https://cu7io.us/">
          <img
            className={brandLogo}
            src={`${process.env.PUBLIC_URL}/assets/svg/by-Cu7ious-watermark-white.svg`}
            alt="Created by CU7IOUS"
          />
        </a>
      </div>
      <div className={headerRight}>
        <a className={githubBadge} target="_blank" rel="noopener noreferrer" href="https://github.com/Cu7ious/">
          <img src={`${process.env.PUBLIC_URL}/assets/svg/github.svg`} alt="See more on GitHub" />
        </a>
      </div>
    </header>
  );
}
