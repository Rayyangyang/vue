var express = require('express');
var router = express.Router();
// 引入token
var token = require('jsonwebtoken')

// 使用文件上传插件 引入
var multiparty = require('multiparty')
// 引入 mysql
var mysql = require('mysql')

//建立与mysql的链接 并且接收返回对象
var con = mysql.createConnection({
  host :'localhost',
  user : 'root',
  password : 'root',
  database : 'supermarket'  
})

// 通过链接对象建立链接
con.connect()
 
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 登录
router.post('/login', (req, res) => {
    
    // 设置请求的sql语句
    var sql = "SELECT * FROM user WHERE acc = '"+ req.body.acc + "' && pwd ='" + req.body.pwd + "'";
    con.query(sql ,(err, result)=>{
      if(err) throw err
      if(result.length > 0){
        // res.send('ok')
        // var id = result.data[0].id;
        // 登陆时创建一个tokenid并且连同响应一起发送给前端
        // 参数1 创建时需要发送给的数据 参数2 标识 可以写自己的名字 参数3 过期时间
        var tokenId = token.sign({}, 'sunny', {
          expiresIn: 60 * 60 * 10 // 单位为 s

        })
        console.log(result[0].id)
        res.send({
          id : result[0].id,
          msg : 'ok',
          token : tokenId,
          userGroup : result[0].userGroup,
          avatarUrl : result[0].avatarUrl
        })
      }else{
        res.send({
          msg : 'fail'
        })
      }
    })
})

// 添加用户
router.post('/index/addAccount', (req, res)=>{
  // 拿到前端发送的数据
  var acc = req.body.acc;
  var pwd = req.body.pwd;
  var usergroup = req.body.userGroup;
  // 设置sql语句
  var sql = "INSERT INTO user(acc,pwd,userGroup) VALUES('"+acc+"','"+pwd+"','"+ usergroup+"')"
  con.query(sql, (err, result) => {
    if(err) throw err
      if(result){
        res.send('ok')
      }else{
        res.send('fail')
      }
  })
})
// 得到用户列表
router.get('/index/account', (req, res)=>{
  // 接受参数
  var page = req.query.page;
  // 计算查询的起始索引
  var firIndex = (page - 1) * 5;
  // sql 语句
  var sql1 = `SELECT * FROM user LIMIT ${firIndex}, 5`
  var sql2 = `SELECT COUNT(*) FROM user`;

  con.query(sql1, (err, result1)=>{
    con.query(sql2, (err, result2) => {
        var num = 0;
        var [count] = result2;
        for(var i in count){
          num = count[i]
        }
        res.send({
          users: result1,
          num : num
        })
    })
  })

})
// 修改密码
router.post('/index/changePwd', (req, res)=>{
  var id = req.body.id;
  var pwd = req.body.pwd;
  var oldPwd = req.body.oldPwd;
  // 查询原密码是否正确
  var sql1 =  "SELECT * FROM user WHERE pwd ='" + oldPwd + "'"
  con.query(sql1, (err, result1)=>{



    if(result1.length > 0){
      var sql2 = `UPDATE user SET pwd='${pwd}' WHERE id='${id}'`
      con.query(sql2, (err, result)=>{
        res.send(result)
      })
    }else{
      res.send('fail')
    }
  })
})

router.get('/delete', (req, res) => {
  var id = req.query.id;
  var sql = `DELETE FROM user WHERE id = '${id}'`
  con.query(sql, (err, result) => {
    res.send(result);
  })

})

// token验证
router.get('/getToken', (req, res) =>{
  var tokenId = req.query.token;
  // token验证
  token.verify(tokenId, 'sunny', (err, decode)=>{
    if(err){
      // 已过期
      res.send('outTime')
    }else{
      res.send('inTime')
    }

  })


})

// 用户添加验证
router.get('/checkUser', (req, res) => {
  var acc = req.query.acc;
  var sql = `SELECT acc FROM user WHERE acc='${acc}'`
  con.query(sql, (err, result) => {
    if(result.length > 0){
      res.send ('ok')
    }else{
      res.send('fail')
    }
  })
}) 

