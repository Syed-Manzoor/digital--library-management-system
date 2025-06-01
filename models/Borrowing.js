import mongoose from 'mongoose';

const borrowingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: Date,
  returned: { type: Boolean, default: false }
}, { timestamps: true });

const Borrowing = mongoose.model('Borrowing', borrowingSchema);

export default Borrowing;
