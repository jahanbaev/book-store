import { sequelize } from './db.js';
import { User } from './User.js';
import { Book } from './Book.js';

await sequelize.sync({ alter: true });

// import bcrypt from 'bcryptjs';
// await User.create({
//   username: 'admin',
//   password: await bcrypt.hash('123456', 10),
//   role: 'admin'
// });


const demoBooks = [
  {
    title: 'JavaScript для начинающих',
    price: 100000,
    description: 'От основ до продвинутого уровня.',
    image: 'https://picsum.photos/200?random=1'
  },
  {
    title: 'Node.js на практике',
    price: 120000,
    description: 'Реальные проекты и глубокое понимание Node.',
    image: 'https://picsum.photos/200?random=2'
  },
  {
    title: 'Мастер Express.js',
    price: 90000,
    description: 'Создавай API быстро и эффективно.',
    image: 'https://picsum.photos/200?random=3'
  }
];

// Только если в базе ещё нет книг
const count = await Book.count();
if (count === 0) {
  await Book.bulkCreate(demoBooks);
  console.log('📚 Книги добавлены!');
}
