import { Email } from '../../types/email';

export interface CleanupSuggestion {
  id: string;
  type: 'newsletter' | 'stale' | 'duplicate';
  reason: string;
  threads: string[];
}

class CleanupEngine {
  public analyze(emails: Email[]): CleanupSuggestion[] {
    const suggestions: CleanupSuggestion[] = [];

    // Simple stale thread detection (older than 30 days and unread)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const staleThreads = emails
      .filter(e => !e.isRead && e.date < thirtyDaysAgo)
      .map(e => e.id);

    if (staleThreads.length > 0) {
      suggestions.push({
        id: 'stale-unread',
        type: 'stale',
        reason: `${staleThreads.length} unread threads older than 30 days`,
        threads: staleThreads,
      });
    }

    return suggestions;
  }
}

export const cleanupEngine = new CleanupEngine();
