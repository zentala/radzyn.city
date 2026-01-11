"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Skeleton, Box } from '@mui/joy';

interface PlaceholderImageProps {
  title: string;
  alt?: string;
  src?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: "square" | "landscape" | "portrait"; // Options for different aspect ratios
  sx?: object; // Added MUI sx prop for styling customization
}

export default function PlaceholderImage({
  title,
  alt,
  src,
  width = 800,
  height = 400,
  aspectRatio = "landscape",
  sx = {}
}: PlaceholderImageProps) {
  const [isError, setIsError] = useState(false);
  
  // If no src provided or there was an error loading the image, display placeholder
  const showPlaceholder = !src || isError;
  
  // Adjust dimensions based on aspectRatio
  let finalWidth = width;
  let finalHeight = height;
  
  if (aspectRatio === "square" && typeof width === 'number') {
    finalHeight = width;
  } else if (aspectRatio === "portrait" && typeof height === 'number') {
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
  
  // Base box styling for all variants
  const baseBoxSx = {
    position: 'relative', 
    overflow: 'hidden',
    borderRadius: 1,
    width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
    height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
    ...sx
  };
  
  if (showPlaceholder) {
    // Check if we have specific SVG for this title (for public images)
    let specificSvgPath = '';
    
    if (title === 'Pałac Potockich') {
      specificSvgPath = '/images/palac-potockich.svg';
    } else if (title === 'Kościół Świętej Trójcy') {
      specificSvgPath = '/images/kosciol.svg';
    }
    
    // If we have a specific SVG, use it
    if (specificSvgPath) {
      return (
        <Box sx={baseBoxSx}>
          <Image
            src={specificSvgPath}
            alt={title}
            width={typeof finalWidth === 'number' ? finalWidth : 800}
            height={typeof finalHeight === 'number' ? finalHeight : 400}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </Box>
      );
    }
    
    // Otherwise, use MUI Skeleton with title overlay
    return (
      <Box sx={baseBoxSx}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
          sx={{ bgcolor: bgColor }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '80%',
            color: 'text.secondary',
            typography: 'subtitle1'
          }}
        >
          {title}
        </Box>
      </Box>
    );
  }
  
  // Render actual image if src is provided and there's no error
  return (
    <Box sx={baseBoxSx}>
      <Image
        src={src}
        alt={alt || title}
        width={typeof finalWidth === 'number' ? finalWidth : 800}
        height={typeof finalHeight === 'number' ? finalHeight : 400}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        onError={() => setIsError(true)}
      />
    </Box>
  );
}