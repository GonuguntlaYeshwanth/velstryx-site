const db = require('../db/database');

const sampleProducts = [
  {
    id: 'raw-tee',
    name: 'Raw Tee',
    price: 1499,
    description: 'Premium quality raw-edge cotton tee for urban style.',
    images: JSON.stringify(['images/shirt1.jpg', 'images/shirt1-side.jpg', 'images/shirt1-back.jpg']),
  },
  {
    id: 'street-jacket',
    name: 'Street Jacket',
    price: 1999,
    description: 'Bold and durable street jacket with modern design.',
    images: JSON.stringify(['images/jacket1.jpg', 'images/jacket1-side.jpg', 'images/jacket1-back.jpg']),
  },
  {
    id: 'vel-hoodie',
    name: 'Vel Hoodie',
    price: 1799,
    description: 'Cozy and stylish Vel hoodie for all-day comfort.',
    images: JSON.stringify(['images/hoodie1.jpg', 'images/hoodie1-side.jpg', 'images/hoodie1-back.jpg']),
  }
];

let insertedCount = 0;

sampleProducts.forEach(p => {
  db.run(
    "INSERT OR IGNORE INTO products (id, name, price, description, images) VALUES (?, ?, ?, ?, ?)",
    [p.id, p.name, p.price, p.description, p.images],
    (err) => {
      if (err) {
        console.error(`Error inserting ${p.name}:`, err.message);
      } else {
        console.log(`Inserted: ${p.name}`);
      }

      insertedCount++;

      if (insertedCount === sampleProducts.length) {
        db.close((err) => {
          if (err) console.error('Error closing database:', err.message);
          else console.log('Database connection closed.');
        });
      }
    }
  );
});