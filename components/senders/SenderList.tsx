import { cn } from '../../utils/cn';
import { useEmailStore } from '../../store/emailStore';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { formatRelativeTime } from '../../utils/date';
import { StaggerChildren, StaggerItem } from '../animations/StaggerChildren';
import { EmptyState } from '../ui/EmptyState';
import { motion, AnimatePresence } from 'framer-motion';
import type { SenderGroup } from '../../types/stack';
import type { Email } from '../../types/email';

interface SenderListProps {
  senderGroups: SenderGroup[];
}

export function SenderList({ senderGroups }: SenderListProps) {
  if (senderGroups.length === 0) {
    return (
      <EmptyState
        icon="👤"
        title="No senders yet"
        description="Sender groups will appear here once emails are loaded."
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <StaggerChildren className="p-3 space-y-1.5">
        {senderGroups.map((group) => (
          <StaggerItem key={group.id}>
            <SenderCard group={group} />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}

function SenderCard({ group }: { group: SenderGroup }) {
  const { toggleSenderExpand, selectEmail, selectedEmail } = useEmailStore();

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-bg-secondary/60',
        'transition-all duration-200',
        'hover:border-border-light hover:bg-bg-secondary'
      )}
    >
      <button
        onClick={() => toggleSenderExpand(group.id)}
        className="flex items-center gap-3 w-full px-3.5 py-2.5 text-left group"
        aria-expanded={group.isExpanded}
        aria-label={`Emails from ${group.sender.name}, ${group.unreadCount} unread`}
      >
        <Avatar
          name={group.sender.name}
          email={group.sender.email}
          size="md"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-text-primary truncate">
              {group.sender.name}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {group.unreadCount > 0 && (
                <Badge variant="count">
                  {group.unreadCount}
                </Badge>
              )}
              <span className="text-[10px] text-text-muted">
                {formatRelativeTime(group.lastMessageDate)}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-text-secondary truncate mt-0.5">
            {group.latestSubject}
          </p>
        </div>

        <motion.span
          animate={{ rotate: group.isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2 }}
          className="text-text-muted text-xs shrink-0"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {group.isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-1.5 pb-1.5 border-t border-border/50 mt-0">
              {group.emails.slice(0, 10).map((email) => (
                <SenderEmailRow
                  key={email.id}
                  email={email}
                  isSelected={selectedEmail?.id === email.id}
                  onSelect={() => selectEmail(email)}
                />
              ))}
              {group.emails.length > 10 && (
                <div className="text-center py-1.5">
                  <span className="text-[11px] text-text-muted">
                    +{group.emails.length - 10} more
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SenderEmailRow({
  email,
  isSelected,
  onSelect,
}: {
  email: Email;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left',
        'transition-all duration-150',
        isSelected
          ? 'bg-accent/12 border border-accent/20'
          : 'hover:bg-bg-tertiary border border-transparent'
      )}
      aria-selected={isSelected}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {email.isUnread && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            )}
            <span
              className={cn(
                'text-[12px] truncate',
                email.isUnread ? 'text-text-primary font-semibold' : 'text-text-secondary'
              )}
            >
              {email.subject}
            </span>
          </div>
          <span className="text-[10px] text-text-muted shrink-0">
            {formatRelativeTime(email.date)}
          </span>
        </div>
        <p className="text-[10px] text-text-muted truncate mt-0.5">
          {email.snippet}
        </p>
      </div>
    </button>
  );
}
