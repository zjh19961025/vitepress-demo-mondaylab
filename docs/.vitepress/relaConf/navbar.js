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
            { text: 'Github', link: 'https://github.com/Jacqueline712' },
            {
                text: 'CSDN',
                link: 'https://blog.csdn.net/weixin_44326167?type=blog'
            },
            {
                text: 'Gitee',
                link: 'https://pzfqk98jn1.feishu.cn/wiki/space/7193915595975491587?ccm_open_type=lark_wiki_spaceLink'
            }
        ]
    },
    {
        text: '前端开发',
        items: [
            {
                text: '数据结构与算法',
                link: '/column/Algorithm/' // 对应docs/column/Algorithm下的idnex.md文件
            }
        ]
    }
];

