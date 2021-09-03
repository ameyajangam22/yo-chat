import "./App.css";
import Signup from "./pages/Signup";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";
function App() {
	return (
		<div className="App h-screen overflow-y-hidden">
			<h2 className="text-center text-4xl mt-4 font-bold">Yo-chat 😎</h2>
			<Router>
				<Route exact path="/" component={Signup} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/main" component={HomePage} />
			</Router>
		</div>
	);
}

export default App;
