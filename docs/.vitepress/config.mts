import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  title: "ZLattice Docs",
  description: "晶格链文档",
  cleanUrls: true,
  outDir: './build',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/statics/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: '晶格链', link: '/source/'},
      { text: '跨链', link: '/cross/'}
    ],
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://gitlab.zlattice.top/qilong/zlatticedoc/-/blob/master-vue/docs/:path'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025'
    },
    sidebar: {
      '/source/': [
        {
          text: '晶格链',
          items: [
            {
              text: '快速开始',
              link: '/source/' ,
            },
            {
              text: '合约',
              collapsed: true,
              items: [
                {
                  text: '合约生命周期',
                  link: '/source/contract/contractLifecycle'
                },
                {
                  text: '预置合约索引',
                  link: '/source/contract/precompile/contractsTable'
                }
              ]
            },
            {
              text: '共识',
              collapsed: true,
              items: [
                {
                  text: '共识过程(交易是如果被确定的？)',
                  link: '/source/consensus/consensus',
                },
                {
                  text: '区块验证',
                  link: '/source/consensus/blockVerify/blockVerify',
                  items: [
                    {
                      text: 'api',
                      link: '/source/consensus/blockVerify/api'
                    }
                  ]
                }

              ]
            },
            {
              text: '以链建链',
              collapsed: true,
              items: [
                {
                  text: '什么是以链建链?',
                  link: 'source/chainbychain/chainbychain#什么是以链建链'
                },
                {
                  text: '功能介绍',
                  link: 'source/chainbychain/chainbychain#功能介绍'
                },
                {
                  text: '附件',
                  link: 'source/chainbychain/chainbychain#附件'
                }
              ]
            },
            {
              text: '账本',
              collapsed: true,
              items: [
                {
                  text: '创世区块配置文件',
                  link: '/source/ledger/genesisIntroduce'
                }
              ]
            },
            {
              text: '授权',
              collapsed: true,
              items: [
                {
                  text: '节点证书',
                  link: '/source/cert/nodeCert'
                }
              ]
            },
            {
              text: '对接',
              collapsed: true,
              items:[
                {
                  text: '日志订阅',
                  link: 'source/logsub/logSubscribe'
                },
                {
                  text: '消息队列'
                }
              ]
            },
            {
              text: '版本',
              collapsed: true,
              items: [
                {
                  text: '区块版本',
                  link: '/source/version/blockVersion'
                },
                {
                  text: 'v2.1',
                  link: '/source/version/v2.1'
                },

              ]
            }
          ]
        }
      ],
      '/cross/': [
        {
          text: '跨链文档',
          items: [
            {text: 'Index',link: '/cross/index'}
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  }
})