// 分页
// 思路 
// 01 后台查询一共有多少条数据 根据每一页的条数 然后计算出有多少页 然后发送给前端
// 02 前端点击不同的页数 都发送请求 根据index来获得数据 (page - 1) * 条数

// 商品管理

// 添加商品
router.get('/index/addProduct', (req, res) => {
  // 得到传过来的值
  var category  = req.query.category 
  var barCode  = req.query.barCode 
  var name  = req.query.name 
  var salePrice  = req.query.salePrice 
  var marketPrice   = req.query.marketPrice  
  var stockPrice  = req.query.stockPrice 
  var stockCount  = req.query.stockCount 
  var commodityWeight  = req.query.commodityWeight 
  var commodityUnit  = req.query.commodityUnit 
  var vipDiscount  = req.query.vipDiscount 
  var goodsDesc  = req.query.goodsDesc 
  var promotion  = req.query.promotion 

  // 设置sql语句
  var sql = `INSERT INTO products(category,barCode,name,salePrice,marketPrice ,stockPrice,stockCount,commodityWeight,commodityUnit,vipDiscount,goodsDesc,promotion) VALUES('${category}','${barCode}','${name}','${salePrice}','${marketPrice }','${stockPrice}','${stockCount}','${commodityWeight}','${commodityUnit}','${vipDiscount}','${goodsDesc}','${promotion}')`
  console.log(sql)
  con.query(sql, (err, result) => {
    if(err) throw err;
    if(result){
      res.send('ok')
    }
  })
})

// 获取商品列表
router.get('/index/product', (req, res) => {
  var curPage = req.query.curPage;
  var pageSize = req.query.pageSize;
  var startIndex = (curPage - 1) * pageSize
  console.log(startIndex)
  // var sql = `SELECT * FROM products`
  var sql1 = `SELECT * FROM products LIMIT ${startIndex}, ${pageSize}`
  var sql2 = 'SELECT COUNT(*) FROM products';
  con.query(sql1, (err, data)=>{
      if(err) throw err
      if(data){
        con.query(sql2, (err, result)=>{
          if(err) throw err
          res.send({
            data : data,
            totalSize : result[0]['COUNT(*)']

          })
        })
      }
  })
})

// 商品列表搜索
router.get('/search', (req, res) => {
  // 商品类型
  var category = req.query.category;
  // 商品关键字
  var keys = req.query.keys;
  // 查询商品类型的 sql
  var sql = `SELECT * FROM products WHERE category='${category}' AND name LIKE '%${keys}%'`
  con.query(sql, (err, result) => {
    if(err) throw err
    if(result){
      res.send(result)
    }

  })

}) 



// 库存管理
// 入库
router.get('/index/addStock', (req, res) => {
  var barCode = req.query.barCode;
  var count = req.query.count;
  var stockPrice = req.query.stockPrice;

  var sql = `UPDATE products SET stockCount= stockCount + ${count} WHERE barCode='${barCode}'`

  con.query(sql, (err, result) =>{ 
    if(err) throw err
    if(result){
      res.send('ok')
    }
  })
})

// 库存管理
router.get('/index/stock', (req, res) => {
  var curPage = req.query.curPage;
  console.log(curPage)
  var pageSize = req.query.pageSize;
  console.log(pageSize)
  var startIndex = (curPage - 1) * pageSize
  console.log(startIndex)
  // var sql = `SELECT * FROM products`
  var sql1 = `SELECT * FROM products LIMIT ${startIndex}, ${pageSize}`
  var sql2 = 'SELECT COUNT(*) FROM products';
  con.query(sql1, (err, data)=>{
      if(err) throw err
      if(data){
        con.query(sql2, (err, result)=>{
          if(err) throw err
          res.send({
            data : data,
            totalSize : result[0]['COUNT(*)']

          })
        })
      }
  })
})

