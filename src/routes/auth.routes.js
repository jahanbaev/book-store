import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = Router();

// 🔐 Регистрация
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const candidate = await User.findOne({ where: { username } });
  if (candidate) return res.status(400).json({ message: 'Пользователь уже существует' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });

  res.status(201).json({ message: 'Успешная регистрация', user: { id: user.id, username } });
});

// 🔑 Логин
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  if (user.isBanned) return res.status(403).json({ message: 'Пользователь забанен' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Неверный пароль' });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' }
  );

  res.json({ token });
});

export default router;
