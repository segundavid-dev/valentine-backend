import type { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import Message from '../models/Message.js';

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { recipient, sender, content, theme } = req.body;
    
    console.log('Received request body:', req.body);
    
    if (!recipient || !sender || !content || !theme) {
      console.log('Missing fields:', { recipient, sender, content, theme });
      return res.status(400).json({ message: 'All fields are required' });
    }

    // create unique id
    console.log('Generating nanoid...');
    const shortId = nanoid(10);
    console.log('Generated shortId:', shortId);

    // create new document message
    const newMessage = new Message({
      recipient,
      sender,
      content,
      theme,
      shortId
    });

    console.log('Saving message to database...');
    // store document in database
    await newMessage.save();
    console.log('Message saved successfully');
    res.status(201).json(newMessage);
  } catch (error: any) {
    console.error('Error creating message:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message || 'Unknown error' 
    });
  }
};

export const getMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('Fetching message with ID:', id);
    
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }
    const message = await Message.findOne({ shortId: id }); 
    console.log('Found message:', message);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (error: any) {
    console.error('Error fetching message:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message || 'Unknown error' 
    });
  }
};
