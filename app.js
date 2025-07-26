// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const parseCSV = require('./utils/csvParser');
const pool = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT || 3000;
const CSV_FILE_PATH = process.env.CSV_FILE_PATH;

const CHUNK_SIZE = 1000;
function chunkArray(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}


app.post('/upload', async (req, res) => {
  try {
    const users = parseCSV(CSV_FILE_PATH);
    const userChunks = chunkArray(users, CHUNK_SIZE);

    for (const chunk of userChunks) {
      const values = chunk
        .map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`)
        .join(',');

      const flatParams = chunk.flatMap(u => [u.name, u.age, u.address, u.additional_info]);

      await pool.query(
        `INSERT INTO users(name, age, address, additional_info) VALUES ${values}`,
        flatParams
      );
    }

    const report = { '<20': 0, '20–40': 0, '40–60': 0, '>60': 0 };
    for (const user of users) {
      const age = user.age;
      if (age < 20) report['<20']++;
      else if (age <= 40) report['20–40']++;
      else if (age <= 60) report['40–60']++;
      else report['>60']++;
    }

    const total = users.length;
    console.log('\nAge-Group\t% Distribution');
    for (let group in report) {
      const percent = ((report[group] / total) * 100).toFixed(2);
      console.log(`${group}\t\t${percent}%`);
    }

    res.status(200).json({ message: `Inserted ${users.length} users.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/report', async (req, res) => {
  try {
    const result = await pool.query(`SELECT age FROM users`);
    const report = { '<20': 0, '20–40': 0, '40–60': 0, '>60': 0 };

    for (const row of result.rows) {
      const age = row.age;
      if (age < 20) report['<20']++;
      else if (age <= 40) report['20–40']++;
      else if (age <= 60) report['40–60']++;
      else report['>60']++;
    }

    const total = result.rows.length;
    for (let key in report) {
      report[key] = ((report[key] / total) * 100).toFixed(2) + '%';
    }

    res.json(report);
  } catch (err) {
    console.error('Error in /report:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
