import { writable } from 'svelte/store';

export const notificationStore = writable({ text: null, type: 'warning' });

export const addNotification = (notification) => {
	if (!notification) return;

	const safeNotification = {
		id: `${new Date().getTime()}-${Math.floor(Math.random() * 9999)}`,
		position: 'center',
		text: '',
		duration: 2000,
		...notification
	};

	const { duration } = safeNotification;

	setTimeout(() => notificationStore.update((n) => ({ ...n, text: null })), duration);

	notificationStore.update((notifications) => {
		return { ...notifications, ...safeNotification };
	});
};
