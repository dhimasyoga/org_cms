// #region IMPORT
import { Tooltip, TooltipProps } from '@mui/material';
import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';
import { ReactNode } from 'react';
// #endregion

// #region INTERFACE
interface Props extends IconButtonProps {
  label: string;
  icon: ReactNode;
  arrow?: boolean;
  placement?: TooltipProps['placement'];
}
// #endregion

// #region MAIN
const IconBtn: React.FC<Props> = ({
  icon,
  label,
  arrow,
  placement,
  ...others
}: Props) => {
  return (
    <Tooltip title={label} arrow={arrow} placement={placement}>
      <MuiIconButton {...others}>{icon}</MuiIconButton>
    </Tooltip>
  );
};

export default IconBtn;
// #endregion
