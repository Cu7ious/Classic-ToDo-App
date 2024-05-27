import { css } from '@emotion/react';

const inputForm = css`
  display: inline-block;
  margin-top: 10px;
  width: 100%;
  color: #bbb;
  font: 16px monospace;
  box-shadow: inset 0 -4px 5px 0 rgba(0, 0, 0, 0.08);
  height: 55px;
`;

const control = css`
  position: absolute;
  margin-left: 20px;
  margin-top: 3px;
  font-size: 30px;
  display: inline-block;
  transition: color 0.3s linear;
  cursor: pointer;

  &:hover {
    color: #909090;
  }
`;

const input = css`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  color: #3d4255;
  border: 0;
  height: 40px;
  padding: 0 0 0 62px;
  background: rgba(0, 0, 0, 0);
  font-size: 30px;
  font-weight: 100;
`;

interface InputBoxProps {
  isEmpty: boolean;
  markAllAsDone: () => void;
  addItem: (e: any) => void;
}

const InputBox = (props: InputBoxProps) => (
  <div css={inputForm}>
    {!props.isEmpty && <span css={control} onClick={props.markAllAsDone}>&#x025BE;</span>}
    <input
      autoFocus={true}
      css={input}
      onKeyUp={props.addItem}
      type="text"
    />
  </div>
);

export default InputBox;
