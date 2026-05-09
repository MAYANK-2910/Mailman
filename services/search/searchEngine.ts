import type { Email } from '../../types/email';

export interface SearchOptions {
  query: string;
  fields: Array<'sender' | 'subject' | 'snippet' | 'category'>;
  maxResults: number;
}

export function searchEmails(
  emails: Email[],
  query: string,
  maxResults: number = 50
): Email[] {
  if (!query.trim()) return [];

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const scored = emails
    .map((email) => {
      let score = 0;

      for (const term of terms) {
        if (email.sender.name.toLowerCase().includes(term)) score += 10;
        if (email.sender.email.toLowerCase().includes(term)) score += 10;
        if (email.subject.toLowerCase().includes(term)) score += 8;
        if (email.category.toLowerCase().includes(term)) score += 6;
        if (email.snippet.toLowerCase().includes(term)) score += 4;
      }

      if (email.isUnread) score += 2;

      return { email, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

  return scored.map((item) => item.email);
}

export function highlightMatch(text: string, query: string): Array<{ text: string; highlighted: boolean }> {
  if (!query.trim()) return [{ text, highlighted: false }];

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const regex = new RegExp(`(${terms.map(escapeRegex).join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      highlighted: terms.some((term) => part.toLowerCase() === term),
    }));
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
