import express from 'express';
import Borrowing from '../models/Borrowing.js';
import Book from '../models/Book.js';

const router = express.Router();

// Issue a book
router.post('/issue', async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Check if book is available
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.copiesAvailable < 1) return res.status(400).json({ error: 'No copies available' });

    // Create borrowing record
    const borrowing = new Borrowing({ user: userId, book: bookId });
    await borrowing.save();

    // Decrease available copies
    book.copiesAvailable -= 1;
    await book.save();

    res.status(201).json({ message: 'Book issued', borrowing });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Return a book
router.post('/return', async (req, res) => {
  try {
    const { borrowingId } = req.body;

    const borrowing = await Borrowing.findById(borrowingId);
    if (!borrowing) return res.status(404).json({ error: 'Borrowing record not found' });
    if (borrowing.returned) return res.status(400).json({ error: 'Book already returned' });

    borrowing.returned = true;
    borrowing.returnDate = new Date();
    await borrowing.save();

    // Increase book copies available
    const book = await Book.findById(borrowing.book);
    book.copiesAvailable += 1;
    await book.save();

    res.json({ message: 'Book returned', borrowing });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
