import type { Email } from '../../types/email';
import type { SenderGroup } from '../../types/stack';

export function groupBySender(emails: Email[]): SenderGroup[] {
  const grouped = new Map<string, Email[]>();

  for (const email of emails) {
    const key = email.sender.email.toLowerCase();
    const existing = grouped.get(key) ?? [];
    existing.push(email);
    grouped.set(key, existing);
  }

  const senderGroups: SenderGroup[] = [];

  for (const [senderEmail, senderEmails] of grouped) {
    const sorted = [...senderEmails].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    const latest = sorted[0];
    if (!latest) continue;

    const unreadCount = sorted.filter((e) => e.isUnread).length;

    senderGroups.push({
      id: `sender-${senderEmail}`,
      sender: latest.sender,
      emails: sorted,
      unreadCount,
      totalCount: sorted.length,
      lastMessageDate: latest.date,
      latestSnippet: latest.snippet,
      latestSubject: latest.subject,
      isExpanded: false,
    });
  }

  return senderGroups.sort((a, b) => {
    if (a.unreadCount !== b.unreadCount) {
      return b.unreadCount - a.unreadCount;
    }
    return b.lastMessageDate.getTime() - a.lastMessageDate.getTime();
  });
}
