let io;

module.exports = {
  init: (httpServer) => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: ['https://funixshop-client.netlify.app/', 'https://funixshop-admin.netlify.app/'],
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io is not initialized!');
    }
    return io;
  },
};
