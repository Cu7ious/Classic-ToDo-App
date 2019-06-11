import { AppContext, defaultState, ThemeProvider, TodoItem, TodoState } from 'data';
import { css } from 'emotion';
import React, { useContext, useEffect, useState } from 'react';
import { capitalize } from 'utils';

import AppControls from './Application/Controls';
import InputForm from './Application/InputForm';
import Header from './Application/Layout/Header';
import MaterialButtons from './Application/Layout/MaterialButtons';
import Panel from './Application/Layout/Panel';
import Sidebar from './Application/Layout/Sidebar';
import ThemeSwitcher from './Application/Layout/ThemeSwitcher';
import TodoItems from './Application/TodoItems';

const todoApp = css`
  padding: 55px 0 0;
  display: block;
  text-align: center;

  @media screen and (max-width: 850px) {
    display: block;
    padding: 8px 5px;
  }

  @media screen and (max-width: 650px) {
    display: block;
    padding: 8px 5px;

    ul li {
      font-size: 20px !important;
    }

  }
`;

const appWrapper = css`
  display: inline-block;
  text-align: initial;
  min-width: 40vw;
  max-width: 60vw;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 850px) {
    min-width: 70vw;
  }

  @media screen and (max-width: 650px) {
    min-width: 96.5vw;
  }

  @media screen and (max-width: 400px) {
    min-width: 390px;
    width: 390px;
  }
`;

export default function App () {
  const [state, setState] = useState<TodoState>(useContext<TodoState>(AppContext));
  const [activePanel, setActivePanel] = useState(false);

  function setActivePanelEffect(value: boolean) {
    document.body.classList.toggle('global-sidebar-is-active');
    setActivePanel(value);
  }

  // Local Storage
  useEffect(() => {
    console.log('State has changed');
    localStorage.setItem('classicToDoState', JSON.stringify(state));
  }, [state]);

  // Global Sidebar
  useEffect(() => {
    function callback (e: KeyboardEvent) {
      if (e.type === 'keyup' && e.keyCode === 27) {
        setActivePanelEffect(false);
      }
    };

    window.addEventListener('keyup', callback);

    return () => {
      window.removeEventListener('keyup', callback);
    }
  });

  function addItem(e: any) {
    if (e.keyCode === 13 && e.target.value) {
      const items = state.items;
      items.unshift({
        text: capitalize(e.target.value),
        done: false,
        editing: false
      })
      setState({ ...state, items });
      e.target.value = '';
    }
  }

  function toggleMarkAllAsDone() {
    setState({
      ...state,
      allDone: !state.allDone,
      items: state.items.map((item: TodoItem) => {
        item.done = !state.allDone
        return item
      })
    })
  }

  function pasteDummyData() {
    setState(defaultState);
  }

  function clearAllData() {
    const state = {
      ...defaultState,
      items: []
    };
    localStorage.setItem('classicToDoState', JSON.stringify(state));
    setState(state);
  }

  return (
    <>
      <ThemeProvider>
        <Header setActivePanel={setActivePanelEffect} />
        <Sidebar activePanel={activePanel} setActivePanel={setActivePanelEffect} />
        <Panel />
        <ThemeSwitcher />
        <div className={todoApp}>
          <div className={appWrapper}>
            <AppContext.Provider value={{ ...state, setState }}>
              <InputForm
                isEmpty={state.items.length === 0}
                markAllAsDone={toggleMarkAllAsDone}
                addItem={addItem}
              />
              <TodoItems />
              <AppControls />
            </AppContext.Provider>
          </div>
        </div>
        <MaterialButtons
          clearAllData={clearAllData}
          pasteDummyData={pasteDummyData}
        />
      </ThemeProvider>
    </>
  );
}
