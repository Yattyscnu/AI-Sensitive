const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// 使用 bodyParser 中间件
app.use(bodyParser.json());

// 设置数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2023@HappyYatty',
    database: 'Sensitive words'
});

// 连接数据库
db.connect((err) => {
    if (err) {
        console.error('数据库连接失败:', err.stack);
        return;
    }
    console.log('已连接到数据库');
});

// 创建一个简单的路由
app.get('/', (req, res) => {
    res.send('服务器运行正常！');
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在 http://localhost:${PORT} 上运行`);
});

app.post('/checkInput', (req, res) => {
    const { userId, inputText } = req.body;

    db.query('SELECT word FROM sensitive_words WHERE ? LIKE CONCAT("%", word, "%")', [inputText], (err, results) => {
        if (err) throw err;
        console.log("查询结果：", results); // 打印查询结果，检查是否匹配到敏感词
        const isBlocked = results.length > 0;
        const responseMessage = isBlocked ? '请注意文明用语' : inputText;

        // 插入到 user_inputs 表中
        db.query('INSERT INTO user_inputs (user_id, input_text, is_blocked) VALUES (?, ?, ?)', [userId, inputText, isBlocked], (err) => {
            if (err) throw err;
            res.json({ message: responseMessage });
        });
    });
});