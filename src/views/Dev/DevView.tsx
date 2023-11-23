import AppView from '@components/AppView/AppView';

/**
 * Renders Development tools when env.VITE_APP_DEBUG is true
 * url: /dev
 * @page Dev
 */
const DevView = () => {
  if (import.meta.env.VITE_APP_DEBUG !== 'true') return null; // Hide this page on when env.VITE_APP_DEBUG is not set

  return <AppView>Debug controls and components on this page...</AppView>;
};

export default DevView;
