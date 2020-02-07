import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/admin',
  name: 'zhx-admin',
  meta,
  redirect: { name: 'zhx-admin-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('admin/index'),
      meta: {
        ...meta,
        title: '后台管理'
      }
    },
    {
      path: 'user',
      name: `${pre}user`,
      component: _import('admin/user/index'),
      meta: {
        ...meta,
        title: '用户管理'
      }
    },
    {
      path: 'role',
      name: `${pre}role`,
      component: _import('admin/role/index'),
      meta: {
        ...meta,
        title: '角色管理'
      }
    }
  ])('zhx-admin-')
}
