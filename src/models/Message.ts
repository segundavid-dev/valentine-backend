import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  recipient: string;
  sender: string;
  content: string;
  theme: 'retro' | 'cute' | 'vibes';
  shortId: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  recipient: { type: String, required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  theme: { type: String, enum: ['retro', 'cute', 'vibes'], required: true },
  shortId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>('Message', MessageSchema);
