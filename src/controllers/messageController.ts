import type { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import Message from '../models/Message.js';
import { encrypt, decrypt } from '../utils/encryption.js';

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

    // create new document message with ENCRYPTED content
    const newMessage = new Message({
      recipient,
      sender,
      content: encrypt(content),
      theme,
      shortId
    });

    console.log('Saving message to database...');
    // store document in database
    const savedMessage = await newMessage.save();
    console.log('Message saved successfully');
    
    // Return the message with UNENCRYPTED content so the frontend has the correct data
    const responseMessage = savedMessage.toObject();
    responseMessage.content = content;
    
    res.status(201).json(responseMessage);
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

    // Decrypt content before sending back to client
    const messageData = message.toObject();
    try {
      messageData.content = decrypt(messageData.content);
    } catch (e) {
      console.log('Failed to decrypt message, returning as is', e);
      // Fallback for unencrypted/legacy messages
    }

    res.json(messageData);
  } catch (error: any) {
    console.error('Error fetching message:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message || 'Unknown error' 
    });
  }
};
