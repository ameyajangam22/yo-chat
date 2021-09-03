const Chat = ({ chatStarted, chatUser }) => {
	return (
		<>
			<div className="bg-red-200 h-5/6 relative ">
				<div className="w-full relative bg-yellow-200">
					<h2 className="text-center p-4 text-3xl font-bold">
						{chatStarted == true ? chatUser : "Random Guy"}
					</h2>
				</div>
				<div className=" overflow-y-auto flex flex-col " id="chatArea ">
					{chatStarted && (
						<>
							<div className=" p-2 ">
								<p className="bg-gray-50 text-left p-2 w-32 float-left">
									Hello
								</p>
							</div>
							<div className=" p-2">
								<p className="bg-blue-500 text-white text-left p-2  w-32 float-right">
									Hello
								</p>
							</div>
						</>
					)}
				</div>
				{chatStarted && (
					<div className="flex w-full justify-center bottom-4 absolute">
						<input className=" w-10/12 p-2" type="text" />
						<button className="w-24 bg-blue-200">Send</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Chat;
