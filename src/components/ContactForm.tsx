"use client";

import { useState, FormEvent, ChangeEvent } from 'react';

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
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
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
  
  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
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
    setTimeout(() => {
      // For demo, just simulate a successful submission
      console.log('Form data submitted:', formData);
      setFormStatus('success');
      setIsSubmitting(false);
      
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
    }, 1500);
  };
  
  if (formStatus === 'success') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-100">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Dziękujemy za Twoją wiadomość!</h3>
          <p className="text-gray-600 mb-4">
            Twoja wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.
          </p>
          <button 
            onClick={() => setFormStatus('idle')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
          >
            Wyślij kolejną wiadomość
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Imię i nazwisko <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'
            }`}
            required
          />
          {errors.name && touched.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Adres e-mail <span className="text-red-500">*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'
            }`}
            required
          />
          {errors.email && touched.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Temat <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'
            }`}
            required
          />
          {errors.subject && touched.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Wiadomość <span className="text-red-500">*</span>
          </label>
          <textarea 
            id="message" 
            name="message" 
            rows={5} 
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded ${
              errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'
            }`}
            required
          ></textarea>
          {errors.message && touched.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>
        
        <div>
          <button 
            type="submit" 
            className={`px-6 py-2 bg-primary text-white rounded hover:bg-primary/80 transition flex items-center ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Wysyłanie...
              </>
            ) : (
              'Wyślij wiadomość'
            )}
          </button>
        </div>
        
        <div className="text-xs text-gray-500 mt-4">
          <p>Pola oznaczone gwiazdką (<span className="text-red-500">*</span>) są wymagane.</p>
          <p className="mt-1">
            Twoje dane osobowe będą przetwarzane zgodnie z naszą polityką prywatności.
          </p>
        </div>
        
        {formStatus === 'error' && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>Przepraszamy, wystąpił błąd podczas wysyłania wiadomości. Prosimy spróbować ponownie później.</p>
          </div>
        )}
      </form>
    </div>
  );
}