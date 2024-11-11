CREATE TABLE sensitive_words (
    id INT PRIMARY KEY AUTO_INCREMENT,
    word VARCHAR(255) NOT NULL
);

CREATE TABLE user_inputs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    input_text VARCHAR(255) NOT NULL,
    is_blocked BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

CREATE PROCEDURE CheckForSensitiveWords(IN user_id INT, IN input_text VARCHAR(255))
BEGIN
    DECLARE sensitive_word_found BOOLEAN DEFAULT FALSE;
    
    -- 检查敏感词
    IF EXISTS (SELECT 1 FROM sensitive_words WHERE input_text LIKE CONCAT('%', word, '%')) THEN
        SET sensitive_word_found = TRUE;
    END IF;

    -- 将输入插入到 user_inputs 表中
    INSERT INTO user_inputs (user_id, input_text, is_blocked)
    VALUES (user_id, input_text, sensitive_word_found);

    -- 返回结果
    IF sensitive_word_found THEN
        SELECT '请注意文明用语' AS message;
    ELSE
        SELECT input_text AS message;
    END IF;
END //

DELIMITER ;

LOAD DATA LOCAL INFILE '/Users/zhangyating/Downloads/比赛文件/Web马拉松-AI检测敏感词汇/sensitive/keywords2(1).txt'
INTO TABLE sensitive_words
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
(word);
