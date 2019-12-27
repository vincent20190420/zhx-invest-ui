import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/tools',
  name: 'zhx-tools',
  meta,
  redirect: { name: 'zhx-tools-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('tools/index'),
      meta: {
        ...meta,
        title: '程序员工具首页'
      }
    },
    {
      path: 'generator',
      name: `${pre}generator`,
      component: _import('tools/generator/index'),
      meta: {
        ...meta,
        title: '代码生成器'
      }
    }
  ])('zhx-tools-')
}
