// MongoDB初始化脚本
db = db.getSiblingDB('ai-archaeology-archive');

// 创建用户
db.createUser({
  user: 'app_user',
  pwd: 'app_password',
  roles: [
    {
      role: 'readWrite',
      db: 'ai-archaeology-archive'
    }
  ]
});

// 创建索引
db.artifacts.createIndex({ "position": "2dsphere" });
db.artifacts.createIndex({ "category": 1 });
db.artifacts.createIndex({ "culture": 1 });
db.artifacts.createIndex({ "estimatedAge": 1 });

print('Database initialized successfully!');
