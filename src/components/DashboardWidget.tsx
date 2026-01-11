'use client';

import React, { ReactNode } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Skeleton,
  Box,
  Typography,
  Divider,
  Stack
} from '@mui/joy';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface DashboardWidgetProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  loading?: boolean;
  onRefresh?: () => void;
  actions?: ReactNode;
  height?: string | number;
  headerAction?: ReactNode;
  noPadding?: boolean;
  noHeaderDivider?: boolean;
}

export default function DashboardWidget(props: DashboardWidgetProps) {
  const {
    title,
    subtitle,
    children,
    loading = false,
    onRefresh,
    actions,
    height = 'auto',
    headerAction,
    noPadding = false,
    noHeaderDivider = false
  } = props || {};
  return (
    <Card
      sx={{
        height: height,
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s, transform 0.3s',
        '&:hover': {
          boxShadow: 'md',
          transform: 'translateY(-4px)'
        }
      }}
    >
      {title && (
        <>
          <Box sx={{ p: 2, pb: noHeaderDivider ? 2 : 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography level="h4" component="h3" sx={{ fontWeight: 'medium' }}>
                  {title}
                </Typography>
                {subtitle && (
                  <Typography level="body-sm" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    {subtitle}
                  </Typography>
                )}
              </Box>
              <Box>
                {headerAction || (
                  <Stack direction="row" spacing={0.5}>
                    {onRefresh && (
                      <Tooltip title="Odśwież">
                        <IconButton
                          size="sm"
                          onClick={onRefresh}
                          disabled={loading}
                        >
                          <RefreshIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Więcej opcji">
                      <IconButton size="sm">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                )}
              </Box>
            </Stack>
          </Box>
          {!noHeaderDivider && <Divider />}
        </>
      )}

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: noPadding ? 0 : 2,
        }}
      >
        {loading ? (
          <Box sx={{ p: noPadding ? 2 : 0 }}>
            <Skeleton variant="rectangular" width="100%" height={100} />
            <Skeleton variant="text" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </Box>
        ) : (
          children
        )}
      </CardContent>

      {actions && (
        <>
          <Divider />
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            {actions}
          </Box>
        </>
      )}
    </Card>
  );
}
