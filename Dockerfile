# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.7.3

# Use node image for base image for all stages
FROM node:${NODE_VERSION}-alpine as base

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép tệp package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các gói phụ thuộc
RUN yarn install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Lệnh để chạy ứng dụng khi container khởi động
CMD ["yarn", "run","start:dev"]
