import { format, parseISO, formatDistanceToNow, isToday, isYesterday, isThisWeek, isThisYear } from 'date-fns';
function DateDisplay(dateTimeString) {
    try {
        const date = parseISO(dateTimeString+'Z');
        const formattedDate = format(date, 'yyyy-MM-dd');
        return formattedDate;
    } catch {
        return "";
    }
}
function formatDistanceToUTCNow(dateStr, obj) {
    try {
        return formatDistanceToNow(dateStr + 'Z', obj);
    }
    catch {
        return null;
    }
}
const formatDate = (dateString) => {
    const date = new Date(dateString+'Z');

    if (isToday(date)) {
        return format(date, 'HH:mm'); // e.g., "21:40"
    } else if (isYesterday(date)) {
        return 'Yesterday';
    } else if (isThisWeek(date)) {
        return format(date, 'EEE'); // e.g., "Thursday"
    } else if (isThisYear(date)) {
        return format(date, 'd MMM'); // e.g., "7 November"
    } else {
        return format(date, 'd MMM yyyy'); // e.g., "7 November 2023"
    }
};
export { DateDisplay, formatDistanceToUTCNow, formatDate }
