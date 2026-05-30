import { create } from 'zustand';

interface NotificationState {
  notification: string | null
  actions: {
    setNotification: (message: string, seconds?: number) => void;
    clearNotification: () => void;
  }
}

const useNotificationStore = create<NotificationState>((set) => ({
  notification: null as string | null,

  actions: {
    setNotification: (message: string, seconds = 5) => {
      set({ notification: message });

      setTimeout(() => {
        set({ notification: null });
      }, seconds * 1000);
    },

    clearNotification: () => {
      set({ notification: null });
    }
  }
}));

export const useNotification = () =>
  useNotificationStore((state) => state.notification);

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);