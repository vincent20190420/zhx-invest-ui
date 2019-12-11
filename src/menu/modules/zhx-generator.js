export default {
  path: '/generator',
  title: '程序员工具',
  icon: 'android',
  children: (pre => [
    { path: `${pre}index`, title: '程序员工具', icon: 'android' },
    {
      title: '代码生成器',
      icon: 'file-code-o ',
      children: [
        { path: `${pre}table/1`, title: '代码生成器' }
      ]
    },
  ])('/generator/')
}
