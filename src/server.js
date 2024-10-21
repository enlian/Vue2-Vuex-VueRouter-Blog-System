import { createServer, Model } from 'miragejs';

export function makeServer() {
  let server = createServer({
    models: {
      article: Model,
    },

    seeds(server) {
      // 创建模拟的文章数据
      server.create('article', { id: 1, title: 'Vue3 入门', content: '这是 Vue3 的介绍...' });
      server.create('article', { id: 2, title: '前端开发趋势', content: '这是 2024 年的前端趋势...' });
      server.create('article', { id: 3, title: 'JavaScript 进阶', content: '学习 JavaScript 高级知识...' });
    },

    routes() {
      this.namespace = 'api';

      // 获取所有文章
      this.get('/articles', (schema) => {
        return schema.articles.all();
      });

      // 获取单篇文章详情
      this.get('/articles/:id', (schema, request) => {
        let id = request.params.id;
        return schema.articles.find(id);
      });
    },
  });

  return server;
}
