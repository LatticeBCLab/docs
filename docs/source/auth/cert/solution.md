# 解决方案

## 1. 获取对等节点的证书

a. 通过[latc_peers](../../api/netApi#latc_peers)接口获取其他对等节点的信息；

b. 获取对等节点的CertSerialNumber字段信息；

c. 通过[latc_getCert](../../api/nodeCertApi#apiGetCert)结构获取证书信息。

## 2. 加入通道（子链）中，成为见证节点

### 方法1，不通过合约

a. 向通道的共识节点申请加入（业务层）, 共识节点根据申请者信息（公钥，链id）签发证书[latc_publishCert](../../api/nodeCertApi#latc_publishCert);

b. 节点调用共识节点接口获取证书 [latc_getCert](../../api/nodeCertApi#apiGetCert)结构获取证书信息;

c. 将节点证书以pem格式创建在 `configDir`/child/`chainId` 目录下;

d. 调用加入 [cbyc_selfJoinChain](../../api/cbyc#cbyc-selfjoinchain) 。

### 方法2，通过合约

a. 通过以链建链合约申请加入通道，具体方法参考 [加入链合约](../../chainbychain/chainbychain#加入链);

b. 步骤a的加入过程会因为通道没有响应的证书而失败，申请证书并按方法1.c的步骤存储证书后，调用 [latc_startZLattice](../../api/latc#latc_startZLattice)。