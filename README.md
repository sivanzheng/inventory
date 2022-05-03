# Inventory management system

> 使用 [Midway Hooks 3.0](http://midwayjs.org/docs/hooks/intro) 开发的全栈应用，UI使用 [Ant Design 4.0](https://ant.design/docs/react/introduce-cn) 进行搭建，数据库使用 MySQL 搭配 [TypeORM](https://typeorm.io/)

## Commands

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run start`: Runs the application in production mode

## 初始化

使用如下脚本进行初始化:

```bash
npx degit https://github.com/midwayjs/hooks/examples/react ./inventory
```

使用 `npm install` 安装依赖

## 目录结构

``` tree
├── .dockerignore
├── .env                        // RDS密钥
├── .gitignore
├── Dockerfile
├── LICENSE
├── README.md
├── index.html
├── midway.config.ts            // Midway构建配置，使用vite进行构建
├── package-lock.json
├── package.json
├── src
│   ├── api
│   │   ├── configuration.ts    // Midway服务器配置
│   │   ├── entity
│   │   │   └── glasses.ts      // 数据实体
│   │   ├── glasses.ts
│   │   └── models              // 客户端与服务端通用的类型定义
│   │       ├── Glasses.ts
│   │       └── Page.ts
│   ├── components              // 客户端组件
│   │   └── Header
│   │       ├── index.css
│   │       └── index.tsx
│   ├── index.css
│   ├── index.tsx               // 客户端入口文件
│   └── pages                   // 客户端页面
│       └── Glasses
│           ├── GlassesForm.tsx
│           └── index.tsx
└── tsconfig.json
```

## 配置

### Alias
```json
// tsconfig.json

{
  "compilerOptions": {
    "baseUrl": ".",
      "paths": {
        "@src/*": ["./src/*"]
      }
    }
}
```
```ts
// midway.config.ts

export default defineConfig({
  vite: {
    plugins: [react()],
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src')
      }
    }
  },
})
```

### I18n

```tsx
// index.tsx

import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment';
import 'moment/dist/locale/zh-cn'

moment.locale('zh-cn')

function App() {
  const [locale] = useState(zhCN)

  return (
    <ConfigProvider locale={locale}>
      ...
    </ConfigProvider>
  )
}
```

### ENV
```
$ npm install dotenv
```
在根目录创建 `.env` 文件
```
HOST="xxxxxx"
PORT=8888
USERNAME="xxxxx"
PASSWORD="xxxxx"
```

```ts
// src/api/configuration.ts

import * as dotenv from 'dotenv'

dotenv.config()

// 可以通过 process.env 获取 .env 中配置的环境变量
console.log(process.env.HOST)
```

## 开发

### 类型定义

在 `src/api/models` 下创建通用的类型定义
> 如果在 `src` 创建下 `models` 会出现问题，`npm run build` 之后会把客户端与服务端的代码分别输出到 `_client`，`_serve` 文件夹，`src/models` 无法被正确输出到 `dist/models`


### API

服务端在 `src/api/` 下直接编写 `controller`

客户端直接调用服务端编写的 `controller` 函数
```ts
import { getGlassesList } from '@src/api/glasses'

const res = await getGlassesList({
  query: { page: '1', size: '10' }
})
```

### 数据库

#### 使用 `TypeORM` 对 `MySQL` 进行操作

安装 `@midwayjs/orm` 后在 `configuration.ts` 中引入

```ts
// src/api/configuration.ts

import * as orm from '@midwayjs/orm'

// ...
imports: [Koa, orm, hooks()]
// ...
```
`glasses` 表结构
```MySQL
CREATE TABLE `glasses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_at` bigint NOT NULL,
  `name` varchar(45) NOT NULL,
  `order_id` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `index_of_refraction` float DEFAULT NULL,
  `frame_brand` varchar(45) DEFAULT NULL,
  `frame_model` varchar(45) DEFAULT NULL,
  `frame_price` float DEFAULT NULL,
  `glass_brand` varchar(45) DEFAULT NULL,
  `glass_model` varchar(45) DEFAULT NULL,
  `glass_price` float DEFAULT NULL,
  `eyes` json DEFAULT NULL,
  `sum_pd` float DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
SELECT * FROM inventory.glasses;
```

#### 自动生成 Entity

``` shell
$ npx mdl-gen-midway -h localhost -p 3306 -d yourdbname -u root -x yourpassword -e mysql --noConfig --case-property none
```
执行后会在项目中根据表生成 `Entity`，再根据具体类型修改 `TypeScript` 定义

#### 使用
在 `controller` 中，使用 `useEntityModel` 直接操作 `Entity`
```ts
  import { useEntityModel } from '@midwayjs/orm'

  const glassesEntity = await useEntityModel(GlassesEntity)
    .findOne({ where: { id: glasses.id } })
```
具体参考 [TypeORM](https://typeorm.io/) 教程

## DevOps

### 流程

- 编写 [Dockerfile](./Dockerfile)
- `$ docker build -t shiverzheng/inventory:v1.0.0 .`
- `$ docker login`
- `$ docker push shiverzheng/inventory:v1.0.0`
- `$ cd ~/.ssh && ssh -i ***.pem root@***.**.**.**`
- `$ docker pull`
- `$ docker run -d -p 80:3000 shiverzheng/inventory:v1.0.0`

### 调试

如果在构建镜像阶段执行 `hooks build`，在启动镜像的时候，服务会直接 0 退出，使用如下命令可以让服务宕住，以便进入容器内部进行调试

``` shell
$ docker run -d <image_name> tail -f /dev/null
```
将 `hooks build && hooks start` 一并写入镜像启动命令可以解决 0 退出问题

### TODO

Github Actions CI/CD 