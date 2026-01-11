'use client';

import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Sheet,
  Table,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Chip,
  Modal,
  ModalDialog,
  ModalClose,
  Input,
  FormLabel,
  Switch,
  Snackbar,
} from '@mui/joy';
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
    <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 'lg', mx: 'auto', width: '100%' }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography level="h2">
          News Scraper Configuration
        </Typography>

        <Box>
          <Button
            variant="outlined"
            startDecorator={<RefreshIcon />}
            onClick={loadScraperConfigs}
            sx={{ mr: 2 }}
          >
            Refresh
          </Button>

          <Button
            variant="solid"
            startDecorator={<AddIcon />}
            onClick={handleCreate}
          >
            Add New Source
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert color="danger" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Sheet variant="outlined" sx={{ boxShadow: 'md' }}>
          <Table
            stripe="odd"
            hoverRow
            sx={{
              '& thead th': {
                bgcolor: 'background.level1',
                fontWeight: 'bold',
              },
            }}
          >
            <thead>
              <tr>
                <th>Source Name</th>
                <th>URL</th>
                <th>Interval (mins)</th>
                <th>Settings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scraperConfigs.map((config) => (
                <tr key={config.sourceName}>
                  <td>
                    <Typography level="body-sm">{config.sourceName}</Typography>
                  </td>
                  <td>
                    <Typography level="body-sm" sx={{
                      maxWidth: 250,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {config.sourceUrl}
                    </Typography>
                  </td>
                  <td>{config.scrapeInterval}</td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {config.usePuppeteer && (
                        <Chip size="sm" label="Puppeteer" color="primary" variant="outlined" />
                      )}
                      {config.followLinks && (
                        <Chip size="sm" label="Follow Links" color="info" variant="outlined" />
                      )}
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="sm"
                        variant="outlined"
                        color="primary"
                        startDecorator={runningScrapers.has(config.sourceName) ? <CircularProgress size="sm" /> : <PlayArrowIcon />}
                        onClick={() => handleRunScraper(config.sourceName)}
                        disabled={runningScrapers.has(config.sourceName)}
                      >
                        Run
                      </Button>
                      <Button
                        size="sm"
                        variant="outlined"
                        startDecorator={<EditIcon />}
                        onClick={() => handleEdit(config)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outlined"
                        color="danger"
                        startDecorator={<DeleteIcon />}
                        onClick={() => handleDelete(config)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </td>
                </tr>
              ))}
              {scraperConfigs.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>
                    <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                      No scraper configurations found
                    </Typography>
                    <Button
                      variant="plain"
                      startDecorator={<AddIcon />}
                      onClick={handleCreate}
                      sx={{ mt: 1 }}
                    >
                      Add your first source
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Sheet>
      )}

      {/* Edit/Create Dialog */}
      <Modal open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <ModalDialog>
          <Typography level="h3" sx={{ mb: 2 }}>
            {selectedConfig?.sourceName ? `Edit Scraper: ${selectedConfig.sourceName}` : 'Add New Scraper Source'}
          </Typography>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Input
                label="Source Name"
                value={selectedConfig?.sourceName || ''}
                onChange={(e) => setSelectedConfig({...selectedConfig, sourceName: e.target.value})}
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input
                label="Source URL"
                value={selectedConfig?.sourceUrl || ''}
                onChange={(e) => setSelectedConfig({...selectedConfig, sourceUrl: e.target.value})}
                fullWidth
                required
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input
                label="Scrape Interval (minutes)"
                value={selectedConfig?.scrapeInterval || 60}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig,
                  scrapeInterval: parseInt(e.target.value) || 60
                })}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <FormLabel
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
                <FormLabel
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

            <Grid xs={12}>
              <Typography level="title-md" sx={{ mb: 2 }}>
                CSS Selectors
              </Typography>
            </Grid>

            <Grid xs={12} md={6}>
              <Input
                label="Articles Selector"
                value={selectedConfig?.selectors?.articles || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig,
                  selectors: {...selectedConfig?.selectors, articles: e.target.value}
                })}
                fullWidth
                required
                helperText="CSS selector for article elements (e.g., '.news-item')"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input
                label="Title Selector"
                value={selectedConfig?.selectors?.title || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig,
                  selectors: {...selectedConfig?.selectors, title: e.target.value}
                })}
                fullWidth
                required
                helperText="CSS selector for article title (e.g., '.news-title')"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input
                label="Content Selector"
                value={selectedConfig?.selectors?.content || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig,
                  selectors: {...selectedConfig?.selectors, content: e.target.value}
                })}
                fullWidth
                required
                helperText="CSS selector for article content (e.g., '.news-content')"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input
                label="Date Selector"
                value={selectedConfig?.selectors?.date || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig,
                  selectors: {...selectedConfig?.selectors, date: e.target.value}
                })}
                fullWidth
                required
                helperText="CSS selector for article date (e.g., '.news-date')"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input
                label="Image Selector"
                value={selectedConfig?.selectors?.image || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig,
                  selectors: {...selectedConfig?.selectors, image: e.target.value}
                })}
                fullWidth
                helperText="CSS selector for article image (e.g., '.news-image img')"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <Input
                label="Link Selector"
                value={selectedConfig?.selectors?.link || ''}
                onChange={(e) => setSelectedConfig({
                  ...selectedConfig,
                  selectors: {...selectedConfig?.selectors, link: e.target.value}
                })}
                fullWidth
                helperText="CSS selector for article link (e.g., '.news-title a')"
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button variant="plain" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="solid">Save</Button>
          </Box>
        </ModalDialog>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Modal open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <ModalDialog>
          <Typography level="h3" sx={{ mb: 2 }}>
            Confirm Deletion
          </Typography>
          <Typography level="body-md" sx={{ mb: 2 }}>
            Are you sure you want to delete the scraper configuration for "{selectedConfig?.sourceName}"?
            This action cannot be undone.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="plain" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="danger" variant="solid">
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        color="success"
        variant="soft"
      >
        {snackbarMessage}
      </Snackbar>
    </Box>
  );
}
