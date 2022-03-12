const users = [];

// Add a user

const addUser = ({ id, username, room }) => {
  // formatted data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // validate data
  if (!username || !room) {
    return {
      error: "Username and room need to be provided",
    };
  }

  //check user existence
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  if (existingUser) {
    return {
      error: "This user already exists",
    };
  }

  //Store the user
  return { msg: "successfull" };
};

const add = (id, username, roomname) => {
  const user = { id, username, roomname };
  users.push(user);
  return { user };
};
// Remove a user

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index >= 0) {
    const user = users[index];
    users.splice(index, 1);

    return user;
  }
};

// get user

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

// get users in a room

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  getUser,
  addUser,
  removeUser,
  getUsersInRoom,
  users,
  add,
};