// 修改库存
router.get('/upDataStock', (req, res) => {
  var name = req.query.name;
  var salePrice = req.query.salePrice;
  var stockCount = req.query.stockCount;
  var barCode = req.query.barCode;

  var sql = `UPDATE products SET stockCount= stockCount + '${stockCount}', name='${name}', salePrice='${salePrice}' WHERE barCode='${barCode}'`
  console.log(sql)
  con.query(sql, (err, result) =>{ 
    if(err) throw err
    if(result){
      res.send('ok')
    }
  })
})

// 修改还刷新数据
router.get('/getCurData', (req, res) => {
  var barCode = req.query.barCode;

  var sql = `SELECT * FROM products`
  con.query(sql, (err, result) =>{ 
    if(err) throw err
    if(result){
      res.send(result)
    }
  })
})
// 出货管理
router.get('/index/exportProduct', (req, res) =>{
  var barCode = req.query.barCode;
  var num = req.query.num;
  var sql = `SELECT * FROM products WHERE barCode='${barCode}'`
  con.query(sql, (err, result)=>{
    if(err) throw err
    if(result) {
      var getObj = {};
      getObj.name = result[0].name;
      getObj.salePrice = result[0].salePrice;
      getObj.num = num;
      getObj.totalPrice = result[0].salePrice * num;
      getObj.barCode = result[0].barCode
      var discountPrice;
      //判断会员是否优惠 和 商品是否促销 
      // 会员优惠9折 上商品促销 8折
      if(result[0].vipDiscount == 1 && result[0].promotion == 1){
        discountPrice = result[0].salePrice * 0.9 * 0.8
      }else if(result[0].vipDiscount == 1){
        discountPrice = result[0].salePrice * 0.9 
      }else if(result[0].promotion == 1){
        discountPrice = result[0].salePrice * 0.8
      }else{
        discountPrice = 0;
      }
      getObj.discountPrice = parseInt(discountPrice)
      res.send(getObj)
    }
  })
})

// 商品出库
router.get('/outStock', (req, res) => {
  var name = req.query.name;
  var cardNum = req.query.cardNum;
  var orderNum = req.query.orderNum
  var sql = `INSERT INTO outStock(name, cardNum, orderNum) VALUES('${name}', '${cardNum}', '${orderNum}')`
  con.query(sql, (err, result) =>{ 
    if(err) throw err
    if(result){
      res.send(result)
    }
  })
})

// 商品出库改变仓库的数量
router.get('/changeStock', (req, res) => {
  var barCode = req.query.barCode;
  var count = req.query.count;
  var sql = `UPDATE products SET stockCount= stockCount - ${count} WHERE barCode='${barCode}'`
  console.log(sql)
  con.query(sql, (err, result) =>{ 
    if(err) throw err
    if(result){
      res.send(result)
    }
  })
})

// 退货管理
// 查询退货的订单
router.get('/getGoodsInfo', (req, res) => {
  var orderNum = req.query.orderNum;
  var sql = `SELECT * FROM outStock WHERE orderNum='${orderNum}'`
  console.log(sql)
  con.query(sql, (err, result) =>{ 
    if(err) throw err
    if(result){
      res.send(result)
    }
  })
})

// 确认退货
router.get('/deleteGoods', (req, res) => {
  var orderNum = req.query.orderNum;
  // 删除商品
  var sql = `DELETE FROM outstock WHERE orderNum='${orderNum}'`
  console.log(sql)
  con.query(sql, (err, result) =>{ 
    if(err) throw err
    if(result){
      res.send('ok')
    }
  })
})


// 销售列表
router.get('/index/sellList', (req, res) => {

  var curPage = req.query.curPage;
  var pageSize = req.query.pageSize;
  var startIndex = (curPage - 1) * pageSize
  console.log(startIndex)
  // var sql = `SELECT * FROM products`
  var sql1 = `SELECT * FROM outStock LIMIT ${startIndex}, ${pageSize}`
  var sql2 = 'SELECT COUNT(*) FROM outStock';
  con.query(sql1, (err, data)=>{
      if(err) throw err
      if(data){
        con.query(sql2, (err, result)=>{
          if(err) throw err
          res.send({
            data : data,
            totalSize : result[0]['COUNT(*)']

          })
        })
      }
  })
})

