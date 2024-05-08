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
