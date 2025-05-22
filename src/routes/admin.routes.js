import { Router } from 'express';
import passport from 'passport';
import { User } from '../models/User.js';
import { Book } from '../models/Book.js';

const router = Router();

// 🔐 Middleware: проверка, что пользователь — админ
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещён' });
  }
  next();
};

// 📊 Статистика: количество пользователей и книг
router.get('/stats', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  const userCount = await User.count();
  const bannedCount = await User.count({ where: { isBanned: true } });
  const bookCount = await Book.count();

  res.json({
    users: userCount,
    bannedUsers: bannedCount,
    books: bookCount
  });
});

// 🔨 Бан пользователя
router.post('/ban/:id', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

  user.isBanned = true;
  await user.save();

  res.json({ message: `Пользователь ${user.username} забанен` });
});

router.get('/users', passport.authenticate('jwt', { session: false }), isAdmin, async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'username', 'role', 'isBanned']
  });
  res.json(users);
});

export default router;
