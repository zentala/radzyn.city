"use client";

import Image from 'next/image';
import { useState } from 'react';

interface PlaceholderImageProps {
  title: string;
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: "square" | "landscape" | "portrait"; // Options for different aspect ratios
}

export default function PlaceholderImage({
  title,
  alt,
  src,
  width = 800,
  height = 400,
  className = "",
  aspectRatio = "landscape"
}: PlaceholderImageProps) {
  const [isError, setIsError] = useState(false);
  
  // If no src provided or there was an error loading the image, display placeholder
  const showPlaceholder = !src || isError;
  
  // Adjust dimensions based on aspectRatio
  let finalWidth = width;
  let finalHeight = height;
  
  if (aspectRatio === "square") {
    finalHeight = width;
  } else if (aspectRatio === "portrait") {
    finalWidth = height / 1.5;
  }
  
  // Generate a background color based on the title (for visual variety)
  const generateColor = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate a pastel color
    const h = hash % 360;
    return `hsl(${h}, 70%, 85%)`;
  };
  
  const bgColor = generateColor(title);
  
  if (showPlaceholder) {
    // Check if we have specific SVG for this title (for public images)
    // Convert title to a potential file name in the public directory
    const safeTitle = title.toLowerCase().replace(/\s+/g, '-');
    let specificSvgPath = '';
    
    if (title === 'Pałac Potockich') {
      specificSvgPath = '/images/palac-potockich.svg';
    } else if (title === 'Kościół Świętej Trójcy') {
      specificSvgPath = '/images/kosciol.svg';
    }
    
    // If we have a specific SVG, use it
    if (specificSvgPath) {
      return (
        <div className={`relative overflow-hidden ${className}`}>
          <Image
            src={specificSvgPath}
            alt={title}
            width={finalWidth}
            height={finalHeight}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      );
    }
    
    // Otherwise, use SVG placeholder
    return (
      <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
        <svg 
          width={finalWidth} 
          height={finalHeight} 
          viewBox={`0 0 ${finalWidth} ${finalHeight}`}
          className="w-full h-full"
          style={{ backgroundColor: bgColor }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100%" height="100%" fill={bgColor} />
          <rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="10 5" />
          <text x="50%" y="50%" fontFamily="Arial" fontSize="24" fill="#555" textAnchor="middle">{title}</text>
        </svg>
      </div>
    );
  }
  
  // Render actual image if src is provided and there's no error
  return (
    <div className={`relative overflow-hidden ${className}`} 
      style={{ width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth, height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight }}
    >
      <Image
        src={src}
        alt={alt || title}
        width={finalWidth}
        height={finalHeight}
        className="object-cover w-full h-full rounded-md"
        onError={() => setIsError(true)}
      />
    </div>
  );
}