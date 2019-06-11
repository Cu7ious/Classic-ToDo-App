import { THEME_COLORS, useTheme } from 'data';
import { css } from 'emotion';
import React, { useCallback } from 'react';

const footer = css`
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;

  p {
    margin-left: -165px;
    font-size: 12px;
    font-style: italic;
    color: #3d4255;
  }

  a {
    text-decoration: none;

    & img {
      width: 100px;
      position: absolute;
      margin-left: 5px;
      margin-top: 3px;
    }

    svg {
      width: 100px;
      bottom: -6px;
      position: absolute;
      margin-left: 5px;
    }
  }
`;

const content = css`
  max-width: 100%;
  margin-top: 30px;
  overflow-y: auto;

  & ul {
    list-style-position: inside;
  }
`;

const sidebar = css`
  width: 400px;
  height: calc(100vh - 110px);
  position: fixed;
  top: 0;
  display: block;
  left: 0;
  background: #fff;
  padding: 30px 30px 80px 30px;
  z-index: 999;
  transform: translateX(-460px);
  transition: transform .5s ease-in-out;

  & h2,
  & h3 {
    font-weight: 100;
    font-style: italic;
    text-align: center;
    color: #006DB6;
  }

  & ul {
    & li {
      & span {
        font-weight: bold;
      }
    }
  }

  @media screen and (max-width:600px) {
    width: calc(100% - 60px)
  }

  .wrapper {
    min-height: 100%;
    color: #3d4255;
    background-color: #e0e0e0;
  }
`;

const closeButton = css`
  position: absolute;
  top: 0;
  right: 15px;
  padding: 0;
  border: 0;
  color: #a9a9a9;
  background-color: transparent;
  font-size: 32px;
  cursor: pointer;
  outline: none;
  transition: color .3s linear;

  &:hover {
    color: #6b6b6b
  }
`;

const activeSidebar = css`
  transform: translateX(0);
  overflow-y: hidden;
`;

const magOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: #000;
  visibility: hidden;
  opacity: 0;
  cursor: pointer;
  transition: visibility, opacity .5s ease-in-out;
`;

const activeOverlay = css`
  visibility: visible;
  z-index: 99;
  opacity: .6;
`;

export default function Sidebar (props: any) {
  const [{ appTheme }] = useTheme();
  const color = { color: `${(THEME_COLORS as any)[appTheme].MAIN_COLOR}` }
  const PUBLIC_URL = process.env.PUBLIC_URL;
  const closeSidebar = useCallback(() => props.setActivePanel(false), [props]);

  return (
    <>
      <aside className={`${sidebar} ${props.activePanel && activeSidebar}`}>
        <h2 style={color}>React.js based Classic Todo App</h2>
        <h3 style={color}>with emotion and hooks</h3>
        <button className={closeButton} onClick={closeSidebar}>⨯</button>
        <section className={content}>
        <ul>
          <li>Something useful here...</li>
        </ul>
      </section>
        <footer className={footer}>
        <p>Designed &amp; coded with &hearts;
          <a target="_blank" rel="noopener noreferrer" href="https://cu7io.us/">
            <img src={`${PUBLIC_URL}/assets/svg/by-Cu7ious-watermark-black.svg`} alt="Created by CU7IOUS" />
          </a>
        </p>
        </footer>
      </aside>
      <div className={`${magOverlay} ${props.activePanel && activeOverlay}`} id="magnet-overlay" onClick={closeSidebar} />
    </>
  );
}
