import firebase from "firebase";
import { auth } from "firebase";
import "firebase/database";
import { db } from "../firebase";
import { authConstants } from "./constants";
require("../firebase");
export const signup = (user) => {
	return async (dispatch) => {
		// call db here
		dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });
		const firstName = user.firstName;
		const lastName = user.lastName;
		const email = user.email;
		const password = user.password;
		auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((data) => {
				console.log(data);
				const currentUser = auth().currentUser;
				const name = `${firstName}` + " " + `${lastName}`;
				currentUser
					.updateProfile({
						displayName: name,
					})
					.then(() => {
						console.log("successful");
						var userRef = db.ref("/users");
						var newUserRef = userRef.push();
						newUserRef
							.set({
								email: email,
								password: password,
								firstName: firstName,
								lastName: lastName,
								createdAt: new Date().toString(),
								uid: data.user.uid,
								isOnline: true,
								pushId: newUserRef.key,
							})
							.then(() => {
								const loggedInUser = {
									firstName: user.firstName,
									lastName: user.lastName,
									email: user.email,
									uid: data.user.uid,
									pushId: newUserRef.key,
								};
								localStorage.setItem("user", JSON.stringify(loggedInUser));
								console.log("User logged in successfully!");
								dispatch({
									type: `${authConstants.USER_LOGIN}_SUCCESS`,
									payload: { user: loggedInUser },
								});
							});
					});
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: `${authConstants.USER_LOGIN}_FAILURE`,
					payload: { err: err },
				});
			});
	};
};

export const login = (user) => {
	return async (dispatch) => {
		dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });
		auth()
			.signInWithEmailAndPassword(user.email, user.password)
			.then((data) => {
				console.log("DAAAAAATTTTAAAAAAA", data);
				const name = data.user.displayName;
				const arr = name.split(" ");
				const fname = arr[0];
				const lname = arr[1];
				const loggedInUser = {
					firstName: fname,
					lastName: lname,
					email: user.email,
					uid: data.user.uid,
				};
				localStorage.setItem("user", JSON.stringify(loggedInUser));
				dispatch({
					type: `${authConstants.USER_LOGIN}_SUCCESS`,
					payload: { user: loggedInUser },
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: `${authConstants.USER_LOGIN}_FAILURE`,
					payload: { err },
				});
			});
	};
};

export const logout = (pushId) => {
	return async (dispatch) => {
		dispatch({ type: `${authConstants.USER_LOGOUT}_REQUEST` });
		if (pushId.length > 0) {
			db.ref("/users/" + pushId)
				.update({
					isOnline: false,
				})
				.then(() => {
					//auth logging out
					auth()
						.signOut()
						.then(() => {
							localStorage.clear();
							dispatch({ type: `${authConstants.USER_LOGOUT}_SUCCESS` });
						})
						.catch((error) => {
							console.log(error);
							dispatch({
								type: `${authConstants.USER_LOGOUT}_FAILURE`,
								payload: { error },
							});
						});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
};
