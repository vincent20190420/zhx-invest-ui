import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/generator',
  name: 'zhx-generator',
  meta,
  redirect: { name: 'zhx-generator-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('generator/index'),
      meta: {
        ...meta,
        title: '程序员工具首页'
      }
    },
    {
      path: 'table/1',
      name: `${pre}table-1`,
      component: _import('generator/table/1'),
      meta: {
        ...meta,
        title: '代码生成器'
      }
    }
  ])('zhx-generator-')
}
