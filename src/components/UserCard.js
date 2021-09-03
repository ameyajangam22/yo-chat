const UserCard = ({ fname, lname, isOnline }) => {
	return (
		<>
			<div className="cursor-pointer flex justify-evenly items-center w-full relative bg-gray-100 border-b-2">
				<h2 className="text-center p-4">
					{fname} {lname}
				</h2>
				{isOnline == true ? (
					<div className="rounded-full bg-green-500 h-2 w-2"></div>
				) : (
					<div className="rounded-full bg-red-500 h-2 w-2"></div>
				)}
			</div>
		</>
	);
};

export default UserCard;
