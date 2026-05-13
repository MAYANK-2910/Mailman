import React from 'react';
import { motion } from 'framer-motion';
import { Email } from '../../types/email';

interface TriageModeProps {
  email: Email;
  onAction: (action: 'archive' | 'keep' | 'delete') => void;
}

export const TriageMode: React.FC<TriageModeProps> = ({ email, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <motion.div 
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 100) onAction('keep');
          if (info.offset.x < -100) onAction('archive');
        }}
        className="w-full max-w-md bg-bg-secondary p-6 rounded-3xl shadow-xl border border-border cursor-grab active:cursor-grabbing"
      >
        <div className="text-xs text-accent font-medium mb-2">Triage Mode</div>
        <h3 className="text-lg font-bold text-text-primary mb-1">{email.subject}</h3>
        <div className="text-sm text-text-secondary mb-4">{email.from.name}</div>
        <p className="text-sm text-text-muted leading-relaxed">{email.snippet}</p>
        
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
          <span className="text-[10px] text-text-muted">← Swipe Left to Archive</span>
          <span className="text-[10px] text-text-muted">Swipe Right to Keep →</span>
        </div>
      </motion.div>
    </div>
  );
};
