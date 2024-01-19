import {
    format,
    formatRelative,
    isToday,
    isYesterday,
    parseISO,
  } from "date-fns";
  import { az } from "date-fns/locale";
  
  export const convertDate = (date) => {
    if (date) {
      const jsDate = parseISO(date);
      return format(jsDate, "dd/MM/yyyy", { locale: az });
    }
  };
  
  export const convertDateTime = (date) => {
    if (date) {
      const jsDate = parseISO(date);
      return format(jsDate, "MM/dd/yyyy p", { locale: az });
    }
    return "Etibarsız tarix";
  };
  
  export const convertDateTimeAgo = (date) => {
    if (date) {
      const jsDate = new Date(date);
      if (isYesterday(jsDate) || isToday(jsDate)) {
        return formatRelative(jsDate, new Date(), {
          locale: az,
        });
      } else {
        return format(jsDate, "dd MMM yyyy p", { locale: az });
      }
    }
  
    return "Etibarsız tarix";
  };