'use client';

import React from 'react';
import {
  Input as JoyInput,
  Textarea as JoyTextarea,
  Select as JoySelect,
  Option as JoyOption,
  FormLabel,
  FormHelperText,
  FormControl,
  InputProps as JoyInputProps,
  TextareaProps as JoyTextareaProps,
  SelectProps as JoySelectProps,
  OptionProps as JoyOptionProps,
} from '@mui/joy';

export interface InputProps extends Omit<JoyInputProps, 'color' | 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export interface TextareaProps extends Omit<JoyTextareaProps, 'color' | 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  minRows?: number;
  maxRows?: number;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<JoySelectProps<string, false>, 'color' | 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

/**
 * Input - Standardized text input component
 */
export function Input({
  label,
  helperText,
  error = false,
  color = 'primary',
  size = 'md',
  fullWidth = false,
  sx,
  ...props
}: InputProps) {
  return (
    <FormControl error={error} sx={{ width: fullWidth ? '100%' : 'auto', ...sx }}>
      {label && <FormLabel>{label}</FormLabel>}
      <JoyInput
        color={error ? 'danger' : color}
        size={size}
        fullWidth={fullWidth}
        {...props}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

/**
 * Textarea - Standardized textarea component
 */
export function Textarea({
  label,
  helperText,
  error = false,
  color = 'primary',
  size = 'md',
  fullWidth = false,
  minRows = 3,
  maxRows,
  sx,
  ...props
}: TextareaProps) {
  return (
    <FormControl error={error} sx={{ width: fullWidth ? '100%' : 'auto', ...sx }}>
      {label && <FormLabel>{label}</FormLabel>}
      <JoyTextarea
        color={error ? 'danger' : color}
        size={size}
        fullWidth={fullWidth}
        minRows={minRows}
        maxRows={maxRows}
        {...props}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

/**
 * Select - Standardized select dropdown component
 */
export function Select({
  label,
  helperText,
  error = false,
  color = 'primary',
  size = 'md',
  fullWidth = false,
  options,
  placeholder = 'Select an option',
  sx,
  ...props
}: SelectProps) {
  return (
    <FormControl error={error} sx={{ width: fullWidth ? '100%' : 'auto', ...sx }}>
      {label && <FormLabel>{label}</FormLabel>}
      <JoySelect
        color={error ? 'danger' : color}
        size={size}
        fullWidth={fullWidth}
        placeholder={placeholder}
        {...props}
      >
        {options.map((option) => (
          <JoyOption
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </JoyOption>
        ))}
      </JoySelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default Input;
