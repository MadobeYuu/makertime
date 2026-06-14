const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require("fs");
const cors = require('cors');
const db = require('./db'); // Твоє підключення до БД

const app = express();

app.use(cors()); // Перенесли вверх для безопасности
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// Делаем папки доступными статически, чтобы файлы можно было скачивать/просматривать в браузере
app.use('/covers', express.static(path.join(__dirname, 'covers')));
app.use('/music-files', express.static(path.join(__dirname, 'music')));

// Настройка Multer для обработки двух разных полей (аудио и обложка)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'coverFile') {
            cb(null, path.join(__dirname, 'covers')); // Обложки летят в /covers
        } else {
            cb(null, path.join(__dirname, 'music'));  // Музыка летит в /music
        }
    },
    filename: function (req, file, cb) {
        // Чтобы избежать дубликатов имён, можно добавить временную метку
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({ storage: storage });

// 1. РОУТ ДЛЯ ЗАВАНТАЖЕННЯ МУЗИКИ ТА ОБКЛАДИНКИ
// Принимаем сразу два файла с ключами: 'musicFile' та 'coverFile'
app.post('/api/music/upload', upload.fields([
    { name: 'musicFile', maxCount: 1 },
    { name: 'coverFile', maxCount: 1 }
]), async (req, res) => {
    try {
        const { title, author } = req.body;

        // Проверяем наличие файлов в объекте req.files
        const musicFile = req.files && req.files['musicFile'] ? req.files['musicFile'][0] : null;
        const coverFile = req.files && req.files['coverFile'] ? req.files['coverFile'][0] : null;

        if (!musicFile) {
            return res.status(400).json({ error: 'Аудіофайл не завантажено' });
        }

        if (!title || !author) {
            return res.status(400).json({ error: 'Будь ласка, вкажіть назву та автора' });
        }

        const trackFileName = musicFile.filename;
        // Якщо обкладинку не завантажили, запишемо NULL (або дефолтне значення на фронті)
        const coverFileName = coverFile ? coverFile.filename : null;

        // Записуємо дані в MySQL (використовуємо cover_name як просив)
        const query = 'INSERT INTO tracks (title, author, file_name, cover_name) VALUES (?, ?, ?, ?)';
        await db.query(query, [title, author, trackFileName, coverFileName]);

        res.status(201).json({
            message: 'Трек та обкладинку успішно завантажено!',
            track: { title, author, fileName: trackFileName, coverName: coverFileName }
        });

    } catch (error) {
        console.error('Помилка при завантаженні треку:', error);
        res.status(500).json({ error: 'Помилка сервера при збереженні треку' });
    }
});

// 2. РОУТ ДЛЯ ОТРИМАННЯ ВСЬОГО СПИСКУ МУЗИКИ
app.get('/api/music', async (req, res) => {
    try {
        // Убедись, что колонка cover_name выбрана из базы данных
        const [rows] = await db.query('SELECT * FROM tracks ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Не вдалося завантажити список музики' });
    }
});

// STREAM AUDIO (MP3)
function getAudio(req, res) {
    // Внимание: твои файлы теперь хранятся в папке "music", а не "static"! Исправлено здесь:
    const audioPath = path.resolve(__dirname, "music", req.filename);

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
        const [rows] = await db.query("SELECT * FROM tracks WHERE id = ?", [id]);

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