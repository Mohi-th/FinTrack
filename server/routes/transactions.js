const express = require('express');
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

/**
 * GET /api/transactions
 * Get all transactions for the logged-in user
 * Supports query params: type, category, search, dateFrom, dateTo, sort, page, limit
 */
router.get('/', async (req, res) => {
  try {
    const { type, category, search, dateFrom, dateTo, sort = 'date_desc', page = 1, limit = 200 } = req.query;

    // Build filter
    const filter = { user: req.user.id };

    if (type && type !== 'all') {
      filter.type = type;
    }
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }
    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = new Date(dateFrom);
      if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        filter.date.$lte = to;
      }
    }

    // Build sort
    let sortObj = {};
    switch (sort) {
      case 'date_asc': sortObj = { date: 1 }; break;
      case 'amount_desc': sortObj = { amount: -1 }; break;
      case 'amount_asc': sortObj = { amount: 1 }; break;
      case 'date_desc':
      default: sortObj = { date: -1 }; break;
    }

    const transactions = await Transaction.find(filter)
      .sort(sortObj)
      .limit(Number(limit))
      .lean();

    res.json(transactions);
  } catch (err) {
    console.error('Get transactions error:', err);
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
});

/**
 * POST /api/transactions
 * Create a new transaction
 */
router.post(
  '/',
  [
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
    body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('date').notEmpty().withMessage('Date is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const { description, amount, type, category, date } = req.body;

      const transaction = await Transaction.create({
        user: req.user.id,
        description,
        amount,
        type,
        category,
        date: new Date(date),
      });

      res.status(201).json(transaction);
    } catch (err) {
      console.error('Create transaction error:', err);
      res.status(500).json({ message: 'Failed to create transaction' });
    }
  }
);

/**
 * PUT /api/transactions/:id
 * Update a transaction (only if owned by the user)
 */
router.put(
  '/:id',
  [
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('amount').optional().isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
    body('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
    body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const transaction = await Transaction.findOne({
        _id: req.params.id,
        user: req.user.id,
      });

      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      // Update fields
      const { description, amount, type, category, date } = req.body;
      if (description !== undefined) transaction.description = description;
      if (amount !== undefined) transaction.amount = amount;
      if (type !== undefined) transaction.type = type;
      if (category !== undefined) transaction.category = category;
      if (date !== undefined) transaction.date = new Date(date);

      await transaction.save();
      res.json(transaction);
    } catch (err) {
      console.error('Update transaction error:', err);
      res.status(500).json({ message: 'Failed to update transaction' });
    }
  }
);

/**
 * DELETE /api/transactions/:id
 * Delete a transaction (only if owned by the user)
 */
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted', id: req.params.id });
  } catch (err) {
    console.error('Delete transaction error:', err);
    res.status(500).json({ message: 'Failed to delete transaction' });
  }
});

module.exports = router;
