// import App from './App'
const ignoreAuth = {authorization: false}
export default [
  {
    path: '/login',
    name: 'login',
    meta: ignoreAuth,
    component: r => require(['src/views/login/login.vue'], r)
  },
  {
    path: '/test',
    meta: ignoreAuth,
    component: r => require(['src/views/test.vue'], r)
  },
  {
    path: '/',
    name: 'index',
    component: r => require(['src/views/index.vue'], r),
    children: [
      {
        path: 'no-page/:message',
        name: 'no-page',
        title: '',
        meta: ignoreAuth,
        component: r => require(['src/views/no-page.vue'], r)
      },
      {
        path: 'article',
        name: 'article',
        component: r => require(['src/views/article/list.vue'], r)
      },
      {
        path: 'catalog',
        name: 'catalog',
        component: r => require(['src/views/catalog/list.vue'], r)
      }
    ]
  }
]
