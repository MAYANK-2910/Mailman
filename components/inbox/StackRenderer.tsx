import React from 'react';
import { StackData } from '../../types/email';
import { ThreadRow } from './ThreadRow';
import { useUIStore } from '../../state/ui/uiStore';
import { cn } from '../../utils/cn';

interface StackRendererProps {
  stack: StackData;
}

export const StackRenderer: React.FC<StackRendererProps> = ({ stack }) => {
  const { expandedStacks, toggleStack } = useUIStore();
  const isExpanded = expandedStacks.has(stack.id);

  return (
    <div className="border-b border-border bg-bg-primary">
      <div 
        className={cn(
          "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-bg-hover transition-colors group",
          isExpanded && "bg-bg-secondary/50"
        )}
        onClick={() => toggleStack(stack.id)}
      >
        <span className={cn(
          "material-symbols-outlined text-text-muted transition-transform duration-200",
          isExpanded && "rotate-90"
        )}>
          chevron_right
        </span>
        <span className="material-symbols-outlined text-accent text-[20px]">
          {stack.icon || 'folder'}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-text-primary truncate">
              {stack.name}
            </h3>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
              {stack.count}
            </span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-bg-secondary/30">
          {stack.emails.map(email => (
            <ThreadRow key={email.id} email={email} />
          ))}
        </div>
      )}
    </div>
  );
};
