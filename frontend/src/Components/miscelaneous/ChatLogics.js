export const getSender = (loggedUser, users) => {
  let username = users[0]._id == loggedUser._id ? users[1].name : users[0].name;
  //console.log("here I", loggedUser, users[0]._id, username);
  return username;
};
