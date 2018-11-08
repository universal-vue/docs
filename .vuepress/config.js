module.exports = {
  title: 'UVue',
  description: 'Build universal Vue applications with ease',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Plugins', link: '/plugins/' },
      { text: 'Dev tools', link: '/devtools/' },
      { text: 'Reference', link: '/reference/' },
    ],
    sidebar: {
      '/guide/': ['', 'usage', 'css', 'vue-cli-plugins', 'server', 'deploy'],
      '/plugins/': ['', 'uvue', 'server'],
      '/devtools/': [''],
      '/reference/': ['', 'helpers', 'config', 'server-config', 'how-to'],
    },
  },
};
