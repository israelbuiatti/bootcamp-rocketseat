import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const formatDate = (date: Date, formatString: string = 'dd/MM/yyyy'): string => {
  return format(parseISO(date.toString()), formatString, { locale: ptBR });
};

export default formatDate;
