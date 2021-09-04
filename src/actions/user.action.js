import { userConstants } from "./constants";
import { db } from "../firebase";
export const getRealtimeUsers = (uid) => {
	return async (dispatch) => {
		dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` });

		console.log("here");
		let users = [];
		const usersList = db.ref("/users");
		usersList.on("value", (snapshot) => {
			const data = snapshot.val();
			users = [];
			Object.entries(data).forEach(([key, value]) => {
				users.push(value);
			});
			// console.log("SNAPSHOT", data);
			// console.log("SNAPSHOT", data);
			// console.log("USEERRRSSS", users);

			dispatch({
				type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
				payload: { users },
			});
		});
	};
};
export const updateMessage = (msgObj) => {
	return async (dispatch) => {
		const messageList = db.ref("/conversations");
		const newMessage = messageList.push();
		newMessage
			.set({
				...msgObj,
				createdAt: new Date().toString(),
				messagePushId: newMessage.key,
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
export const getRealTimeConversations = (uid_1, uid_2) => {
	return async (dispatch) => {
		const allConversations = db.ref("/conversations");
		let conversations = [];
		allConversations.on("value", (snapshot) => {
			const data = snapshot.val();
			conversations = [];
			Object.entries(data).forEach(([key, value]) => {
				conversations.push(value);
			});
		});
		console.log(conversations);
		console.log("uid_1", uid_1);
		console.log("uid_2", uid_2);

		console.log("YOYOOY");
		conversations = conversations.filter((conversation) => {
			// First part of logic deals with our sent messages and second part deals with messages recieved to us by that user
			if (
				(conversation.user_uid_1 == uid_1 &&
					conversation.user_uid_2 == uid_2) ||
				(conversation.user_uid_2 == uid_1 && conversation.user_uid_1 == uid_2)
			) {
				return conversation;
			}
		});
		console.log("HEYEYYY");
		console.log("convos", conversations);
		dispatch({
			type: userConstants.GET_REALTIME_MESSAGES,
			payload: { conversations },
		});
	};
};
