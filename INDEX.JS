// Import required modules
const express = require('express');
const app = express();
const PORT = 3000;
// Middleware to parse JSON requests
app.use(express.json());



// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Calculation Service! Use the /calculate endpoint for operations.');
});

// Calculate route
app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;

  // Validate input
  if (num1 === undefined || num2 === undefined || !operation) {
    return res.status(400).json({ error: 'num1, num2, and operation are required.' });
  }

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'num1 and num2 must be numbers.' });
  }

  let result;
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed.' });
      }
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation. Use add, subtract, multiply, or divide.' });
  }

  res.json({ num1, num2, operation, result });
});

// Factorial calculation
app.post('/factorial', (req, res) => {
  const { number } = req.body;

  if (number === undefined || typeof number !== 'number' || number < 0) {
    return res.status(400).json({ error: 'A non-negative number is required for factorial calculation.' });
  }

  const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));
  res.json({ number, factorial: factorial(number) });
});

// Power calculation
app.post('/power', (req, res) => {
  const { base, exponent } = req.body;

  if (base === undefined || exponent === undefined) {
    return res.status(400).json({ error: 'base and exponent are required.' });
  }

  if (typeof base !== 'number' || typeof exponent !== 'number') {
    return res.status(400).json({ error: 'base and exponent must be numbers.' });
  }

  const result = Math.pow(base, exponent);
  res.json({ base, exponent, result });
});

// Random number generation
app.get('/random', (req, res) => {
  const min = parseInt(req.query.min) || 0;
  const max = parseInt(req.query.max) || 100;

  if (min > max) {
    return res.status(400).json({ error: 'min cannot be greater than max.' });
  }

  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  res.json({ min, max, randomNum });
});

// Not found route
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
