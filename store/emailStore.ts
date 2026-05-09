import { create } from 'zustand';
import type { Email } from '../types/email';
import type { Stack, SenderGroup } from '../types/stack';

interface EmailStore {
  emails: Email[];
  stacks: Stack[];
  senderGroups: SenderGroup[];
  selectedEmail: Email | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  setEmails: (emails: Email[]) => void;
  setLoading: (loading: boolean) => void;
}
