import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  callback: (e: KeyboardEvent) => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const ctrlOrMeta = shortcut.ctrlKey || shortcut.metaKey;
        const matchesModifier = ctrlOrMeta
          ? (e.ctrlKey || e.metaKey)
          : true;
        const matchesShift = shortcut.shiftKey ? e.shiftKey : !e.shiftKey;
        const matchesKey = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (matchesKey && matchesModifier && matchesShift) {
          e.preventDefault();
          shortcut.callback(e);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

export function getShortcutDisplay(shortcut: ShortcutConfig): string {
  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const parts: string[] = [];

  if (shortcut.ctrlKey || shortcut.metaKey) {
    parts.push(isMac ? '⌘' : 'Ctrl');
  }
  if (shortcut.shiftKey) {
    parts.push('Shift');
  }
  parts.push(shortcut.key.toUpperCase());

  return parts.join('+');
}
