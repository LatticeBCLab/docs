## 链配置更改合约

支持修改的配置项

| field                 | desc                           | type      |
| --------------------- | ------------------------------ | --------- |
| period                | 出块间隔                       | uint      |
| contractPermission    | 是否开启合约内部权限管理       | bool      |
| NoEmptyAnchor         | 无交易不打包                   | bool      |
| EmptyAnchorPeriodMul  |                                | uint      |
| proposalExpireTime    | 提案过期时间                   | int（天） |
| chainByChainVote      | 以链建链规则                   | uint      |
| contractLifecycleRule | 合约生命周期规则（部署，升级） | uint      |
| contractFreezeRule    | 合约冻结规则                   | uint      |
| preacher              | 布道者                         | address   |

