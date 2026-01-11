'use client';

import React from 'react';
import {
  Modal as JoyModal,
  ModalDialog,
  ModalClose,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'plain' | 'outlined' | 'soft' | 'solid';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  showCloseButton?: boolean;
  sx?: object;
}

/**
 * Modal - Joy UI-based modal dialog component
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  size = 'md',
  variant = 'outlined',
  color = 'neutral',
  showCloseButton = true,
  sx,
}: ModalProps) {
  return (
    <JoyModal open={open} onClose={onClose}>
      <ModalDialog
        variant={variant}
        color={color}
        sx={{
          width: size === 'sm' ? '400px' : size === 'lg' ? '800px' : size === 'xl' ? '1000px' : '600px',
          maxWidth: '90vw',
          maxHeight: '85vh',
          overflow: 'auto',
          ...sx,
        }}
      >
        {showCloseButton && (
          <ModalClose>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </ModalClose>
        )}

        {title && (
          <Typography level="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            {title}
          </Typography>
        )}

        <Box sx={{ mb: actions ? 2 : 0 }}>
          {children}
        </Box>

        {actions && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            {actions}
          </Box>
        )}
      </ModalDialog>
    </JoyModal>
  );
}

export default Modal;
