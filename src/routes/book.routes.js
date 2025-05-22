import { Router } from 'express';
import passport from 'passport';
import { Book } from '../models/Book.js';

const router = Router();

// 📚 Получить список всех книг
router.get('/', async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

// 💳 Купить книгу
router.post('/buy/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id } = req.params;
  const { cardNumber } = req.body;

  if (!cardNumber) return res.status(400).json({ message: 'Введите номер карты' });
  if (parseInt(cardNumber) % 2 !== 0) return res.status(402).json({ message: 'Оплата не прошла (карта нечетная)' });

  const book = await Book.findByPk(id);
  if (!book) return res.status(404).json({ message: 'Книга не найдена' });

  // Здесь можно добавить сохранение покупки, если будет модель покупок
  res.json({ message: 'Оплата успешна!', book });
});

export default router;
