import { createServer, Model } from 'miragejs';
import articles from './mork/articles.json'; // 从JSON文件导入文章数据
import categories from './mork/categories.json'; // 从JSON文件导入栏目数据

export function makeServer() {
  let server = createServer({
    models: {
      article: Model,
      category: Model, // 定义 category 模型
    },

    seeds(server) {
      // 加载文章数据
      articles.forEach((story) => {
        server.create('article', {
          id: story.id,
          title: story.title,
          content: story.content,
        });
      });

      // 加载栏目数据
      categories.forEach((category) => {
        server.create('category', {
          id: category.id,
          name: category.name,
        });
      });
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

      // 添加新文章
      this.post('/articles', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.articles.create(attrs);
      });

      // 更新文章
      this.put('/articles/:id', (schema, request) => {
        let id = request.params.id;
        let newAttrs = JSON.parse(request.requestBody);
        let article = schema.articles.find(id);
        return article.update(newAttrs);
      });

      // 删除文章
      this.del('/articles/:id', (schema, request) => {
        let id = request.params.id;
        return schema.articles.find(id).destroy();
      });

      // 获取所有栏目
      this.get('/categories', (schema) => {
        return schema.categories.all();
      });

      // 添加新栏目
      this.post('/categories', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.categories.create(attrs);
      });

      // 更新栏目
      this.put('/categories/:id', (schema, request) => {
        let id = request.params.id;
        let newAttrs = JSON.parse(request.requestBody);
        let category = schema.categories.find(id);
        return category.update(newAttrs);
      });

      // 删除栏目
      this.del('/categories/:id', (schema, request) => {
        let id = request.params.id;
        return schema.categories.find(id).destroy();
      });
    },
  });

  return server;
}
