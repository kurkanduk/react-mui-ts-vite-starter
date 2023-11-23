import { AppAction, AppContext, AppStoreState } from "store/AppStore";
import {
    useContext,
    FunctionComponent,
    Dispatch,
    ComponentType,
} from 'react';

type AppContextReturningType = [AppStoreState, Dispatch<AppAction>];


/**
 * Hook to use the AppStore in functional components
 *
 * import {useAppStore} from './store'
 * ...
 * const [state, dispatch] = useAppStore();
 */
const useAppStore = (): AppContextReturningType => useContext(AppContext);

/**
 * HOC to inject the ApStore to class component, also works for functional components
 *
 * import {withAppStore} from './store'
 * ...
 * class MyComponent
 * ...
 * export default withAppStore(MyComponent)
 */
interface WithAppStoreProps {
  store: object;
}
const withAppStore = (Component: ComponentType<WithAppStoreProps>): FunctionComponent => (props) => {
    return <Component {...props} store={useAppStore()} />;
  };

export {useAppStore, withAppStore };