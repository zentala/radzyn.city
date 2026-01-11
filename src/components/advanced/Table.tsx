'use client';

import React from 'react';
import {
  Table as JoyTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Typography,
  Chip,
  IconButton,
} from '@mui/joy';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

export interface TableData {
  [key: string]: any;
}

export interface TableProps {
  columns: TableColumn[];
  data: TableData[];
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  stripe?: 'odd' | 'even' | false;
  hover?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'plain' | 'outlined' | 'soft' | 'solid';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  sx?: object;
  onRowClick?: (row: TableData, index: number) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
}

/**
 * Table - Joy UI-based table component
 */
export function Table({
  columns,
  data,
  loading = false,
  empty = false,
  emptyMessage = 'No data available',
  stripe = 'odd',
  hover = true,
  size = 'md',
  variant = 'outlined',
  color = 'neutral',
  sx,
  onRowClick,
  sortColumn,
  sortDirection,
  onSort,
}: TableProps) {
  const handleSort = (column: TableColumn) => {
    if (!column.sortable || !onSort) return;

    const newDirection = sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column.key, newDirection);
  };

  const getSortIcon = (column: TableColumn) => {
    if (sortColumn !== column.key) return null;
    return sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography level="body-md" sx={{ color: 'text.secondary' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (empty) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography level="body-md" sx={{ color: 'text.secondary' }}>
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ overflow: 'auto', ...sx }}>
      <JoyTable
        stripe={stripe}
        hoverRow={hover}
        size={size}
        variant={variant}
        color={color}
        sx={{
          '& thead th': {
            bgcolor: 'background.level1',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          },
          '& tbody tr:hover': {
            bgcolor: 'background.level1',
          },
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                sx={{
                  width: column.width,
                  textAlign: column.align || 'left',
                  cursor: column.sortable ? 'pointer' : 'default',
                  userSelect: 'none',
                }}
                onClick={() => handleSort(column)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography level="title-sm" sx={{ fontWeight: 'bold' }}>
                    {column.label}
                  </Typography>
                  {column.sortable && getSortIcon(column)}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick?.(row, index)}
              sx={{
                cursor: onRowClick ? 'pointer' : 'default',
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sx={{
                    textAlign: column.align || 'left',
                  }}
                >
                  {row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </JoyTable>
    </Box>
  );
}

/**
 * DataTable - Enhanced table with additional features
 */
export interface DataTableProps extends TableProps {
  selectable?: boolean;
  selectedRows?: Set<number>;
  onSelectionChange?: (selected: Set<number>) => void;
  actions?: React.ReactNode;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
  };
}

export function DataTable({
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  actions,
  pagination,
  ...props
}: DataTableProps) {
  const handleRowClick = (row: TableData, index: number) => {
    if (selectable && onSelectionChange) {
      const newSelected = new Set(selectedRows);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      onSelectionChange(newSelected);
    }
    props.onRowClick?.(row, index);
  };

  return (
    <Box>
      {actions && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          {actions}
        </Box>
      )}
      <Table {...props} onRowClick={selectable ? handleRowClick : props.onRowClick} />
      {pagination && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              Rows per page:
            </Typography>
            <select
              value={pagination.pageSize}
              onChange={(e) => pagination.onPageSizeChange(Number(e.target.value))}
              style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid',
                borderColor: 'var(--joy-palette-divider)',
                bgcolor: 'var(--joy-palette-background-surface)',
                color: 'inherit',
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
            >
              <
            </IconButton>
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              {pagination.page}
            </Typography>
            <IconButton
              size="sm"
              disabled={pagination.page * pagination.pageSize >= pagination.total}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
            >
              >
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Table;
