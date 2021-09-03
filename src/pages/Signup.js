import { useState } from "react";
import { signup } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const Signup = () => {
	const history = useHistory();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name == "email") {
			setEmail(value);
		} else if (name == "password") {
			setPassword(value);
		} else if (name == "firstName") {
			setFirstName(value);
		} else if (name == "lastName") {
			setLastName(value);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		//firebase add user
		const user = {
			email,
			password,
			firstName,
			lastName,
		};
		dispatch(signup(user));
		// redirect to login
	};
	if (auth.authenticated) {
		history.push("/main");
	}
	return (
		<>
			<div className="flex flex-col gap-10 justify-center items-center mt-20">
				<h2 className="text-2xl font-bold underline">Create an account now</h2>
				<input
					className="p-2 w-80 border-2"
					type="text"
					name="firstName"
					value={firstName}
					placeholder="First Name"
					onChange={handleChange}
				/>
				<input
					className="p-2 w-80 border-2"
					type="text"
					name="lastName"
					value={lastName}
					placeholder="Last Name.."
					onChange={handleChange}
				/>

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
					className="bg-yellow-400 hover:bg-yellow-500 transition ease-in-out duration-300 text-white p-4 w-80"
				>
					Sign up!
				</button>
			</div>
		</>
	);
};

export default Signup;
