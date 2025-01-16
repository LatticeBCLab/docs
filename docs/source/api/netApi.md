# 网络API

## latc_peers

## 获取链的对等节点

参数：

示例：

crul

```
curl --location --request GET '[Your Ip]:[Your port]' \
--header 'ChainId: [your Chain Id]' \
--header 'Content-Type: application/json' \
--data '{"jsonrpc":"2.0","method":"latc_peers","params":[],"id":1}'
```

request body

```json
{"jsonrpc":"2.0","method":"latc_peers","params":[],"id":1}
```

返回值：

```json
{
    "jsonRpc": "2.0",
    "id": 1,
    "result": {
        "16Uiu2HAmGohS2TyDQwrpZQXFrdPbkH9MuEsfcv7dijNM8m4bcyYA": {
            "Id": "16Uiu2HAmGohS2TyDQwrpZQXFrdPbkH9MuEsfcv7dijNM8m4bcyYA",
            "Saint": "zltc_VwaVTdGi3RrMqXg9xVUiiP9dCYUhRTKfj",
            "ChainId": 1,
            "CertSerialNumber": 314963778182285158441689297968533602950,
            "DBNum": 0,
            "DBHash": "0x93e388362786e3311665e3e4f9c8cad5f11aaa0da73b2a65dbdd4811981a4d17",
            "GinHttpPort": 0,
            "DFS": false,
            "inode": "/ip4/172.22.0.23/tcp/46337/p2p/16Uiu2HAmGohS2TyDQwrpZQXFrdPbkH9MuEsfcv7dijNM8m4bcyYA"
        }
    }
}
```

