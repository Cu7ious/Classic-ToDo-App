import { css } from 'emotion';
import React from 'react';

const panel = css`
  display: flex;
  background-color: rgba(255, 255, 255, 0.8);
  background-color: hsla(0, 0%, 100%, .8);
  min-height: 75px;
  line-height: 40px;
  text-align: center;

  @media screen and (max-width: 650px) {
    min-height: 60px;
  }

  & h3 {
    width: 100%;

    @media screen and (max-width: 650px) {
      line-height: 20px;
    }
  }
`;

export default () => (
  <div className={`${panel}`}>
    <h3>Things to achieve</h3>
  </div>
);
