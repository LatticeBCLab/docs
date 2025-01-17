# 合约API

## wallet_getContractState

## 获取合约状态

参数：

```
{
 "合约地址"
}
```

请求示例：

```json
curl --location --request GET 'http://127.0.0.1:54006' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"wallet_getContractState",
    "params":[
        "zltc_YKuag6aXVEquYLMnURfXorD69KKVytSUk"
    ],
    "id":1
} '
```

返回值：

```
{
    "address": 合约地址,
    "state": 合约状态,
    "votingProposalId": 投票中的提案id,
    "deploymentAddress": 部署者地址,
    "createAt": 创建时间,
    "modifiedAt": 更新时间
}
```

## wallet_getPermissionList

## 查询合约权限列表状态

参数： 

- 合约地址
- 高度

 ```
{
    "jsonrpc": "2.0",
    "method": "wallet_getPermissionList",
    "params": [
        "zltc_TArLkGjatNkY8X8uJTDwjw7qC2LR1rHcR",
        -1
    ],
    "id": 481
}
 ```

示例：

```
curl --location --request GET 'http://172.22.0.23:10332' \
--header 'chainId: 123' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc": "2.0",
    "method": "wallet_getPermissionList",
    "params": [
        "zltc_TArLkGjatNkY8X8uJTDwjw7qC2LR1rHcR",
        -1
    ],
    "id": 481
}'
```

返回值：



返回示例：