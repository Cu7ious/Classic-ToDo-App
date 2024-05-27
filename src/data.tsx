import { createContext, Dispatch, useContext, useReducer } from "react";

export interface TodoState {
  allDone: boolean;
  filter: Filter;
  items: TodoItem[];
  setState: (props: any) => void;
}

export interface TodoItem {
  text: string;
  done: boolean;
  editing: boolean;
}

export enum Filter {
  ALL = "all",
  REMAINED = "remained",
  COMPLETED = "completed",
}

export enum THEME {
  WORKDAY_BLUE = "WORKDAY_BLUE",
  ANGULAR_RED = "ANGULAR_RED",
  NODE_GREEN = "NODE_GREEN",
}

interface ThemeColorsData {
  MAIN_COLOR: string;
  MAIN_COLOR_DARK: string;
}

interface ThemeColors {
  [propName: string]: ThemeColorsData;
}

export const THEME_COLORS: ThemeColors = {
  WORKDAY_BLUE: { MAIN_COLOR: "#0165c7", MAIN_COLOR_DARK: "#014d98" },
  ANGULAR_RED: { MAIN_COLOR: "#dd0130", MAIN_COLOR_DARK: "#a50023" },
  NODE_GREEN: { MAIN_COLOR: "#026e00", MAIN_COLOR_DARK: "#012d00" },
};

interface AppTheme {
  appTheme: THEME;
}
type ThemeAction = { type: "SWITCH_APP_THEME"; payload: THEME };

const initialState = { appTheme: THEME.WORKDAY_BLUE };

type ThemeContextType = [AppTheme, Dispatch<ThemeAction>];
export const ThemeContext = createContext<ThemeContextType>([initialState, () => false]);

function reducer(state: AppTheme, action: ThemeAction) {
  switch (action.type) {
    case "SWITCH_APP_THEME":
      return { ...state, appTheme: action.payload };
    default:
      return state;
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const contextValue = useContext(ThemeContext);
  return contextValue;
};

export const defaultState = {
  filter: Filter.ALL,
  allDone: false,
  items: [
    { text: "Wake Up", done: false, editing: false },
    { text: "Grab Coffee", done: false, editing: false },
    { text: "Code it, Ship it", done: false, editing: false },
  ],
  setState: () => false,
};

const savedState = localStorage.getItem("classicToDoState");
export const AppContext = createContext<TodoState>({
  ...defaultState,
  items: (savedState && JSON.parse(savedState).items) || [],
  setState: () => {},
});
