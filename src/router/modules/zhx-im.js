import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/im',
  name: 'zhx-im',
  meta,
  redirect: { name: 'zhx-im-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: _import('im/index'),
      meta: {
        ...meta,
        title: '投资管理'
      }
    },
    {
      path: 'stock',
      name: `${pre}stock`,
      component: _import('im/stock/index'),
      meta: {
        ...meta,
        title: '行情'
      }
    },
    {
      path: 'aip',
      name: `${pre}aip`,
      component: _import('im/aip/index'),
      meta: {
        ...meta,
        title: '定投计划'
      }
    },
    {
      path: 'stock/info/:id',
      name: `${pre}stock-info`,
      component: _import('im/stock/info'),
      props: true,
      meta: {
        ...meta,
        title: '股票明细'
      }
    }
  ])('zhx-im-')
}
