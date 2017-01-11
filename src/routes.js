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
    path: '/',
    name: 'index',
    redirect: {name: 'article'},
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
      },
      {
        path: 'tag',
        name: 'tag',
        component: r => require(['src/views/tag/list.vue'], r)
      },
      {
        path: 'pageview',
        name: 'pageview',
        component: r => require(['src/views/pageview/list.vue'], r)
      },
      {
        path: 'setting',
        name: 'setting',
        component: r => require(['src/views/setting/list.vue'], r)
      },
      {
        path: 'comment',
        name: 'comment',
        component: r => require(['src/views/comment/list.vue'], r)
      }
    ]
  }
]
