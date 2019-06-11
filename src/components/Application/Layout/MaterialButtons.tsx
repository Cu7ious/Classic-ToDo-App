import { THEME_COLORS, useTheme } from 'data';
import { css } from 'emotion';
import React from 'react';

interface MaterialButtonsProps {
  clearAllData: () => void;
  pasteDummyData: () => void;
}

const materialButtons = css`
  position: fixed;
  right: 35px;
  bottom: 20px;
  list-style: none;

  span {
    position: absolute;
    font-size: 12px;
    padding: 2px 8px;
    top: 5px;
    background-color: rgba(43, 43, 43, 0.67);
    max-height: 20px;
    border-radius: 3px;
    line-height: 21px;
  }
`;

const listItem = css`
  width: 56px;
  height: 53px;
  color: #fff;
  position: relative;
  border-radius: 56px;
  text-align: center;
  font-size: 32px;
  line-height: 62px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  cursor: pointer;
`;

const secondaryButton = css`
  width: 36px;
  height: 34px;
  border-radius: 36px;
  font-size: 22px;
  line-height: 40px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const clearAllData = css`
  top: 6px;
  left: -93px;
`;

const pasteDummyData = css`
  top: 16px;
  left: -122px;
`

const MaterialButtons = (props: MaterialButtonsProps) => {
  const [{ appTheme }] = useTheme();

  const listItemColors = css`
    background-color: ${(THEME_COLORS as any)[appTheme].MAIN_COLOR};
    border-bottom: 4px solid ${(THEME_COLORS as any)[appTheme].MAIN_COLOR_DARK}
  `;

  return (
    <ul className={materialButtons}>
      <li
        onClick={props.clearAllData}
        className={`${listItem} ${secondaryButton} ${listItemColors}`}
      >
        &#x021BA;
        <span className={clearAllData}>Clear all data</span>
      </li>
      <li onClick={props.pasteDummyData} className={`${listItem} ${listItemColors}`}>
        &crarr;
        <span className={pasteDummyData}>Paste dummy data</span>
      </li>
    </ul>
  );
};

export default MaterialButtons;
