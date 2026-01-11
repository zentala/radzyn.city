"use client";

import { useState, FormEvent } from 'react';
import {
  Input, Textarea, Button, Box, Sheet, Typography, Stack,
  Alert, CircularProgress, FormHelperText, FormControl, FormLabel
} from '@mui/joy';
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
      <Sheet
        variant="outlined"
        sx={{
          p: 4,
          borderRadius: 'md',
          boxShadow: 'sm',
          bgcolor: 'background.surface'
        }}
      >
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
              bgcolor: 'success.100',
              color: 'success.600'
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography level="h2" sx={{ mb: 1, fontWeight: 'lg' }}>
            Dziękujemy za Twoją wiadomość!
          </Typography>
          <Typography level="body-lg" sx={{ color: 'text.secondary', mb: 3 }}>
            Twoja wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.
          </Typography>
          <Button
            size="lg"
            variant="solid"
            color="primary"
            onClick={() => setFormStatus('idle')}
            sx={{ px: 4, py: 1.5 }}
          >
            Wyślij kolejną wiadomość
          </Button>
        </Box>
      </Sheet>
    );
  }
  
  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: 'md',
        boxShadow: 'sm',
        bgcolor: 'background.surface'
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={2.5}>
          <FormControl error={Boolean(touched.name && errors.name)}>
            <FormLabel required>Imię i nazwisko</FormLabel>
            <Input
              id="name"
              size="lg"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={(e) => handleBlur('name', e.target.value)}
            />
            {touched.name && errors.name && (
              <FormHelperText>{errors.name}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={Boolean(touched.email && errors.email)}>
            <FormLabel required>Adres e-mail</FormLabel>
            <Input
              id="email"
              type="email"
              size="lg"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
            />
            {touched.email && errors.email && (
              <FormHelperText>{errors.email}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={Boolean(touched.subject && errors.subject)}>
            <FormLabel required>Temat</FormLabel>
            <Input
              id="subject"
              size="lg"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              onBlur={(e) => handleBlur('subject', e.target.value)}
            />
            {touched.subject && errors.subject && (
              <FormHelperText>{errors.subject}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={Boolean(touched.message && errors.message)}>
            <FormLabel required>Wiadomość</FormLabel>
            <Textarea
              id="message"
              size="lg"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={(e) => handleBlur('message', e.target.value)}
              minRows={5}
            />
            {touched.message && errors.message && (
              <FormHelperText>{errors.message}</FormHelperText>
            )}
          </FormControl>

          <Box sx={{ pt: 1 }}>
            <Button
              type="submit"
              size="lg"
              variant="solid"
              color="primary"
              disabled={isSubmitting}
              startDecorator={isSubmitting ? <CircularProgress size="sm" /> : null}
              sx={{ px: 4, py: 1.5, fontWeight: 'lg' }}
            >
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
            </Button>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
              Pola oznaczone gwiazdką (*) są wymagane.
            </Typography>
            <Typography level="body-sm" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Twoje dane osobowe będą przetwarzane zgodnie z naszą polityką prywatności.
            </Typography>
          </Box>

          {formStatus === 'error' && (
            <Alert color="danger" sx={{ mt: 2 }}>
              Przepraszamy, wystąpił błąd podczas wysyłania wiadomości. Prosimy spróbować ponownie później.
            </Alert>
          )}
        </Stack>
      </form>
    </Sheet>
  );
}