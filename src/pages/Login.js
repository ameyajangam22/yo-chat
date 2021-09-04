import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { isLoggedInUser, login } from "../actions";

const Login = () => {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	//useSelector is a react-redux hook used to access the state in redux store
	const auth = useSelector((state) => state.auth);
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name == "email") {
			setEmail(value);
		} else if (name == "password") {
			setPassword(value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//firebase validate user
		if (email == "") {
			alert("Email is required");
			return;
		}
		if (password == "") {
			alert("Password is required");
			return;
		}
		dispatch(login({ email, password }));
		// redirect to chat app
	};

	if (auth.authenticated == true) {
		history.push("/main");
	}
	return (
		<>
			{" "}
			<div className="flex flex-col gap-10 justify-center items-center mt-20">
				<h2 className="text-2xl font-bold underline">Login Now</h2>
				<input
					className="p-2 w-80 border-2"
					type="text"
					name="email"
					value={email}
					placeholder="Email.."
					onChange={handleChange}
				/>
				<input
					className="p-2 w-80 border-2"
					type="password"
					name="password"
					value={password}
					placeholder="Password.."
					onChange={handleChange}
				/>
				<button
					onClick={handleSubmit}
					className="bg-green-400 hover:bg-green-500 transition ease-in-out duration-300 text-white p-4 w-80"
				>
					Login
				</button>
			</div>
		</>
	);
};

export default Login;
