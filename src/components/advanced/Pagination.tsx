'use client';

import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Select,
  Option,
  useTheme,
} from '@mui/joy';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showFirstLast?: boolean;
  showPageSizeSelector?: boolean;
  showTotal?: boolean;
  variant?: 'plain' | 'outlined' | 'soft' | 'solid';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  sx?: object;
}

/**
 * Pagination - Joy UI-based pagination component
 */
export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  showFirstLast = true,
  showPageSizeSelector = true,
  showTotal = true,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  sx,
}: PaginationProps) {
  const theme = useTheme();
  const totalPages = Math.ceil(total / pageSize);
  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }

    return pages.map((p, index) => {
      if (p === '...') {
        return (
          <Typography
            key={`ellipsis-${index}`}
            level="body-sm"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 32,
              height: 32,
              color: 'text.secondary',
            }}
          >
            ...
          </Typography>
        );
      }

      return (
        <IconButton
          key={p}
          variant={page === p ? 'solid' : variant}
          color={page === p ? color : 'neutral'}
          size={size}
          onClick={() => handlePageChange(p as number)}
          sx={{
            minWidth: 32,
            height: 32,
            ...(page === p && {
              bgcolor: theme.vars.palette[color]?.[500],
              '&:hover': {
                bgcolor: theme.vars.palette[color]?.[600],
              },
            }),
          }}
        >
          {p}
        </IconButton>
      );
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        ...sx,
      }}
    >
      {/* Page size selector and total */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {showPageSizeSelector && onPageSizeChange && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              Rows per page:
            </Typography>
            <Select
              value={pageSize}
              onChange={(_event, newValue) => onPageSizeChange(newValue as number)}
              size={size}
              sx={{ minWidth: 80 }}
            >
              {pageSizeOptions.map((size) => (
                <Option key={size} value={size}>
                  {size}
                </Option>
              ))}
            </Select>
          </Box>
        )}

        {showTotal && (
          <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
            {total === 0 ? 'No items' : `${startItem}-${endItem} of ${total}`}
          </Typography>
        )}
      </Box>

      {/* Page navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {showFirstLast && (
          <IconButton
            variant={variant}
            color="neutral"
            size={size}
            disabled={page === 1}
            onClick={() => handlePageChange(1)}
            sx={{ minWidth: 32, height: 32 }}
          >
            <FirstPageIcon fontSize="small" />
          </IconButton>
        )}

        <IconButton
          variant={variant}
          color="neutral"
          size={size}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          sx={{ minWidth: 32, height: 32 }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        {renderPageNumbers()}

        <IconButton
          variant={variant}
          color="neutral"
          size={size}
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          sx={{ minWidth: 32, height: 32 }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>

        {showFirstLast && (
          <IconButton
            variant={variant}
            color="neutral"
            size={size}
            disabled={page === totalPages}
            onClick={() => handlePageChange(totalPages)}
            sx={{ minWidth: 32, height: 32 }}
          >
            <LastPageIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

/**
 * SimplePagination - Minimal pagination with just prev/next
 */
export interface SimplePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  variant?: 'plain' | 'outlined' | 'soft' | 'solid';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  sx?: object;
}

export function SimplePagination({
  page,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  sx,
}: SimplePaginationProps) {
  const theme = useTheme();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        ...sx,
      }}
    >
      <IconButton
        variant={variant}
        color="neutral"
        size={size}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        sx={{ minWidth: 32, height: 32 }}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>

      {showPageNumbers && (
        <>
          <Typography level="body-sm" sx={{ color: 'text.secondary', mx: 1 }}>
            Page {page} of {totalPages}
          </Typography>
        </>
      )}

      <IconButton
        variant={variant}
        color="neutral"
        size={size}
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        sx={{ minWidth: 32, height: 32 }}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

/**
 * LoadMorePagination - Load more button style pagination
 */
export interface LoadMorePaginationProps {
  hasMore: boolean;
  loading?: boolean;
  onLoadMore: () => void;
  label?: string;
  loadingLabel?: string;
  variant?: 'plain' | 'outlined' | 'soft' | 'solid';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  sx?: object;
}

export function LoadMorePagination({
  hasMore,
  loading = false,
  onLoadMore,
  label = 'Load More',
  loadingLabel = 'Loading...',
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  sx,
}: LoadMorePaginationProps) {
  if (!hasMore) {
    return (
      <Box sx={{ textAlign: 'center', py: 2, ...sx }}>
        <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
          No more items to load
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', py: 2, ...sx }}>
      <IconButton
        variant={variant}
        color={color}
        size={size}
        disabled={loading}
        onClick={onLoadMore}
        sx={{
          px: 3,
          py: 1,
          borderRadius: 'sm',
        }}
      >
        {loading ? loadingLabel : label}
      </IconButton>
    </Box>
  );
}

export default Pagination;
