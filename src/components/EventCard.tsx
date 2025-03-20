"use client";

import { useState } from 'react';
import PlaceholderImage from './PlaceholderImage';

interface EventProps {
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  imageUrl?: string;
}

// Function to format date for calendar
const formatDateForCalendar = (dateStr: string) => {
  // Handle date ranges like "24-26 czerwca 2025"
  const isRange = dateStr.includes('-');
  
  // Simple Polish to English month translation for the calendar
  const monthsMapping: Record<string, string> = {
    'stycznia': 'January',
    'lutego': 'February', 
    'marca': 'March',
    'kwietnia': 'April',
    'maja': 'May',
    'czerwca': 'June',
    'lipca': 'July',
    'sierpnia': 'August',
    'września': 'September',
    'października': 'October',
    'listopada': 'November',
    'grudnia': 'December'
  };
  
  const formatPolishDate = (input: string) => {
    let day, month, year;
    
    // Extract components from date string
    for (const [pl, en] of Object.entries(monthsMapping)) {
      if (input.includes(pl)) {
        const parts = input.split(' ');
        day = parts[0];
        month = en;
        year = parts[2];
        break;
      }
    }
    
    // Default fallback in case parsing fails
    if (!day || !month || !year) {
      return new Date().toISOString().split('T')[0];
    }
    
    // Return ISO format
    const date = new Date(`${month} ${day}, ${year}`);
    return date.toISOString().split('T')[0];
  };
  
  if (isRange) {
    const [startDate, endDate] = dateStr.split('-');
    // For ranges like "24-26 czerwca 2025", we need to handle specially
    if (!endDate.includes(' ')) {
      // It's a day range in the same month
      const parts = startDate.split(' ');
      const fullEndDate = `${endDate.trim()} ${parts.slice(1).join(' ')}`;
      return {
        start: formatPolishDate(startDate.trim()),
        end: formatPolishDate(fullEndDate)
      };
    } else {
      // Full date range
      return {
        start: formatPolishDate(startDate.trim()),
        end: formatPolishDate(endDate.trim())
      };
    }
  } else {
    // Single date
    return {
      start: formatPolishDate(dateStr),
      end: formatPolishDate(dateStr)
    };
  }
};

const generateGoogleCalendarLink = (event: EventProps) => {
  const { title, location, description } = event;
  const dates = formatDateForCalendar(event.date);
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${dates.start.replace(/-/g, '')}/${dates.end.replace(/-/g, '')}`,
    details: description,
    location: location,
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Helper function to determine category badge color
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'kulturalne':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'sportowe':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'edukacyjne':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'biznesowe':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function EventCard({ title, date, location, description, category, imageUrl }: EventProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  // Generate calendar links
  const googleCalendarLink = generateGoogleCalendarLink({ title, date, location, description, category });
  
  // Category badge styling
  const categoryColorClass = getCategoryColor(category);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 relative">
        <PlaceholderImage
          title={title}
          src={imageUrl}
          className="w-full h-full"
          height={192}
          aspectRatio="landscape"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded border ${categoryColorClass}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        
        <div className="flex items-center mb-3 text-sm">
          <span className="inline-flex items-center text-primary">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {date}
          </span>
        </div>
        
        <p className="text-gray-600 mb-3 flex items-start">
          <svg className="w-4 h-4 mr-1.5 mt-1 flex-shrink-0 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{location}</span>
        </p>
        
        <p className="text-gray-700 mb-4">{description}</p>
        
        <div className="flex justify-between items-center pt-3 border-t">
          <a 
            href="#"
            className="text-primary hover:text-primary-dark font-medium text-sm"
            onClick={(e) => e.preventDefault()}
          >
            Więcej szczegółów
          </a>
          
          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown();
              }}
              className="px-3 py-1.5 bg-primary/10 text-primary rounded text-sm font-medium hover:bg-primary/20 transition flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              Dodaj do kalendarza
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 bottom-full mb-2 z-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <a
                    href={googleCalendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <svg className="w-5 h-5 mr-2 text-gray-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.5 6h-19c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h19c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 14h-17V8h17v12z" />
                      <path d="M9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm4-6h-2v2h2V4zm0 4h-2v2h2V8zm0 4h-2v2h2v-2zM5 16H3v2h2v-2zm4 0H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                    </svg>
                    Google Calendar
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Pobieranie pliku .ics zostanie zaimplementowane w przyszłej wersji');
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Pobierz plik .ics
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}