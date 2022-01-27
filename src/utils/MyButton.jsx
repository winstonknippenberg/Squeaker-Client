import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function MyButton({
  children,
  onClick,
  btnClassName,
  tipClassName,
  tip,
}) {
  return (
    <Tooltip title={tip} className={tipClassName}>
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  );
}
