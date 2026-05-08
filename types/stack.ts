import type { Email, EmailCategory, Sender } from './email';

export interface Stack {
  id: string;
  category: EmailCategory;
  label: string;
  icon: string;
  color: string;
  emails: Email[];
  unreadCount: number;
  totalCount: number;
  isCollapsed: boolean;
  lastUpdated: Date;
  priority: number;
}

export interface SenderGroup {
  id: string;
  sender: Sender;
  emails: Email[];
  unreadCount: number;
  totalCount: number;
  lastMessageDate: Date;
  latestSnippet: string;
  latestSubject: string;
  isExpanded: boolean;
}
