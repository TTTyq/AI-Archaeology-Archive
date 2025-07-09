# AI Archaeology Archive

一个交互式的AI考古学家Archive，具有3D星图界面，让用户能够探索和管理考古数据。

## 🌟 功能特性

- **3D星图界面**: 使用Three.js实现的可交互3D星图
- **鼠标控制**: 支持拖拽、缩放、旋转等3D导航操作
- **数据管理**: MongoDB后端存储考古数据
- **现代技术栈**: React + Three.js + Node.js + Express + MongoDB
- **容器化部署**: Docker支持，便于部署和扩展

## 🏗️ 技术架构

### 前端
- **React 18**: 现代UI框架
- **Three.js**: 3D图形渲染
- **Vite**: 快速构建工具
- **现代CSS**: 响应式设计

### 后端
- **Node.js**: JavaScript运行时
- **Express**: Web应用框架
- **MongoDB**: NoSQL数据库
- **Mongoose**: MongoDB对象建模

### 部署
- **Docker**: 容器化部署
- **Docker Compose**: 多容器编排

## 🚀 快速开始

### 开发环境

1. **安装依赖**
```bash
npm run install:all
```

2. **启动开发服务器**
```bash
npm run dev
```

3. **访问应用**
- 前端: http://localhost:4002
- 后端API: http://localhost:4001

### Docker部署

1. **构建镜像**
```bash
npm run docker:build
```

2. **启动服务**
```bash
npm run docker:up
```

## 📁 项目结构

```
AI-Archaeology-Archive/
├── frontend/          # React + Three.js 前端
├── backend/           # Node.js + Express 后端
├── docker/           # Docker配置文件
├── package.json      # 根项目配置
└── README.md         # 项目说明
```

## 🎮 使用说明

1. 打开应用后，您将看到一个3D星图界面
2. 使用鼠标左键拖拽来旋转视角
3. 使用鼠标滚轮进行缩放
4. 点击星点可以查看考古数据详情

## 🔧 开发指南

### 前端开发
```bash
cd frontend
npm run dev
```

### 后端开发
```bash
cd backend
npm run dev
```

## 📝 API文档

### 基础路由
- `GET /api/health` - 健康检查
- `GET /api/artifacts` - 获取考古文物数据
- `POST /api/artifacts` - 创建新的考古文物
- `PUT /api/artifacts/:id` - 更新考古文物
- `DELETE /api/artifacts/:id` - 删除考古文物

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License