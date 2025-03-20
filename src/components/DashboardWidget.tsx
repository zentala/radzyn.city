'use client';

import React, { ReactNode } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardActions,
  IconButton,
  Tooltip,
  Skeleton,
  Box,
  Typography,
  Divider
} from '@mui/material';
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

export default function DashboardWidget({
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
}: DashboardWidgetProps) {
  return (
    <Card 
      sx={{ 
        height: height, 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'box-shadow 0.3s, transform 0.3s',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-4px)'
        }
      }}
    >
      {title && (
        <>
          <CardHeader
            title={
              <Typography variant="h6" component="h3" fontWeight="medium">
                {title}
              </Typography>
            }
            subheader={subtitle}
            action={
              headerAction || (
                <Box>
                  {onRefresh && (
                    <Tooltip title="Odśwież">
                      <IconButton 
                        size="small" 
                        onClick={onRefresh}
                        disabled={loading}
                      >
                        <RefreshIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Więcej opcji">
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )
            }
            sx={{ pb: noHeaderDivider ? 1 : 0 }}
          />
          {!noHeaderDivider && <Divider />}
        </>
      )}
      
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: noPadding ? 0 : undefined,
          '&:last-child': { pb: noPadding ? 0 : undefined }
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
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            {actions}
          </CardActions>
        </>
      )}
    </Card>
  );
}