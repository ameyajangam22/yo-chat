const Chat = () => {
	return (
		<>
			<div className="bg-red-200 h-5/6 relative ">
				<div className="w-full relative bg-yellow-200">
					<h2 className="text-center p-4 text-3xl font-bold">Random Guy</h2>
				</div>
				<div className="" id="chatArea"></div>
				<div className="flex w-full justify-center bottom-4 absolute">
					<input className=" w-10/12 p-2" type="text" />
					<button className="w-24 bg-blue-200">Send</button>
				</div>
			</div>
		</>
	);
};

export default Chat;
