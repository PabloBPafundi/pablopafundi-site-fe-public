import i18n from 'i18next';

export const formatDateToMonthYear = (dateString: string, language?: string): string => {
    if (!dateString) return ''; 

    const [year, month, day] = dateString.split('-').map(Number);
  
    const date = new Date(Date.UTC(year, month, day));
  
    if (isNaN(date.getTime())) return ''; 

    const locale = language || i18n.language || 'es-ES';
  
    return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' })
      .format(date)
      .toUpperCase();
  };