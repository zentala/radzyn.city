'use client';

import React from 'react';
import {
  Alert as JoyAlert,
  AlertProps as JoyAlertProps,
  Box,
  Typography,
} from '@mui/joy';
import {
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

export interface AlertProps extends Omit<JoyAlertProps, 'color' | 'variant'> {
  variant?: 'solid' | 'soft' | 'outlined';
  severity?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  closable?: boolean;
}

/**
 * Alert - Standardized alert component with severity levels
 */
export function Alert({
  variant = 'soft',
  severity = 'info',
  title,
  icon,
  onClose,
  closable = false,
  children,
  sx,
  ...props
}: AlertProps) {
  const getIcon = () => {
    if (icon) return icon;
    switch (severity) {
      case 'success':
        return <SuccessIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'info':
      default:
        return <InfoIcon />;
    }
  };

  const getJoyColor = () => {
    switch (severity) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
      case 'info':
      default:
        return 'info';
    }
  };

  return (
    <JoyAlert
      variant={variant}
      color={getJoyColor()}
      startDecorator={getIcon()}
      endDecorator={closable ? (
        <Box
          onClick={onClose}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              opacity: 0.7,
            },
          }}
        >
          ✕
        </Box>
      ) : undefined}
      sx={{
        alignItems: 'flex-start',
        ...sx,
      }}
      {...props}
    >
      {title && (
        <Typography level="title-md" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
      )}
      {children}
    </JoyAlert>
  );
}

/**
 * SuccessAlert - Pre-configured success alert
 */
export function SuccessAlert({ title = 'Success', ...props }: Omit<AlertProps, 'severity'>) {
  return <Alert severity="success" title={title} {...props} />;
}

/**
 * WarningAlert - Pre-configured warning alert
 */
export function WarningAlert({ title = 'Warning', ...props }: Omit<AlertProps, 'severity'>) {
  return <Alert severity="warning" title={title} {...props} />;
}

/**
 * ErrorAlert - Pre-configured error alert
 */
export function ErrorAlert({ title = 'Error', ...props }: Omit<AlertProps, 'severity'>) {
  return <Alert severity="error" title={title} {...props} />;
}

/**
 * InfoAlert - Pre-configured info alert
 */
export function InfoAlert({ title = 'Information', ...props }: Omit<AlertProps, 'severity'>) {
  return <Alert severity="info" title={title} {...props} />;
}

export default Alert;
