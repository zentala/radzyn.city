export const months = {
  pl: [
    'stycznia',
    'lutego',
    'marca',
    'kwietnia',
    'maja',
    'czerwca',
    'lipca',
    'sierpnia',
    'września',
    'października',
    'listopada',
    'grudnia'
  ],
  plNames: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień'
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
};

export function formatPolishDate(date: Date): string {
  const day = date.getDate();
  const month = months.pl[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

export function parsePolishDate(dateStr: string): Date | null {
  try {
    // For formats like "15 maja 2025"
    const parts = dateStr.split(' ');
    
    if (parts.length < 3) return null;
    
    const day = parseInt(parts[0], 10);
    let month = -1;
    
    for (let i = 0; i < months.pl.length; i++) {
      if (months.pl[i] === parts[1]) {
        month = i;
        break;
      }
    }
    
    if (month === -1) return null;
    
    const year = parseInt(parts[2], 10);
    
    return new Date(year, month, day);
  } catch (e) {
    return null;
  }
}