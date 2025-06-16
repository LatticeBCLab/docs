## 1.需求分析

baas新需求，要求合约生命周期做相关适配。

1. **合约生命周期规则**:
   - 合约升级只能有合约部署者发起
   - 规则0: 部署/升级后直接允许调用
   - 规则1: 部署/升级后需要盟主投票才能调用
   - 规则2: 部署/升级后需要所有共识节点投票才能调用
2. **合约冻结规则**:
   - 规则0: 盟主执行冻结/解冻需要投票
   - 规则1: 盟主执行冻结/解冻直接生效
3. **操作执行角色**:
   - 部署者(deployCaller)
   - 升级者(upgradeCaller)
   - 冻结者(freezeCaller)
   - 解冻者(unfreezeCaller)

如有疑问可联系 @孙小龙 @齐拢

## 2. 版本信息

- 提交日期：2025年6月13日
- gitlab分支：develop-v2.2.0-clc

## 3. 提测内容

测试智能合约的生命周期管理功能，包括部署、升级、冻结和解冻等操作是否符合产品需求。

## 4. 自测内容

安装需求分析的内容进行了如下测试：

```python
def testMain():
    # 合约生命周期的不同规则
    for contractLifeCycleRule in [0,1,2]:
        # 合约冻结的不同规则
        for contractFreezeRule in [0,1]:
            # 不同的合约部署者
            for deployCaller in callers:
                # 不同的合约升级者
                for upgradeCaller in callers:
                    # 不同的冻结着
                    for deployCaller in callers:
                        # 不同的解冻者
                        for upgradeCaller in callers:
```

测试结果均符合预期

## 5. 影响范围

智能合约生命周期管理的不同版本之间并不能相互兼容，以下情况会导致网络或账本故障

- 在已有旧账本数据的网络中更新节点，如果之间网络中出现旧区块的同步，会出现账本MPT树不一致；

**不能有此版本之前的历史数据**

## 附件/在线文档：

1. [自测脚本](https://gitlab.zlattice.top/Tom_Zhou/zlattice/-/tree/develop-v2.2.0-clc/test/zvm/proposal_contract_lifecycle)
2. [合约生命周期v3的详细设计](http://172.22.0.23:5173/docs/design/contractLC/detail)
3. 合约生命周期v3的相关api
   1. 获取[冻结](http://172.22.0.23:5173/docs/source/api/contract#wallet-getfreezecode)/[解冻](http://172.22.0.23:5173/docs/source/api/contract#wallet-getunfreezecode)code的api：
   2. 获取[修改合约生命周期规则](http://172.22.0.23:5173/docs/source/api/proposal#wallet-getchangecontractlifecyclerule)、[修改合约冻结规则](http://172.22.0.23:5173/docs/source/api/proposal#wallet-getchangecontractfreezerule)code的api