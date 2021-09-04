import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMessage } from "../actions";

const Chat = ({
	chatStarted,
	chatUser,
	authUid,
	pushId,
	chatUserPushId,
	conversations,
}) => {
	const dispatch = useDispatch();
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		const msgObj = {
			user_uid_1: pushId,
			user_uid_2: chatUserPushId,
			message: message,
		};
		setMessage("");
		if (message !== "") {
			dispatch(updateMessage(msgObj));
		}
	};
	return (
		<>
			<div className="bg-red-200 h-5/6 relative ">
				<div className="w-full relative bg-yellow-200">
					<h2 className="text-center p-4 text-3xl font-bold">
						{chatStarted == true ? chatUser : "Random Guy"}
					</h2>
				</div>
				<div className=" overflow-y-auto flex flex-col " id="chatArea ">
					{chatStarted &&
						conversations.length > 0 &&
						conversations.map((convo) => {
							return (
								<div className=" p-2 ">
									<p
										className=" text-left p-2 w-32 "
										style={{
											float: convo.user_uid_1 === pushId ? "right" : "left",
											backgroundColor:
												convo.user_uid_1 === pushId ? "#0085fa" : "#ebeff2",
											color: convo.user_uid_1 === pushId ? "white" : "black",
										}}
									>
										{convo.message}
									</p>
								</div>
							);
						})}
				</div>
				{chatStarted && (
					<div className="flex w-full justify-center bottom-4 absolute">
						<input
							className=" w-10/12 p-2"
							type="text"
							value={message}
							onChange={(e) => {
								setMessage(e.target.value);
							}}
							placeholder="Message..."
						/>
						<button onClick={handleSubmit} className="w-24 bg-blue-200">
							Send
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Chat;
