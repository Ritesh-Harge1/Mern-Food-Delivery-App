import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Food from '../models/Food.js';
import User from '../models/User.js';

dotenv.config();
await connectDB();

await User.deleteMany({});
await Food.deleteMany({});

await User.create({
  name:'Admin',
  email:'admin@eats.local',
  password:'admin123',
  role:'admin'
});

await Food.insertMany([
  { name:'Margherita Pizza', description:'Classic cheese & tomato', price:299, image:'/images/margherita-pizza.svg', category:'Pizza' },
  { name:'Veg Burger', description:'Crispy patty with lettuce', price:149, image:'/images/veg-burger.svg', category:'Burger' },
  { name:'Paneer Wrap', description:'Spiced paneer & veggies', price:199, image:'/images/paneer-wrap.svg', category:'Wrap' },
  { name:'Masala Dosa', description:'South Indian special', price:159, image:'/images/masala-dosa.svg', category:'South Indian' },
  { name:'Gulab Jamun', description:'Sweet dessert', price:99, image:'/images/gulab-jamun.svg', category:'Dessert' },
  { name:'Chicken Biryani', description:'Aromatic spiced biryani', price:349, image:'/images/chicken-biryani.svg', category:'Biryani' },
  { name:'Pasta Alfredo', description:'Creamy white sauce pasta', price:259, image:'/images/pasta-alfredo.svg', category:'Pasta' },
  { name:'Caesar Salad', description:'Crisp salad with dressing', price:189, image:'/images/caesar-salad.svg', category:'Salad' },
  { name:'Samosa', description:'Crispy filled pastry', price:49, image:'/images/samosa.svg', category:'Snack' },
  { name:'Chocolate Brownie', description:'Warm chocolate brownie', price:129, image:'/images/chocolate-brownie.svg', category:'Dessert' }
]);

console.log('Seed complete');
process.exit(0);
