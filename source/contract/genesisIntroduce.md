# 创世区块

```json
{
  "config": {
    "latcId": 117,
    "latcSaints": [
      "zltc_g2L1GFdBZW6wHRBs1uZNDWeHjvMErzwri",
      "zltc_Xmk6g2Lgxitrx4xEPUZgF4hHdnHwDcBuU"
    ],
    "consensus": "Raft",
    "tokenless": true,
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

|             |                      |                            | 类型     | 可选值                        |
| ----------- | -------------------- | -------------------------- | -------- | ----------------------------- |
| config      | latcId               | 链ID                       | int      |                               |
|             | latcSaints           | 共识节点                   | address  |                               |
|             | consensus            | 共识机制                   | string   | PoA，Raft，PBFT（区分大小写） |
|             | tokenless            | 无币链                     | bool     |                               |
|             | period               | 出块间隔                   | int      |                               |
|             | NoEmptyAnchor        | 不出空块                   | bool     |                               |
|             | EmptyAnchorPeriodMul | 不出空块的间隔             | int      |                               |
|             | GM                   | 国密                       | bool     |                               |
|             | isContractVote       | 合约生命周期               | bool     |                               |
|             | isDictatorship       | 生命周期盟主独裁           | bool     |                               |
|             | deployRule           | 合约部署规则               | int      | 0,1,2                         |
|             | contractPermission   | 合约内部管理               | bool     |                               |
|             | chainVote            | 以链建链投票               | bool     |                               |
|             | rootPublicKey        | 根公钥                     | key      |                               |
| parentHash  |                      | 创世区块的父hash           | hex hash |                               |
| number      |                      | 创世区块高度               | int      |                               |
| preacher    |                      | 联盟链盟主                 | address  |                               |
| godAmount   |                      | 盟主初始余额               | int      |                               |
| initVersion |                      | 链版本（区块有变动的版本） | int      | 1,2,3,（4 在测试中）          |
| timestamp   |                      | 创世区块时间戳             | hex      |                               |



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
