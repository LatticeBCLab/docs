# 创世区块

```json
{
  "config": {
    "latcId": 117,
    "latcGod": "zltc_RTUbadrrZ9tGSnKtP74JeFHwJ8sWWkBik",
    "latcSaints": [
      "zltc_g2L1GFdBZW6wHRBs1uZNDWeHjvMErzwri",
      "zltc_Xmk6g2Lgxitrx4xEPUZgF4hHdnHwDcBuU"
    ],
    "consensus": "Raft"
    "witnessSuccRate": 0.66,
    "tokenless": true,
    "difficulty": 1,
    "period": 1000,
    "NoEmptyAnchor": false,
    "EmptyAnchorPeriodMul": 5,
    "GM": true,
    "isContractVote": true,
    "isDictatorship": false,
    "deployRule": 1,
    "contractPermission": true,
    "chainVote": false,
    "rootPublicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp3nK/noQdayysN3vdylT\n94oAILXGgwy/ZMqe2iCkV9nP9HqYVq1RTj459GyWZYIg6lj8/XLW86WGcCkY9U3R\nSCPSxv8T1Ufnd2DmZYJ3q9sbVxZtWQK//p2Dr51sz6uqyTugKBRjBCu9rVQAvZ+q\n2idfZMaxq2iPX6FsuAPMQURKKlxm3ROXJejnxSi++odxQUEJnDC034eZOOKkALF5\n9UvDicm0GH7q9UULlwuIQ8QeyLb/dbb6cEUy3b/ZzHYtetIZcYpgq0JSfT+wN/PH\nW0LxvPfLthvspXIKVeYyRUk7xHYaoZk3fhdlQ0TuZ1EPArqpDZR9RBh4yU/lClL5\njQIDAQAB\n-----END PUBLIC KEY-----\n"
  },
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "number": 0,
  "preacher": "zltc_g2L1GFdBZW6wHRBs1uZNDWeHjvMErzwri",
  "godAmount": 0,
  "timestamp": "0x659f8709",
  "initVersion": 3
}
```

|                      |      |      |
| -------------------- | ---- | ---- |
| latcId               |      |      |
| latcGod              |      |      |
| latcSaints           |      |      |
| consensus            |      |      |
| witnessSuccRate      |      |      |
| tokenless            |      |      |
| difficulty           |      |      |
| period               |      |      |
| NoEmptyAnchor        |      |      |
| EmptyAnchorPeriodMul |      |      |
| GM                   |      |      |
| isContractVote       |      |      |
| isDictatorship       |      |      |
| deployRule           |      |      |
| contractPermission   |      |      |
| chainVote            |      |      |
| rootPublicKey        |      |      |
|                      |      |      |



## 合约生命周期

### 合约生命周期在创世区块中的定义

在创世区块信息中有关合约生命周期的配置的字段有三个

|      |                |       |                        | 作用域                 | 优先级 |
| ---- | -------------- | ----- | ---------------------- | ---------------------- | ------ |
| 1    | isContractVote | bool  | 是否开启合约生命周期   |                        | 0      |
| 2    | isDictatorship | bool  | 投票方式是否是盟主独裁 | 升级、冻结、解冻、吊销 | 1      |
| 3    | deployRule     | 0/1/2 | 合约部署规则           | 部署                   | 1      |


> 盟主独裁：
>
> 联盟链盟主投票具有一票同意和一票否决权。
>
> 关闭盟主独裁，投票形式即为大多数投票通过规则


>合约部署规则: 
>
>0：部署不需要投票
>
>1：部署需要盟主投票
>
>2：部署需要大多数共识节点投票

开启`isContractVote`后另外两个配置才会生效。

`isDictatorship`和`deployRule` 针对合约生命周期的不同阶段, 它们控制的投票规则互不干扰
