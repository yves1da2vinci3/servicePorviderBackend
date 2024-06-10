// userPresenceManager.js

class UserPresenceManager {
  constructor() {
    this.onlineUsers = {};
  }

  addUser(userId, socketId) {
    this.onlineUsers[userId] = socketId;
  }

  removeUser(socketId) {
    for (const userId in this.onlineUsers) {
      if (this.onlineUsers[userId] === socketId) {
        delete this.onlineUsers[userId];
        return userId;
      }
    }
    return null;
  }

  getUserSocketId(userId) {
    return this.onlineUsers[userId];
  }

  getOnlineUsers() {
    return this.onlineUsers;
  }
}

const userPresenceManager = new UserPresenceManager();
export default userPresenceManager;