// 用户图片上传 
router.post('/upImg', (req, res)=>{
  var id = req.query.id;
  // 配置图片上传
  // 创建一个对象 并且将输出地址配置
  var form = new multiparty.Form({ uploadDir: './public/headimgs/' });

  // 监听上传是否完成 并处理
  form.parse(req, function (err, fields, files) {
      var filesTmp = JSON.stringify(files, null, 2);
      if (err) {
          console.log('parse error: ' + err);
          //错误
      }
      else {
          var inputFile = files.inputFile[0];
          var uploadedPath = inputFile.path;
          //成功
          console.log(uploadedPath)
          //注意uploadedPath路径的转化!!!!

          // 拼接字符串
          var str = uploadedPath.replace(/public\\/, 'http://172.16.14.209:3000/');
          var newStr = str.replace(/\\/, '/')
          console.log(newStr)
          // 将图片的地址储存到sql中
          var sql = `UPDATE user SET avatarUrl='${newStr}' WHERE id='${id}'`
          con.query(sql, (err, result)=>{
            if(err) throw err
            if(result){
              res.send(newStr)
            }
          })
      }
  });

})


// 会员管理
router.get('/index/addVip', (req, res) => {
  var name = req.query.name
  var cardNum = req.query.cardNum
  var phoneNum = req.query.phoneNum
  var email = req.query.email

  var sql = `INSERT INTO vipUsers(name, cardNum, phoneNum, email) VALUES('${name}', '${cardNum}', '${phoneNum}', '${email}')`
  console.log(sql)
  con.query(sql, (err, result) =>{ 
    if(err) throw err
    if(result){
      res.send('ok')
    }
  })
})

//得到会员所有数据
router.get('/index/vipAccount', (req, res) =>{
  var curPage = req.query.curPage;
  var pageSize = req.query.pageSize;
  var startIndex = (curPage - 1) * pageSize
  console.log(startIndex)
  // var sql = `SELECT * FROM products`
  var sql1 = `SELECT * FROM vipUsers LIMIT ${startIndex}, ${pageSize}`
  var sql2 = 'SELECT COUNT(*) FROM vipUsers';
  con.query(sql1, (err, data)=>{
      if(err) throw err
      if(data){
        con.query(sql2, (err, result)=>{
          if(err) throw err
          res.send({
            data : data,
            totalSize : result[0]['COUNT(*)']

          })
        })
      }
  })

})

router.get('/searchVip', (req, res) => {
  // 商品关键字
  var keys = req.query.keys;
  // 查询商品类型的 sql
  var sql = `SELECT * FROM vipUsers WHERE name LIKE '%${keys}%'`
  con.query(sql, (err, result) => {
    if(err) throw err
    if(result){
      res.send(result)
    }
  })
}) 

// 统计管理
// 库存统计
router.get('/index/purchaseSta', (req, res) => {
  // 查询sql
  var sql = `SELECT
    count(category = '1' OR NULL) AS 果汁,
    count(category = '2' OR NULL) AS 汽水,
    count(category = '3' OR NULL)  AS 香烟,
    count(category = '4' OR NULL)  AS 酒,
    count(category = '5' OR NULL)  AS 日用品
FROM products`
  con.query(sql, (err, result) => {
    if(err) throw err
    if(result){
      res.send(result)
    }
  })
}) 

// 销售统计
router.get('/index/sellList', (req, res) => {
  // 查询sql
  var sql = `SELECT
    count(category = '1' OR NULL) AS 果汁,
    count(category = '2' OR NULL) AS 汽水,
    count(category = '3' OR NULL)  AS 香烟,
    count(category = '4' OR NULL)  AS 酒,
    count(category = '5' OR NULL)  AS 日用品
FROM products`
  con.query(sql, (err, result) => {
    if(err) throw err
    if(result){
      res.send(result)
    }
  })
}) 



module.exports = router;


