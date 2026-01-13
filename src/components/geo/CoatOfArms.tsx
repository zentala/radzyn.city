'use client';

import * as React from 'react';
import { Avatar, Box, Typography } from '@mui/joy';

export type CoatOfArmsEntityType =
  | 'country'
  | 'voivodeship'
  | 'powiat'
  | 'gmina'
  | 'city';

export type CoatOfArmsProps = {
  entityType: CoatOfArmsEntityType;
  /**
   * Stable identifier, not a display label (e.g. "gmina-borki", "miasto-radzyn-podlaski").
   */
  entityId: string;
  /**
   * Human-readable name used for accessibility (alt text + fallback initials).
   */
  label: string;
  /**
   * Pixel size of the badge.
   */
  size?: number;
};

/**
 * Local, explicit mapping. We do not rely on fuzzy matching by label because:
 * - diacritics and formatting vary ("Kąkolewnica" vs "Kakolewnica"),
 * - some names collide across entity types (powiat vs gmina vs city),
 * - file names are normalized for URL safety under /public/herby.
 */
const CREST_SRC: Record<string, string> = {
  // gminy
  'gmina:gmina-borki': '/herby/gmina-borki-coa.png',
  'gmina:gmina-czemierniki': '/herby/gmina-czemierniki-coa.svg',
  'gmina:gmina-kakolewnica': '/herby/gmina-kakolewnica-coa.svg',
  'gmina:gmina-komarowka-podlaska': '/herby/gmina-komarowka-podlaska-coa.svg',
  'gmina:gmina-radzyn-podlaski': '/herby/gmina-radzyn-podlaski-coa.png',
  'gmina:gmina-ulan-majorat': '/herby/gmina-ulan-majorat-coa.svg',
  'gmina:gmina-wohyn': '/herby/gmina-wohyn-coa.svg',

  // city
  'city:miasto-radzyn-podlaski': '/herby/miasto-radzyn-podlaski-coa.svg',

  // voivodeship
  'voivodeship:wojewodztwo-lubelskie': '/herby/wojewodztwo-lubelskie-coa.svg',
};

function getInitials(label: string) {
  const words = label
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const first = words[0]?.[0] ?? '';
  const second = words[1]?.[0] ?? words[0]?.[1] ?? '';
  return (first + second).toUpperCase();
}

export function CoatOfArms(props: CoatOfArmsProps) {
  const { entityType, entityId, label, size = 40 } = props;
  const key = `${entityType}:${entityId}`;
  const src = CREST_SRC[key];
  const [failed, setFailed] = React.useState(false);

  if (!src || failed) {
    return (
      <Avatar
        size="sm"
        sx={{
          width: size,
          height: size,
          borderRadius: 'md',
          bgcolor: 'background.level2',
          color: 'text.secondary',
          border: '1px solid',
          borderColor: 'divider',
          fontWeight: 700,
        }}
      >
        {getInitials(label)}
      </Avatar>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={`Herb: ${label}`}
      loading="lazy"
      onError={() => setFailed(true)}
      sx={{
        width: size,
        height: size,
        borderRadius: 'md',
        objectFit: 'contain',
        bgcolor: 'background.level1',
        border: '1px solid',
        borderColor: 'divider',
        p: 0.5,
        display: 'block',
      }}
    />
  );
}

export function CoatOfArmsHelpNote() {
  return (
    <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
      Herby: mock z lokalnych plików. Brak = placeholder.
    </Typography>
  );
}

