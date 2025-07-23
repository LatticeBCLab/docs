## 环境搭建
```bash
 sudo apt install git
 sudo apt install make
 sudo apt install python3
 sudo apt install python3-pip
 sudo apt install rst2pdf
  
```
```bash
pip3 install -U Sphinx
pip3 install sphinx-autobuild
pip3 install sphinx_rtd_theme
pip3 install recommonmark # markdown支持
pip3 install sphinx_markdown_tables # markdown表格支持
pip3 install sphinx-markdown-builder 
```
## 开始
启动文档服务平台

编辑Makefile文件，修改HOST为本机ip地址, PORT为端口号
```bash
make build
```
启动git代码定时更新
```bash
./autosync.sh
```

## 配置

### 知识服务URL配置

知识服务URL可以通过环境变量配置，默认为`http://localhost:8080`：

#### 本地开发环境

```bash
# 设置环境变量
export KNOWLEDGE_SERVICE_URL=http://your-knowledge-service-url

# 启动服务
npm run dev
```

#### Docker环境

```bash
# 使用环境变量启动Docker容器
KNOWLEDGE_SERVICE_URL=http://your-knowledge-service-url docker-compose up
```

或者在`docker-compose.yml`文件中修改：

```yaml
services:
  docs:
    # ...
    environment:
      - KNOWLEDGE_SERVICE_URL=http://your-knowledge-service-url
    # ...
```

#### 直接修改配置文件

也可以在`docs/.vitepress/config.mts`文件中直接修改：

```typescript
export default defineConfig({
  // ...
  knowledgeServiceUrl: 'http://your-knowledge-service-url',
  // ...
})
```
