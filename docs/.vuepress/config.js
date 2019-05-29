module.exports = {
  title: 'UVue',
  description: 'Build universal Vue applications with ease',
  base: '/docs/',
  themeConfig: {
    logo: '/logo.png',
    algolia: {
      apiKey: 'a03de8357efd38f3cc69d26ccde94ac3',
      indexName: 'universal-vue'
    },
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Plugins', link: '/plugins/' },
      { text: 'Dev tools', link: '/devtools/' },
      { text: 'Reference', link: '/reference/' },
    ],
    sidebar: {
      '/guide/': ['', 'post-install', 'usage', 'css', 'vue-cli-plugins', 'server', 'deploy'],
      '/plugins/': ['', 'uvue', 'server'],
      '/devtools/': [''],
      '/reference/': ['', 'helpers', 'config', 'server-config', 'how-to'],
    },
  },
};
