# 多阶段构建
# 第一阶段：构建应用
FROM node:20-alpine as builder

WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：生产环境
FROM node:20-alpine

WORKDIR /app

# 安装serve来提供静态文件服务
RUN npm install -g serve

# 从构建阶段复制构建结果
COPY --from=builder /app/dist ./dist

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# 更改文件所有权
RUN chown -R nodejs:nodejs /app
USER nodejs

# 暴露端口
EXPOSE 4002

# 启动应用
CMD ["serve", "-s", "dist", "-l", "4002"]
