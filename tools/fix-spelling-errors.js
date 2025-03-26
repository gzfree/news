const db = require('./db-tools');

async function fixSpellingErrors() {
    try {
        console.log('开始修复数据库拼写错误...\n');

        // 修复 tb_comments 表中的 uesr_id
        console.log('修复 tb_comments 表中的 uesr_id...');
        await db.query('ALTER TABLE tb_comments CHANGE COLUMN uesr_id user_id varchar(100) NULL');
        console.log('✓ 已将 uesr_id 修改为 user_id\n');

        // 修复 tb_questions 表中的 qustion_text
        console.log('修复 tb_questions 表中的 qustion_text...');
        await db.query('ALTER TABLE tb_questions CHANGE COLUMN qustion_text question_text text NULL');
        console.log('✓ 已将 qustion_text 修改为 question_text\n');

        console.log('所有拼写错误已修复完成！\n');

        // 显示修复后的表结构
        console.log('修复后的表结构：\n');
        const tables = await db.query('SHOW TABLES');
        
        for (const table of tables) {
            const tableName = table[`Tables_in_mpnewsdb`];
            console.log(`\n表名: ${tableName}`);
            console.log('----------------------------------------');
            
            const structure = await db.query(`DESCRIBE ${tableName}`);
            structure.forEach(field => {
                console.log(`字段名: ${field.Field}`);
                console.log(`类型: ${field.Type}`);
                console.log(`是否可空: ${field.Null}`);
                console.log(`键类型: ${field.Key || '无'}`);
                console.log(`默认值: ${field.Default || '无'}`);
                console.log(`额外信息: ${field.Extra || '无'}`);
                console.log('----------------------------------------');
            });
        }

    } catch (error) {
        console.error('修复拼写错误失败:', error);
    } finally {
        await db.end();
    }
}

// 执行修复
fixSpellingErrors(); 