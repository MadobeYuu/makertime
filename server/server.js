const express = require('express');
const path = require('path');
const multer = require('multer');
const db = require('./db'); // Твоє підключення до БД

const app = express();

// Мідлвари для звичайного JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// Налаштування збереження файлів за допомогою Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Шлях до папки client/music відносно папки server
        cb(null, path.join(__dirname, '../client/music'));
    },
    filename: function (req, file, cb) {
        // Зберігаємо оригінальне ім'я файлу (або можна додати Date.now() для унікальності)
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const cors = require('cors');
app.use(cors()); // Додай це перед маршрутами (routes)

// 1. РОУТ ДЛЯ ЗАВАНТАЖЕННЯ МУЗИКИ (Файл + Метадані)
// 'musicFile' — це ім'я поля (name), яке надсилатиметься з фронтенду
app.post('/api/music/upload', upload.single('musicFile'), async (req, res) => {
    try {
        // Отримуємо назву та автора з тіла запиту (req.body)
        const { title, author } = req.body;

        // Перевіряємо, чи файл успішно завантажився
        if (!req.file) {
            return res.status(400).json({ error: 'Файл не завантажено' });
        }

        // Ім'я файлу, під яким він зберігся у client/music
        const fileName = req.file.filename;

        // Перевірка на заповненість полів
        if (!title || !author) {
            return res.status(400).json({ error: 'Будь ласка, вкажіть назву та автора' });
        }

        // Записуємо дані в MySQL
        const query = 'INSERT INTO tracks (title, author, file_name) VALUES (?, ?, ?)';
        await db.query(query, [title, author, fileName]);

        res.status(201).json({
            message: 'Трек успішно завантажено та збережено в БД!',
            track: { title, author, fileName }
        });

    } catch (error) {
        console.error('Помилка при завантаженні треку:', error);
        res.status(500).json({ error: 'Помилка сервера при збереженні треку' });
    }
});

// 2. РОУТ ДЛЯ ОТРИМАННЯ ВСЬОГО СПИСКУ МУЗИКИ
app.get('/api/music', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tracks ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Не вдалося завантажити список музики' });
    }
});

const fs = require("fs");

// STREAM AUDIO (MP3)
function getAudio(req, res) {
    const audioPath = path.resolve(__dirname, "static", req.filename);

    if (!fs.existsSync(audioPath)) {
        return res.status(404).send("Audio file not found");
    }

    const stat = fs.statSync(audioPath);
    const fileSize = stat.size;

    const range = req.headers.range;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Accept-Ranges", "bytes");

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize) {
            return res.status(416).send("Range out of bounds");
        }

        const chunkSize = end - start + 1;
        const file = fs.createReadStream(audioPath, { start, end });

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Content-Length": chunkSize,
            "Content-Type": "audio/mpeg"
        });

        file.pipe(res);

    } else {
        res.writeHead(200, {
            "Content-Type": "audio/mpeg",
            "Content-Length": fileSize
        });

        fs.createReadStream(audioPath).pipe(res);
    }
}

app.get("/music/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        const [rows] = await db.query(
            "SELECT * FROM tracks WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).send("Track not found");
        }

        req.filename = rows[0].file_name;
        next();

    } catch (error) {
        console.error("DB error:", error);
        res.status(500).send("Server error");
    }
}, getAudio);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Сервер працює на http://localhost:${PORT}`);
});