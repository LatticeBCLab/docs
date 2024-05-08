# About

## This is a test page
```markdown```
## 目录结构
    ├── build sphinx生成的html文件
    ├── source 文档源文件
    │   ├── 共识
    │   ├── 合约
    │   │   ├── 提案  
    │   │   │   ├── 提案说明文档
    │   │   │   ├── 合约内部管理操作指令说明.md
    │   ├── 账本

## 升级说明
### **API变动**
原API只使用于单链服务时的信息调用和查询，由于链服务的增加，需要再API中区别不同的链服务。

变动规则为: 

1.在原api的namespace后追加链ID;

2.也可在请求头中指定链ID。在请求头中指定链ID的方式为在请求头中添加`ChainID`字段，值为链ID。

如 latc_getCurrentDBlock  -> latc17_getCurrentDBlock

wallet_sendTBlock  -> wallet17_sendTBlock

暂时不支持config.toml中的HTTPModules和WSModules配置项（此配置项为限制api访问）。