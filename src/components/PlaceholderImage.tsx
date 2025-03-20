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
    // Placeholder SVG-like design created with divs
    return (
      <div 
        className={`relative flex items-center justify-center overflow-hidden ${className}`}
        style={{ 
          width: finalWidth, 
          height: finalHeight, 
          backgroundColor: bgColor,
          borderRadius: '0.375rem'
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          {/* Grid pattern for background */}
          <div className="grid grid-cols-4 grid-rows-3 h-full w-full">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="border border-gray-300/20"></div>
            ))}
          </div>
        </div>
        
        <div className="text-center z-10 px-4">
          <span className="text-xl md:text-2xl font-medium text-gray-800">{title}</span>
          <div className="text-sm text-gray-600 mt-2">Placeholder Image</div>
        </div>
      </div>
    );
  }
  
  // Render actual image if src is provided and there's no error
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width: finalWidth, height: finalHeight }}>
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