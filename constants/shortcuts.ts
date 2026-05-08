import type { KeyboardShortcut } from '../types/ui';

export const SHORTCUTS: KeyboardShortcut[] = [
  { key: 'j', modifiers: [], action: 'navigate-down', label: 'Next item' },
  { key: 'k', modifiers: [], action: 'navigate-up', label: 'Previous item' },
  { key: 'Enter', modifiers: [], action: 'open-email', label: 'Open email' },
  { key: 'Escape', modifiers: [], action: 'close-preview', label: 'Close preview' },
  { key: 'k', modifiers: ['meta'], action: 'toggle-search', label: 'Search' },
  { key: 'k', modifiers: ['ctrl'], action: 'toggle-search', label: 'Search' },
  { key: 'f', modifiers: [], action: 'toggle-focus', label: 'Toggle focus mode' },
  { key: 'e', modifiers: [], action: 'archive', label: 'Archive' },
  { key: 's', modifiers: [], action: 'star', label: 'Star/Unstar' },
  { key: 'r', modifiers: [], action: 'reply', label: 'Reply' },
  { key: '1', modifiers: [], action: 'view-stacks', label: 'Stack view' },
  { key: '2', modifiers: [], action: 'view-senders', label: 'Sender view' },
  { key: 't', modifiers: [], action: 'toggle-theme', label: 'Toggle theme' },
  { key: '/', modifiers: [], action: 'toggle-search', label: 'Search' },
  { key: '?', modifiers: ['shift'], action: 'show-shortcuts', label: 'Show shortcuts' },
];

export const SHORTCUT_MAP = new Map<string, KeyboardShortcut>(
  SHORTCUTS.map((s) => {
    const key = [...s.modifiers.sort(), s.key].join('+');
    return [key, s];
  })
);
