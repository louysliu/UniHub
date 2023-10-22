## 如何运行
以下假定你已经安装了最新版本的Docker。如果没有，请前往[官网](https://www.docker.com/get-started/)下载并安装。

### 克隆仓库
```bash
git clone https://github.com/louix33/UniHub.git
```

### 配置环境变量
在项目根目录下，你需要配置`.env`文件，其中包含项目运行所必需的配置信息。你可以参考`.env.example`文件来配置你的环境变量。

- MYSQL_ROOT_PASSWORD：MySQL的root用户密码。
- MYSQL_PORT：MySQL容器在主机上映射的端口号。
- MYSQL_DATABASE：本项目使用的MySQL数据库名称。MySQL镜像构建时会自动创建这个数据库，无需再手动创建。
- BACKEND_HOST和BACKEND_PORT：后端的主机名和端口。前端需要这一信息以获知后端API的URL。
- FRONTEND_PORT：前端监听的端口号。

务必注意，请不要将密码等敏感信息提交到Git仓库中。

### 构建镜像
在项目根目录下，运行以下命令来构建该项目：
```sh
docker compose build
```
初次构建时，会自动下载所需的镜像，这可能需要一些时间。必要时，请尝试科学上网。

### 运行容器
在项目根目录下，运行以下命令来运行该项目：
```sh
docker compose up 

# 或者，使用 -d 参数以在后台运行
docker compose up -d
```

### 使用容器Shell

如果需要以命令行方式进入容器，请使用以下命令：

```shell
docker exec -it CONTAINER /bin/bash
```

其中CONTAINER是容器名，可以使用`docker ps`命令查看，位于NAMES一栏中。

### 停止容器

在项目根目录下，运行以下命令来停止该项目：
```sh
docker compose down
```

