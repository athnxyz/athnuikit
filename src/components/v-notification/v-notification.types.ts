export interface NotificationProps {
  showNotification: boolean,
  severity: 'info' | 'warn' | 'error' | 'success' | 'secondary',
  summary: string,
  detail: string | undefined,
  timeToLive?: number;
  notificationStyle?: { [style: string]: string }
}

export const defaultNotificationProps: Pick<NotificationProps, 'timeToLive'> = {
  timeToLive: 3000
};
