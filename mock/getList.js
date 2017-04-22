var Mock = require('mockjs')
Mock.mock("/api", 'get', {
  "array|1-10": [
    {
      "id|1-100":1,
      "userInfo":{
        "uid|1-100":1,
        "userName":"刘德华",
      },
      "content":"这是内容~~",
      "createTime":"@date",
      "updateTime":"@date"
    }]
})

