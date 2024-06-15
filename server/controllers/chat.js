const io = require('../socket.js');

const Session = require('../models/session.js');

exports.startChat = async (req, res, next) => {
  const { user, message } = req.body;

  try {
    let session = await Session.findOne({ user: user.userId });

    // Check if the message is '/end'
    if (message === '/end') {
      if (session) {
        // Delete the session if it exists
        await Session.findByIdAndDelete(session._id);
        // Emit the session end event through socket.io
        io.getIO().emit('messages', {
          action: 'end',
          roomId: session._id,
        });
      }
      return; // Stop further execution
    }

    if (!session) {
      session = new Session({
        user: user.userId,
        messages: [{ content: message, isClient: true }],
      });
      const result = await session.save();
      // Emit the message creation event through socket.io
      io.getIO().emit('messages', {
        action: 'create',
        message: message,
        roomId: result._id,
        isClient: true,
      });
    } else {
      session.messages.push({ content: message, isClient: true });
      const result = await session.save();
      // Emit the message update event through socket.io
      io.getIO().emit('messages', {
        action: 'update',
        message: message,
        roomId: result._id,
        isClient: true,
      });
    }

    res.status(201).json({ message: 'Message created!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createMessage = async (req, res, next) => {
  const { message } = req.body;
  const sessionId = req.params.roomId;

  try {
    let session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    session.messages.push({ content: message, isClient: false });
    const result = await session.save();
    // Emit the message update event through socket.io
    io.getIO().emit('messages', {
      action: 'update',
      message: message,
      roomId: result._id,
      isClient: false,
    });

    res.status(201).json({ message: 'Message added to session!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  const roomId = req.params.roomId;

  try {
    const session = await Session.findById(roomId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ messages: session.messages });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find();
    res.status(200).json({ sessions });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
