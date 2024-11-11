import mysql.connector

# MySQL数据库连接配置
db_config = {
    'host': 'localhost',         
    'user': 'root',             
    'password': '2023@HappyYatty',  
    'database': 'Sensitive words' 
}

# 连接到 MySQL 数据库
try:
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    print("成功连接到数据库")
except mysql.connector.Error as err:
    print(f"数据库连接失败: {err}")
    exit(1)

# 文件路径
file_path = '/Users/zhangyating/Downloads/Racefile/Web/sensitive/keywords2(1).txt'

# 读取文件并将数据插入数据库
try:
    with open(file_path, 'r') as file:
        for line in file:
            word = line.strip()  # 去掉每行两边的空白符
            
            # 插入数据的 SQL 语句
            insert_query = "INSERT INTO sensitive_words (word) VALUES (%s)"
            cursor.execute(insert_query, (word,))
            
        # 提交更改
        conn.commit()
        print("所有敏感词已成功插入数据库")
except FileNotFoundError:
    print("未找到指定的文件，请检查文件路径")
except mysql.connector.Error as err:
    print(f"插入数据时出现错误: {err}")
finally:
    # 关闭数据库连接
    cursor.close()
    conn.close()
    print("数据库连接已关闭")