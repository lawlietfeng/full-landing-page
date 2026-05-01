# full-landing-page

[faui](https://github.com/lawlietfeng/faui) 完整版（Full Edition）的组件示例站点。所有页面均由纯 JSON Schema 驱动，零硬编码 UI 代码。

**在线预览**: https://lawlietfeng.github.io/full-landing-page/

## 页面列表

| 页面 | Schema 文件 | 说明 |
|------|------------|------|
| Home | `home.json` | 首页 |
| Components | `components.json` | 组件展示 |
| Showcase | `showcase.json` | 综合示例 |
| Guide | `guide.json` | 使用指南 |
| Table | `table.json` | 表格数据展示 |
| Dashboard | `dashboard.json` | 数据仪表盘 |

所有页面共享 `shell.json` 作为导航外壳，运行时合并渲染。

## 技术栈

- [faui/full](https://github.com/lawlietfeng/faui) — 67+ 组件的 JSON Schema 渲染器
- React 19 + TypeScript
- Ant Design 5 + Tailwind CSS v4
- framer-motion（动画）
- Vite

## 本地运行

```bash
# 前置：先构建 faui（本项目通过 file:../faui 引用）
cd ../faui && npm install && npm run build

# 安装依赖并启动
cd ../full-landing-page
npm install
npm run dev
```

## 项目结构

```
src/
├── App.tsx          # 路由 + schema 合并逻辑
├── mock.ts          # HTTP 请求 mock 数据
├── schemas/         # 纯 JSON Schema 页面定义
│   ├── shell.json   # 导航外壳
│   ├── home.json
│   ├── components.json
│   ├── showcase.json
│   ├── guide.json
│   ├── table.json
│   └── dashboard.json
├── main.tsx
└── index.css
```

## 工作原理

1. `shell.json` 定义导航栏和页面容器
2. 各页面 JSON 定义具体内容组件
3. `App.tsx` 将 shell + 所有页面 schema 合并为一个 `Content` 对象
4. `SchemaRenderer` 接收合并后的 schema 渲染完整页面
5. 页面切换通过 `currentPage` 数据字段 + `Condition` 组件实现，无需路由库

## 相关项目

| 项目 | 说明 |
|------|------|
| [faui](https://github.com/lawlietfeng/faui) | JSON Schema UI 渲染器（本站使用的 Full Edition） |
| [faui-agent](https://github.com/lawlietfeng/faui-agent) | AI Agent 框架，通过 LLM 生成 faui JSON Schema |

## License

[Apache-2.0](./LICENSE)
