import UserCard from "./UserCard";

const UserList = ({ userList, id }) => {
	return (
		<>
			<div className="relative bg-green-200 h-5/6 ">
				<div className="w-full relative bg-blue-200">
					<h2 className="text-center p-4 text-3xl">Users</h2>
				</div>
				{userList.length > 0 &&
					userList.map((user) => {
						if (user.uid != id)
							return (
								<UserCard
									fname={user.firstName}
									lname={user.lastName}
									isOnline={user.isOnline}
								/>
							);
					})}
			</div>
		</>
	);
};

export default UserList;
