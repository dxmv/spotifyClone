import notification from "../models/notification";

const getAll = async () => await notification.findAll({ include: "user" });

const addNotification = async (text: string, userId: number) => {
	const newNoti = await notification.create({ message: text, userId: userId });
	return newNoti;
};

const visitNotification = async (userId: number, notiId: number) => {
	await notification.update(
		{ visited: true },
		{ where: { notiId: notiId, userId: userId } }
	);
};

const deleteNotifications = async (userId: number) => {
	await notification.destroy({ where: { userId: userId } });
};

export default {
	addNotification,
	visitNotification,
	deleteNotifications,
	getAll,
};
