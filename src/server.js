import { createServer, Model } from 'miragejs';
import { faker } from '@faker-js/faker'; // 使用 faker 生成英文数据

export function makeServer() {
  let server = createServer({
    models: {
      article: Model,
    },

    seeds(server) {
      // 创建 100 条不重复的英文模拟文章数据
      for (let i = 1; i <= 100; i++) {
        server.create('article', {
          id: i,
          title: faker.lorem.sentence(), // 生成一个随机的自然英文标题
          content: faker.lorem.paragraphs(10), // 生成 10 段自然的英文内容，确保内容丰富
        });
      }
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
