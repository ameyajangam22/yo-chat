import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getRealtimeUsers, logout } from "../actions";
import Chat from "../components/Chat";
import UserList from "../components/UserList";
import { db } from "../firebase";
const HomePage = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const user = useSelector((state) => state.user);
	const history = useHistory();
	const [pushId, setPushId] = useState("");
	const logMeOut = () => {
		dispatch(logout(pushId));
	};
	useEffect(() => {
		dispatch(getRealtimeUsers(auth.uid));
		user.users.forEach((el) => {
			console.log(el);
			if (el.uid === auth.uid) {
				setPushId(el.pushId);
				return;
			}
		});
	}, []);
	useEffect(() => {
		console.log("PUSH_ID", pushId);
		if (pushId.length) {
			db.ref("/users/" + pushId).update({
				isOnline: true,
			});
		}
	}, [pushId]);
	if (auth.authenticated == false) {
		history.push("/login");
	}
	return (
		<>
			<button
				onClick={logMeOut}
				className="bg-blue-500 text-white p-2 flex ml-auto mr-4"
			>
				Logout
			</button>
			<div className="grid grid-cols-4 h-screen mt-8">
				<div className="col-span-1">
					<UserList userList={user.users} id={auth.uid} />
				</div>
				<div className="col-span-3">
					<Chat />
				</div>
			</div>
		</>
	);
};

export default HomePage;
