// docs/.vitepress/relaConf/index.ts 配置内容较多，单独起个文件
export * from './navbar';
export const nav = [
    {
        text: '首页',
        link: '/' // 表示docs/guide.md
    },
    {
        text: '个人成长',
        items: [
            {
                text: '大江南北游记',
                link: '/Travel/mine'
            },
            {
                text: '所思·所想',
                link: '/Growing/guide'
            }
        ]
    },
    {
        text: '关于我',
        items: [
            {
                text: 'Github',
                link: 'https://github.com/zjh19961025'
            },
            {
                text: 'Gitee',
                link: 'https://gitee.com/zhujinhuilol'
            },
            {
                text: 'CSDN',
                link: 'https://blog.csdn.net/weixin_44326167?type=blog'
            },
        ]
    },
    {
        text: '前端开发',
        items: [
            {
                text: 'TS',
                link: '/column/index' // 对应docs/column/Algorithm下的idnex.md文件
            },
            {
                text: 'Vue3',
                link: '/Vue3/index-outside' // 对应docs/column/Vue3.md文件
            },
            {
                text: '前端面试系列',
                link: '/interview/index' // 对应docs/column/Vue3.md文件
            },
            {
                text: '开发积累',
                link: '/development/developmentTips_instruct' // 对应docs/column/Vue3.md文件
            }
        ]
    }
];

