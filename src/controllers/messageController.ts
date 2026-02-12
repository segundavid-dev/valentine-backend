import type { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import Message from '../models/Message.js';

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { recipient, sender, content, theme } = req.body;
    
    if (!recipient || !sender || !content || !theme) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const shortId = nanoid(10);
    const newMessage = new Message({
      recipient,
      sender,
      content,
      theme,
      shortId
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMessage = async (req: Request, res: Response) => {
  try {
    const { shortId } = req.params;
    if (!shortId) {
      return res.status(400).json({ message: 'Short ID is required' });
    }
    const message = await Message.findOne({ shortId });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
