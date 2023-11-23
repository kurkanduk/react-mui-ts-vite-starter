import { FunctionComponent, SVGAttributes } from 'react';
import { APP_ICON_SIZE } from '../config';
import DefaultIcon from '@mui/icons-material/MoreHoriz';
import { ICONS } from './constants';

/**
 * How to use:
 * 1. Import all required MUI or other SVG icons into this file.
 * 2. Add icons with "unique lowercase names" into ICONS object.
 * 3. Use icons everywhere in the App by their names in <AppIcon icon="xxx" /> component
 * Important: properties of ICONS object MUST be lowercase!
 * Note: You can use camelCase or UPPERCASE in the <AppIcon icon="someIconByName" /> component
 */

export interface AppIconProps extends SVGAttributes<SVGElement> {
  color?: string;
  icon?: string;
  size?: string | number;
  title?: string;
}

/**
 * Renders SVG icon by given Icon name
 * @component AppIcon
 * @param {string} [color] - color of the icon as a CSS color value
 * @param {string} [icon] - name of the Icon to render
 * @param {string} [title] - title/hint to show when the cursor hovers the icon
 * @param {string | number} [size] - size of the icon, default is ICON_SIZE
 */
const AppIcon: FunctionComponent<AppIconProps> = ({
  color,
  icon = 'default',
  size = APP_ICON_SIZE,
  style,
  ...restOfProps
}) => {
  const iconName = (icon || 'default').trim().toLowerCase();

  let ComponentToRender = ICONS[iconName];
  if (!ComponentToRender) {
    console.warn(`AppIcon: icon "${iconName}" is not found!`);
    ComponentToRender = DefaultIcon;
  }

  const propsToRender = {
    height: size,
    color,
    fill: color && 'currentColor',
    size,
    style: { ...style, color },
    width: size,
    ...restOfProps,
  };

  return <ComponentToRender data-icon={iconName} {...propsToRender} />;
};

export default AppIcon;
