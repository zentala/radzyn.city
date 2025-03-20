'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Snackbar
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import { getScraperConfigs, updateScraperConfig, removeScraperConfig } from '@/services/scraperService';

export default function ScraperAdminPage() {
  const [scraperConfigs, setScraperConfigs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConfig, setSelectedConfig] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [runningScrapers, setRunningScrapers] = useState<Set<string>>(new Set());
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  // Load the scraper configurations
  const loadScraperConfigs = () => {
    try {
      setLoading(true);
      const configs = getScraperConfigs();
      setScraperConfigs(configs);
      setError(null);
    } catch (err) {
      console.error('Error loading scraper configurations:', err);
      setError('Failed to load scraper configurations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScraperConfigs();
  }, []);

  // Handle running a scraper
  const handleRunScraper = async (sourceName: string) => {
    try {
      setRunningScrapers(prev => new Set(prev).add(sourceName));
      
      const res = await fetch(`/api/scrape?source=${encodeURIComponent(sourceName)}`);
      
      if (!res.ok) {
        throw new Error(`Failed to run scraper: ${res.statusText}`);
      }
      
      const data = await res.json();
      
      setSnackbarMessage(`Successfully ran scraper for ${sourceName}`);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error running scraper:', err);
      setSnackbarMessage(`Error running scraper: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setSnackbarOpen(true);
    } finally {
      setRunningScrapers(prev => {
        const newSet = new Set(prev);
        newSet.delete(sourceName);
        return newSet;
      });
    }
  };

  // Handle editing a scraper configuration
  const handleEdit = (config: any) => {
    setSelectedConfig({...config});
    setDialogOpen(true);
  };

  // Handle creating a new scraper configuration
  const handleCreate = () => {
    setSelectedConfig({
      sourceName: '',
      sourceUrl: '',
      selectors: {
        articles: '',
        title: '',
        content: '',
        date: '',
        image: '',
        link: ''
      },
      scrapeInterval: 60,
      usePuppeteer: false,
      followLinks: true
    });
    setDialogOpen(true);
  };

  // Handle deleting a scraper configuration
  const handleDelete = (config: any) => {
    setSelectedConfig(config);
    setDeleteDialogOpen(true);
  };

  // Handle saving a scraper configuration
  const handleSave = () => {
    try {
      if (!selectedConfig.sourceName || !selectedConfig.sourceUrl) {
        setSnackbarMessage('Source name and URL are required');
        setSnackbarOpen(true);
        return;
      }
      
      updateScraperConfig(selectedConfig);
      
      setDialogOpen(false);
      loadScraperConfigs();
      
      setSnackbarMessage('Scraper configuration saved successfully');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error saving scraper configuration:', err);
      setSnackbarMessage(`Error saving configuration: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setSnackbarOpen(true);
    }
  };

  // Handle confirming deletion of a scraper configuration
  const handleConfirmDelete = () => {
    try {
      const result = removeScraperConfig(selectedConfig.sourceName);
      
      if (result) {
        setSnackbarMessage(`Scraper configuration for "${selectedConfig.sourceName}" deleted`);
      } else {
        setSnackbarMessage(`Could not find scraper configuration for "${selectedConfig.sourceName}"`);
      }
      
      setDeleteDialogOpen(false);
      loadScraperConfigs();
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error deleting scraper configuration:', err);
      setSnackbarMessage(`Error deleting configuration: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          News Scraper Configuration
        </Typography>
        
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            onClick={loadScraperConfigs}
            sx={{ mr: 2 }}
          >
            Refresh
          </Button>
          
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            Add New Source
          </Button>
        </Box>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Source Name</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Interval (mins)</TableCell>
                <TableCell>Settings</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scraperConfigs.map((config) => (
                <TableRow key={config.sourceName}>
                  <TableCell>
                    <Typography variant="subtitle2">{config.sourceName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" component="div" sx={{ 
                      maxWidth: 250, 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis' 
                    }}>
                      {config.sourceUrl}
                    </Typography>
                  </TableCell>
                  <TableCell>{config.scrapeInterval}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {config.usePuppeteer && (
                        <Chip size="small" label="Puppeteer" color="primary" variant="outlined" />
                      )}
                      {config.followLinks && (
                        <Chip size="small" label="Follow Links" color="info" variant="outlined" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="primary"
                        startIcon={runningScrapers.has(config.sourceName) ? <CircularProgress size={14} /> : <PlayArrowIcon />}
                        onClick={() => handleRunScraper(config.sourceName)}
                        disabled={runningScrapers.has(config.sourceName)}
                      >
                        Run
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(config)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(config)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {scraperConfigs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">
                      No scraper configurations found
                    </Typography>
                    <Button 
                      variant="text" 
                      startIcon={<AddIcon />} 
                      onClick={handleCreate}
                      sx={{ mt: 1 }}
                    >
                      Add your first source
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      {/* Edit/Create Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedConfig?.sourceName ? `Edit Scraper: ${selectedConfig.sourceName}` : 'Add New Scraper Source'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Source Name"
                value={selectedConfig?.sourceName || ''}
                onChange={(e) => setSelectedConfig({...selectedConfig, sourceName: e.target.value})}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Source URL"
                value={selectedConfig?.sourceUrl || ''}
                onChange={(e) => setSelectedConfig({...selectedConfig, sourceUrl: e.target.value})}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Scrape Interval (minutes)"
                value={selectedConfig?.scrapeInterval || 60}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig, 
                  scrapeInterval: parseInt(e.target.value) || 60
                })}
                fullWidth
                margin="normal"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedConfig?.usePuppeteer || false}
                      onChange={(e) => setSelectedConfig({
                        ...selectedConfig, 
                        usePuppeteer: e.target.checked
                      })}
                    />
                  }
                  label="Use Puppeteer"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedConfig?.followLinks || false}
                      onChange={(e) => setSelectedConfig({
                        ...selectedConfig, 
                        followLinks: e.target.checked
                      })}
                    />
                  }
                  label="Follow Links"
                />
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                CSS Selectors
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Articles Selector"
                value={selectedConfig?.selectors?.articles || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig, 
                  selectors: {...selectedConfig?.selectors, articles: e.target.value}
                })}
                fullWidth
                margin="normal"
                required
                helperText="CSS selector for article elements (e.g., '.news-item')"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title Selector"
                value={selectedConfig?.selectors?.title || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig, 
                  selectors: {...selectedConfig?.selectors, title: e.target.value}
                })}
                fullWidth
                margin="normal"
                required
                helperText="CSS selector for article title (e.g., '.news-title')"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Content Selector"
                value={selectedConfig?.selectors?.content || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig, 
                  selectors: {...selectedConfig?.selectors, content: e.target.value}
                })}
                fullWidth
                margin="normal"
                required
                helperText="CSS selector for article content (e.g., '.news-content')"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Date Selector"
                value={selectedConfig?.selectors?.date || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig, 
                  selectors: {...selectedConfig?.selectors, date: e.target.value}
                })}
                fullWidth
                margin="normal"
                required
                helperText="CSS selector for article date (e.g., '.news-date')"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Image Selector"
                value={selectedConfig?.selectors?.image || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig, 
                  selectors: {...selectedConfig?.selectors, image: e.target.value}
                })}
                fullWidth
                margin="normal"
                helperText="CSS selector for article image (e.g., '.news-image img')"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Link Selector"
                value={selectedConfig?.selectors?.link || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig, 
                  selectors: {...selectedConfig?.selectors, link: e.target.value}
                })}
                fullWidth
                margin="normal"
                helperText="CSS selector for article link (e.g., '.news-title a')"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the scraper configuration for &quot;{selectedConfig?.sourceName}&quot;?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
}