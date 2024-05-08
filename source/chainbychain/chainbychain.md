# 以链建链介绍

如果你正在运行一条2.0版本以上的晶格区块链，现有业务产生的数据较多，但与主体业务无关，或需要与其他业务数据隔离。那么你就可以通过**以链建链**新建一个账本来为这类业务提供区块链支持。

![image-20240508102428780](.\chainbychain.assets\image-20240508102428780.png)

# 功能介绍

## 使用说明

通过[附件的合约ABI](#attachmentABI)向你运行的晶格链发起相关交易

以链建链合约提供的服务以及参数说明

|        | ABI        |      |
| ------ | ---------- | ---- |
| 新建链 | newChain   |      |
| 加入链 | oldChain   |      |
| 停止链 | stopChain  |      |
| 启动链 | startChain |      |
| 删除链 | delChain   |      |



## 新建链

发起新建链时的参数如下：

有默认的参数可以不传递，默认值为继承父链的相关配置。没有备注“有默认”即为必填项

| 参数名               | 类型       | 备注                                | 默认值                                |                |      |
| -------------------- | ---------- | ----------------------------------- | ------------------------------------- | -------------- | ---- |
| consensus            | uint8      | 0:继承主链1: poa 2:pbft 3:raft 默认 | 0                                     | >0             |      |
| tokenless            | bool       | 是否有币                            | 继承主链                              | 必填           |      |
| godAmount            | uint256    | 盟主初始余额                        |                                       |                |      |
| period               | uint64     | 出块间隔                            |                                       |                |      |
| noEmptyAnchor        | bool       | 不允许快速出空块                    |                                       |                |      |
| emptyAnchorPeriodMul | uint64     | 空块等待次数                        |                                       |                |      |
| isContractVote       | bool       | 开启生命周期                        |                                       |                |      |
| isDictatorship       | bool       | 开启盟主独裁                        |                                       |                |      |
| deployRule           | uint8      | 合约部署规则                        |                                       |                |      |
| name                 | string     | 链名称                              | 主链”_child_”子链id                   |                |      |
| chainId              | string     | 链Id 有默认                         | 1000->100011001->10002主链id ->子链id |                |      |
| chainMemberGroup     | Member     | []chainMemberGroup                  | Address                               | 节点地址       | 必填 |
|                      | MemberType |                                     | uint8                                 | 0: 见证1：共识 |      |
| preacher             | Address    | 创世节点地址                        |                                       |                |      |
| bootStrap            | string     | 创世节点nodeinfo                    |                                       |                |      |

 建链的时序图：

![image-20240508102817461](.\chainbychain.assets\image-20240508102817461.png)

## 加入链

加入链的参数说明

| 参数名        | 类型      | 备注                           |
| ------------- | --------- | ------------------------------ |
| chainId       | uint      | 需要加入的链ID                 |
| networkId     | uint      | 需要假如的链所在的网络ID       |
| nodeInfo      | string    | 指定一个已经加入该链的节点地址 |
| accessMembers | []address | 指定哪些节点加入该链           |

加入其他链的时序图：

![image-20240508102830735](.\chainbychain.assets\image-20240508102830735.png)

## 停止链

停止的链不能是 `$ConfigsDir`/genesis.json的链

停止链的交易可以发给任意一个正在运行的链 `cross_chainStatus`=start

链成功停止后，不会在继续出块，不能再对链做任何写入操作，只能做读取操作。

## 启动链

重新启动已经停止的链。

## 删除链

删除已经停止的链，对正在运行的链发起删除的操作不会执行。

## 链的生命周期

![image-20240508112552120](.\chainbychain.assets\image-20240508112552120.png)

# 附件

## <span id="attachmentContract">以链建链合约</span>

合约地址：zltc_ZDfqCd4ZbBi4WA7uG4cGpFWRyTFqzyHUn

### <span id="attachmentABI">合约ABI</span>

```
[
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "chainId",
				"type": "uint64"
			}
		],
		"name": "delChain",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "consensus",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "tokenless",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "godAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint64",
						"name": "period",
						"type": "uint64"
					},
					{
						"internalType": "bool",
						"name": "noEmptyAnchor",
						"type": "bool"
					},
					{
						"internalType": "uint64",
						"name": "emptyAnchorPeriodMul",
						"type": "uint64"
					},
					{
						"internalType": "bool",
						"name": "isContractVote",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isDictatorship",
						"type": "bool"
					},
					{
						"internalType": "uint8",
						"name": "deployRule",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "chainId",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "preacher",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "bootStrap",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "member",
								"type": "address"
							},
							{
								"internalType": "uint8",
								"name": "memberType",
								"type": "uint8"
							}
						],
						"internalType": "struct chainbychain.ChainMember[]",
						"name": "chainMemberGroup",
						"type": "tuple[]"
					}
				],
				"internalType": "struct chainbychain.Args",
				"name": "args",
				"type": "tuple"
			}
		],
		"name": "newChain",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "chainId",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "networkId",
				"type": "uint64"
			},
			{
				"internalType": "string",
				"name": "nodeInfo",
				"type": "string"
			},
			{
				"internalType": "address[]",
				"name": "accessMembers",
				"type": "address[]"
			}
		],
		"name": "oldChain",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "chainId",
				"type": "uint64"
			}
		],
		"name": "stopChain",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "chainId",
				"type": "uint64"
			}
		],
		"name": "startChain",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
```

## 晶格API

### **cross_getChildChainId**

获取已有子链的ID

示例

`cross17_getChildChainId`, 查询链Id为17的所有子链

``` 
{

  "jsonrpc": "2.0",

  "method": "cross17_getChildChainId",

  "params": [ 

  ],

  "id": 1

}
```

### **cross_getChainStatus**

获取链运行状态 （start/stop）

```json
{

  "jsonrpc": "2.0",

  "method": "cross17_getChainStatus",

  "params": [ 

  ],

  "id": 1

}
```

返回值: start/stop

### node_getAllChainId

返回节点上所有的链ID

``` json
{
    "jsonrpc": "2.0",
    "method": "node_getAllChainId",
    "params": [
    ],
    "id": 1
}
```



