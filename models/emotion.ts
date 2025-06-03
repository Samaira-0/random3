import mongoose, { Schema, model, models } from 'mongoose';

const emotionSchema = new Schema({
  email: { type: String, required: true },
  emotion: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Emotion = models.Emotion || model('Emotion', emotionSchema);

export default Emotion;
