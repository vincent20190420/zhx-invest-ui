export default {
  path: '/im',
  title: '投资管理',
  icon: 'cog',
  children: (pre => [
    { path: `${pre}index`, title: '投资管理', icon: 'cog' },
    {
      title: '股票',
      icon: 'line-chart',
      children: [
        { path: `${pre}stock`, title: '行情' },
        { path: `${pre}aip`, title: '定投计划' }
      ]
    }
  ])('/im/')
}
