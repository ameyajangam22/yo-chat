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
			console.log("SNAPSHOT", data);
			console.log("USEERRRSSS", users);

			dispatch({
				type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
				payload: { users },
			});
		});
	};
};
