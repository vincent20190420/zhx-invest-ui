export default {
  path: '/tools',
  title: '程序员工具',
  icon: 'android',
  children: (pre => [
    { path: `${pre}index`, title: '程序员工具', icon: 'android' },
    {
      title: '代码生成器',
      icon: 'file-code-o ',
      path: `${pre}generator`
    }
  ])('/tools/')
}