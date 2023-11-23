import { createContext, useReducer, FunctionComponent, Dispatch, PropsWithChildren } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppReducer from './AppReducer';
import { localStorageGet } from '../utils/localStorage';

/**
 * AppState structure and initial values
 */
export interface AppStoreState {
  darkMode: boolean;
  isAuthenticated: boolean;
  currentUser?: object | undefined;
}
const INITIAL_APP_STATE: AppStoreState = {
  darkMode: false, // Overridden by useMediaQuery('(prefers-color-scheme: dark)') in AppStore
  isAuthenticated: false, // Overridden in AppStore by checking auth token
};

/**
 * Instance of React Context for global AppStore
 */
type AppContextReturningType = [AppStoreState, Dispatch<AppAction>];
const AppContext = createContext<AppContextReturningType>([INITIAL_APP_STATE, () => null]);

/**
 * Main global Store as HOC with React Context API
 *
 * import {AppStoreProvider} from './store'
 * ...
 * <AppStoreProvider>
 *  <App/>
 * </AppStoreProvider>
 */
const AppStoreProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const previousDarkMode = Boolean(localStorageGet('darkMode'));
  // const tokenExists = Boolean(loadToken());

  const initialState: AppStoreState = {
    ...INITIAL_APP_STATE,
    darkMode: previousDarkMode || prefersDarkMode,
    // isAuthenticated: tokenExists,
  };
  const value: AppContextReturningType = useReducer(AppReducer, initialState);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Represents a user in the application.
 * @typedef {Object} User
 * @property {string} uid - The unique identifier of the user.
 * @property {string} name - The name of the user.
 * @property {string} [etc] - Additional properties for the user (optional).
 */
type User = {
  uid: string;
  name: string;
  // etc.
};

type BaseAppAction = {
  payload?: unknown;
};

/**
 * Represents actions that can be dispatched to the application store.
 * @typedef {Object} AppAction
 * @property {'CURRENT_USER'} type - The type of the action.
 * @property {User} [currentUser] - The user object (only applicable for 'CURRENT_USER' action).
 * @property {'SIGN_UP' | 'LOG_IN'} [type] - The type of authentication action ('SIGN_UP' or 'LOG_IN').
 * @property {'LOG_OUT'} [type] - The type of action for user logout.
 * @property {'DARK_MODE'} [type] - The type of action for toggling dark mode.
 * @property {boolean} [darkMode] - The value indicating whether dark mode is enabled (only applicable for 'DARK_MODE' action).
 */
export type AppAction =
  | (BaseAppAction & { type: 'CURRENT_USER'; currentUser: User })
  | ({ payload: boolean } & { type: 'DARK_MODE' })
  | (BaseAppAction & { type: 'LOG_OUT' })
  | (BaseAppAction & { type: 'LOG_IN' })
  | (BaseAppAction & { type: 'SIGN_UP' });

export { AppStoreProvider as AppStore, AppContext };
