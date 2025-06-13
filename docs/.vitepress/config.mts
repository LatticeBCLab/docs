import { defineConfig } from "vitepress";
import VersionSwitcher from "./components/VersionSwitcher.vue"; // 导入组件

// 处理侧边栏配置，添加默认链接

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    // 确保Vue组件可以被识别和使用
    resolve: {
      dedupe: ["vue"],
    },
  },
  
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "logo.png",
      },
    ],
  ],
  base: "/docs/",
  ignoreDeadLinks: true,
  lastUpdated: true,
  title: "ZLattice Docs",
  description: "晶格链文档",
  cleanUrls: true,
  outDir: "./build",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "晶格链", link: "/source/start/" },
      { text: "跨链", link: "/cross/" },
      { text: "详细设计", link: "/design/" },
      { text: "疑难杂症", link: "/problem/" },
    ],
    editLink: {
      pattern: "https://github.com/LatticeBCLab/docs/blob/master/docs/:path",
    },
    outline: {
      level: "deep",
      label: "大纲",
    },
    sidebar: {
      "/source/": [
        {
          text: "晶格链",
          items: [
            {
              text: "快速开始",
              collapsed: true,
              items: [
                {
                  text: "测试网络",
                  link: "/source/start/testNetwork",
                },
                {
                  text: "建链",
                  link: "/source/start/",
                },
              ],
            },
            {
              text: "合约",
              collapsed: true,
              items: [
                {
                  text: "合约手续费",
                  link: "/source/contract/gas",
                },
                {
                  text: "合约生命周期",
                  link: "/source/contract/contractLifecycle",
                },
                {
                  text: "提案",
                  link: "/source/contract/proposal/proposal",
                  items: [
                    {
                      text: "合约内部管理指令参考",
                      link: "/source/contract/proposal/contractInnerManCommand.md",
                    },
                  ],
                },
                {
                  text: "预置合约索引",
                  link: "/source/contract/precompile/contractsTable",
                },
              ],
            },
            {
              text: "共识",
              collapsed: true,
              items: [
                {
                  text: "共识过程(交易是如果被确定的？)",
                  link: "/source/consensus/consensus",
                },
                {
                  text: "区块验证",
                  link: "/source/consensus/blockVerify/blockVerify",
                  items: [
                    {
                      text: "api",
                      link: "/source/consensus/blockVerify/api",
                    },
                  ],
                },
              ],
            },
            {
              text: "以链建链",
              collapsed: true,
              items: [
                {
                  text: "什么是以链建链?",
                  link: "source/chainbychain/chainbychain#什么是以链建链",
                },
                {
                  text: "功能介绍",
                  link: "source/chainbychain/chainbychain#功能介绍",
                },
                {
                  text: "附件",
                  link: "source/chainbychain/chainbychain#附件",
                },
              ],
            },
            {
              text: "账本",
              collapsed: true,
              items: [
                {
                  text: "创世区块配置文件",
                  link: "/source/ledger/genesisIntroduce",
                },
              ],
            },
            {
              text: "授权",
              collapsed: true,
              items: [
                {
                  text: "证书",
                  collapsed: true,
                  items: [
                    {
                      text: "节点证书",
                      link: "/source/auth/cert/nodeCert",
                    },
                    {
                      text: "解决方案",
                      link: "/source/auth/cert/solution",
                    },
                  ],
                },
                {
                  text: "认证",
                  collapsed: true,
                  items: [
                    {
                      text: "接口验证码",
                      link: "/source/auth/captcha/",
                    }
                  ],
                }
              ],
            },
            {
              text: "对接",
              collapsed: true,
              items: [
                {
                  text: "日志订阅",
                  link: "source/logsub/logSubscribe",
                },
                {
                  text: "消息队列",
                },
              ],
            },
            {
              text: "版本",
              collapsed: true,
              items: [
                {
                  text: "区块版本",
                  link: "/source/version/blockVersion",
                },
                {
                  text: "v2.1",
                  link: "/source/version/v2.1",
                },
              ],
            },
            {
              text: "API",
              collapsed: true,
              items: [
                {
                  text: "账户接口",
                  link: "/source/api/account",
                },
                {
                  text: "交易接口",
                  link: "/source/api/transaction",
                },
                {
                  text: "网络API",
                  link: "/source/api/net",
                },
                {
                  text: "节点管理API",
                  link: "/source/api/node",
                },
                {
                  text: "链管理API",
                  link: "/source/api/latc",
                },
                {
                  text: "节点证书API",
                  link: "/source/api/nodeCert",
                },
                {
                  text: "区块接口",
                  link: "/source/api/block",
                },
                {
                  text: "合约API",
                  link: "/source/api/contract",
                },
                {
                  text: "提案API",
                  link: "/source/api/proposal",
                },
                {
                  text: "以链建链API",
                  link: "/source/api/cbyc",
                },
                {
                  text: "区块链SDK服务",
                  link: "/source/api/sdk",
                },
              ],
            },
            {
              text: "配置文件",
              collapsed: true,
              items: [
                {
                  text: "节点配置文件",
                  link: "/source/configs/v2.1/config.md",
                },
              ],
            },
          ],
        },
      ],
      "/cross/": [
        {
          text: "跨链文档",
          items: [{ text: "Index", link: "/cross/index" }],
        },
      ],
      "/problem/": [
        {
          text: "共识",
          items: [
            {
              text: "Raft",
              link: "/problem/consensus/raft"
            }
          ],
        },
        {
          text: "证书",
          items: [
            {
              text: "证书高度异常",
              link: "/problem/cert/heightUnexpect"
            }
          ]
        }
      ],
      "/design/": [
        {
          text: "重构",
          collapsed: true,
          items: [
            {
              text: "evm",
              link: "/design/refactor/evm"
            }
          ]
        },
        {
          text: "合约生命周期迭代",
          collapsed: true,
          items: [
            {
              text: "需求",
              link: "/design/contractLC/lifecycle"
            },
            {
              text: "详细设计",
              link: "/design/contractLC/desgin"
            },
            {
              text: "合约状态码解释",
              link: "/design/contractLC/contractStateExplain"
            },
            {
              text: "提测信息",
              link: "/design/contractLC/testReady"
            }
          ]
        }
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/LatticeBCLab" }],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025",
    },
    // 中文
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询结果",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },

    // 文章翻页
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    // 移动端 - 外观
    darkModeSwitchLabel: "外观",

    // 移动端 - 返回顶部
    returnToTopLabel: "返回顶部",

    // 移动端 - menu
    sidebarMenuLabel: "菜单",
  },
});
