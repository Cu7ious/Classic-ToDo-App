import { css } from 'emotion';
import React, { useContext } from 'react';

import { AppContext } from '../../../data';
import { capitalize, filterItems } from '../../../utils';
import TodoItemBox from './TodoItem';

const list = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export default function TodoItems () {
  const state = useContext(AppContext);

  function editItem(index: number, e: any) {
    const items = state.items;
    items[index].text = capitalize(e.target.value);
    state.setState && state.setState({ ...state, items });
  }

  function saveEditedItem(index: number, e: any) {
    const items = state.items;
    if (e.type === 'keyup') {
      if (e.keyCode === 13 || e.keyCode === 27) {
        items[index].editing = false;
        state.setState && state.setState({ ...state, items });
      }
    } else {
      items[index].editing = false;

      state.setState && state.setState({ ...state, items });
    }
  }

  function removeItem(index: number) {
    const items = state.items;
    items.splice(index, 1);
    state.setState && state.setState({ ...state, items });
  }

  function setItemIsEditable(index: number) {
    const items = state.items;
    items[index].editing = true;
    state.setState && state.setState({ ...state, items });
  }

  function toggleMarkAsDone(index: number) {
    const items = state.items;
    items[index].done = !items[index].done;
    state.setState && state.setState({ ...state, items });
  }

  return state.items.length > 0 ? (
    <ul className={list}>
      {/* </Sortable> */}
      {filterItems(state.items, state.filter)
        .map((item, index) => (
          <TodoItemBox
            item={item}
            index={index}
            key={index}
            actions={{
              editItem,
              saveEditedItem,
              setItemIsEditable,
              toggleMarkAsDone,
              removeItem
            }}
          />)
      )}
    </ul>
  ) : null;
};
