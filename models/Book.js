import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  publishedDate: Date,
  copiesAvailable: { type: Number, default: 1 }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;
