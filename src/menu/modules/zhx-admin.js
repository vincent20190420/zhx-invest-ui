export default {
  path: '/admin',
  title: '后台管理',
  icon: 'cog',
  children: (pre => [
    { path: `${pre}index`, title: '后台管理', icon: 'cog' },
    {
      title: '权限设置',
      icon: 'user',
      children: [
        { path: `${pre}table/1`, title: '表格 1' }
      ]
    },
    {
      title: '角色管理',
      icon: 'users',
      children: [
        { path: `${pre}issues/142`, title: '#142' }
      ]
    }
  ])('/admin/')
}
