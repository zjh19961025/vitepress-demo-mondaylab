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
                link: '/column/Travel/' // 表示docs/column/Travel/guide.md
            },
            {
                text: '所思·所想',
                link: '/column/Growing/' // 表示docs/column/Growing/guide.md
            }
        ]
    },
    {
        text: '关于我',
        items: [
            { text: 'Github', link: 'https://github.com/zjh19961025' },
            {
                text: 'CSDN',
                link: 'https://blog.csdn.net/weixin_44326167?type=blog'
            },
            {
                text: 'Gitee',
                link: 'https://gitee.com/zhujinhuilol'
            }
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
                link: '/Vue3/index' // 对应docs/column/Vue3.md文件
            }
        ]
    }
];

