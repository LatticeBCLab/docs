import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZLattice Docs",
  description: "晶格链文档",
  cleanUrls: true,
  outDir: './build',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        items: [
          { text: '快速开始', link: '/source/readme' },
        ]
      },
      {
        text: '合约',
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
        text: '以链建链',
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
        items: [
          {
            text: '创世区块配置文件',
            link: '/source/ledger/genesisIntroduce'
          }
        ]
      },
      {
        text: '版本变更',
        items: [
          {
            text: 'v2.1',
            link: '/source/version/v2.1'
          }
        ]
      },
      {
        text: '授权',
        items: [
          {
            text: '节点证书',
            link: '/source/cert/nodeCert'
          }
        ]
      },
      {
        text: '对接',
        items:[
          {
            text: '日志订阅',
            link: 'source/logsub/logSubscribe'
          },
          {
            text: '消息队列'
          }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  }
})