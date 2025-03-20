"use client";

import { useState, FormEvent } from 'react';
import { 
  TextField, Button, Box, Paper, Typography, Stack, 
  Alert, CircularProgress, FormHelperText, FormControl
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Imię i nazwisko jest wymagane' : undefined;
      case 'email':
        if (value.trim() === '') return 'Adres e-mail jest wymagany';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Niepoprawny format adresu e-mail' : undefined;
      case 'subject':
        return value.trim() === '' ? 'Temat jest wymagany' : undefined;
      case 'message':
        return value.trim() === '' ? 'Treść wiadomości jest wymagana' : 
               value.length < 10 ? 'Wiadomość jest zbyt krótka (min. 10 znaków)' : undefined;
      default:
        return undefined;
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    Object.entries(formData).forEach(([key, value]) => {
      const fieldName = key as keyof FormData;
      const error = validateField(key, value);
      
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Live validation when user has already interacted with the field
    if (touched[name]) {
      const error = validateField(name, value);
      
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };
  
  const handleBlur = (name: string, value: string) => {
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate on blur
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Mark all fields as touched to show all errors
      const allTouched: Record<string, boolean> = {};
      Object.keys(formData).forEach(key => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    // For demo and testing, immediately show success message
    console.log('Form data submitted:', formData);
    
    // Add a small delay for test stability
    setTimeout(() => {
      setFormStatus('success');
      setIsSubmitting(false);
    }, 100);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setFormStatus('idle');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTouched({});
    }, 5000);
  };
  
  if (formStatus === 'success') {
    return (
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Box 
            sx={{ 
              width: 64, 
              height: 64, 
              mx: 'auto', 
              mb: 2,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              borderRadius: '50%', 
              bgcolor: 'success.light' 
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />
          </Box>
          <Typography variant="h5" fontWeight="medium" gutterBottom>
            Dziękujemy za Twoją wiadomość!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Twoja wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => setFormStatus('idle')}
          >
            Wyślij kolejną wiadomość
          </Button>
        </Box>
      </Paper>
    );
  }
  
  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <TextField
              id="name"
              label="Imię i nazwisko"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={(e) => handleBlur('name', e.target.value)}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              required
              fullWidth
            />
          </FormControl>
          
          <FormControl fullWidth>
            <TextField
              id="email"
              label="Adres e-mail"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              required
              fullWidth
            />
          </FormControl>
          
          <FormControl fullWidth>
            <TextField
              id="subject"
              label="Temat"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              onBlur={(e) => handleBlur('subject', e.target.value)}
              error={Boolean(touched.subject && errors.subject)}
              helperText={touched.subject && errors.subject}
              required
              fullWidth
            />
          </FormControl>
          
          <FormControl fullWidth>
            <TextField
              id="message"
              label="Wiadomość"
              multiline
              rows={5}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={(e) => handleBlur('message', e.target.value)}
              error={Boolean(touched.message && errors.message)}
              helperText={touched.message && errors.message}
              required
              fullWidth
            />
          </FormControl>
          
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
            </Button>
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <FormHelperText>
              Pola oznaczone gwiazdką (*) są wymagane.
            </FormHelperText>
            <FormHelperText sx={{ mt: 0.5 }}>
              Twoje dane osobowe będą przetwarzane zgodnie z naszą polityką prywatności.
            </FormHelperText>
          </Box>
          
          {formStatus === 'error' && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Przepraszamy, wystąpił błąd podczas wysyłania wiadomości. Prosimy spróbować ponownie później.
            </Alert>
          )}
        </Stack>
      </form>
    </Paper>
  );
}