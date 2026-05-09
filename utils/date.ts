import {
  formatDistanceToNow,
  isToday,
  isYesterday,
  isThisWeek,
  format,
} from 'date-fns';

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 60000) return 'Just now';
  if (diffMs < 3600000) return formatDistanceToNow(date, { addSuffix: false }) + ' ago';

  if (isToday(date)) {
    return format(date, 'h:mm a');
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  if (isThisWeek(date)) {
    return format(date, 'EEEE');
  }

  if (date.getFullYear() === now.getFullYear()) {
    return format(date, 'MMM d');
  }

  return format(date, 'MMM d, yyyy');
}

export function formatFullDate(date: Date): string {
  return format(date, 'EEEE, MMMM d, yyyy \'at\' h:mm a');
}
