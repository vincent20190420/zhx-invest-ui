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
        { path: `${pre}menu`, title: '菜单管理' },
        { path: `${pre}role`, title: '角色管理' },
        { path: `${pre}dept`, title: '部门管理' },
        { path: `${pre}user`, title: '用户管理' }
      ]
    },
    {
      title: '系统设置',
      icon: 'user',
      children: [
        { path: `${pre}conf`, title: '参数管理' },
        { path: `${pre}dict`, title: '字典管理' },
        { path: `${pre}task`, title: '定时任务' }
      ]
    }
  ])('/admin/')
}
