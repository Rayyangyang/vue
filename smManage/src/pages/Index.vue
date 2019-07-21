<template>
    <div id="index">
        <div class="head">
            <h2>哇哈哈超市管理系统</h2>
            <div class="user">
                <img :src="imgsrc" alt="" @click="dialogFormVisible = true" class="headImg">
                <em>{{ username }}</em>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <el-menu
                    unique-opened
                    :default-active="active"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="rgb(5, 137, 189)"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router
                >
                    <el-submenu
                        :index="item.index"
                        v-for="(item, key) in treeList"
                        :key="key"
                        v-show="item.userGroup.indexOf(userGroup) != -1"
                    >
                        <template slot="title">
                            <i :class="item.cls"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item
                                v-for="(child, i) in item.child"
                                :key="i"
                                :index="child.url"
                            >{{ child.name}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
        <!-- 弹出框 -->
        <el-dialog title="个人中心" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                    <el-input v-model="form.userGroup" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="头像" :label-width="formLabelWidth">
                    <el-upload
                        class="avatar-uploader"
                        :action="action"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        name ='inputFile'
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 图像相关
            action: '',
            imgsrc: '',
            imageUrl: '',
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                name: '',
                userGroup : '',
                avatarUrl : ''
            },
            formLabelWidth: '120px',
            username: '请登录',
            // 配置刷新
            active: "/index/product",
            // 保存 usergGroup 用户权限
            userGroup: '',
            treeList: [
                {
                    index: "1",
                    cls: "el-icon-menu",
                    title: "商品管理",
                    child: [
                        { url: "/index/product", name: "商品管理" },
                        { url: "/index/addProduct", name: "添加商品" }
                    ],
                    // 设置用户权限数组 
                    userGroup: ['1', '2']
                },
                {
                    index: "2",
                    cls: "el-icon-circle-plus",
                    title: "进货管理",
                    child: [
                        { url: "/index/stock", name: "库存管理" },
                        { url: "/index/addStock", name: "添加库存" }
                    ],
                    userGroup: ['1', '2']
                },
                {
                    index: "3",
                    cls: "el-icon-remove",
                    title: "出货管理",
                    child: [
                        { url: "/index/sellList", name: "销售列表" },
                        { url: "/index/exportProduct", name: "商品出库" },
                        { url: "/index/returnGoods", name: "商品退货" }
                    ],
                    userGroup: ['1', '2']
                },
                {
                    index: "4",
                    cls: "el-icon-pie-chart",
                    title: "统计管理",
                    child: [
                        { url: "/index/sellSta", name: "销售统计" },
                        { url: "/index/purchaseSta", name: "进货统计" },
                    ],
                    userGroup: ['1', '3']
                },
                {
                    index: "5",
                    cls: "el-icon-female",
                    title: "账号管理",
                    child: [
                        { url: "/index/account", name: "账号管理" },
                        { url: "/index/addAccount", name: "添加账号" },
                        { url: "/index/changePwd", name: "密码修改" },
                    ],
                    userGroup: ['1']
                },
                {
                    index: "6",
                    cls: "el-icon-s-custom",
                    title: "会员管理",
                    child: [
                        { url: "/index/vipAccount", name: "账号管理" },
                        { url: "/index/addVip", name: "添加账号" },
                    ],
                    userGroup: ['1']
                },
            ],
        };
    },
    created() {
        // 个人中心
        this.action = 'http://localhost:3000/upImg?id=' + localStorage.getItem('id');
        console.log(this.action)
        this.form.name = localStorage.getItem('acc')
        this.form.userGroup = localStorage.getItem('userGroup') == 1 ? '超级管理员' : '管理员'

        // 设置默认的用户头像
        console.log(localStorage.getItem('avatarUrl'))
        if(localStorage.getItem('avatarUrl') == 'undefined'){
            this.imgsrc = require('@/assets/images/1.jpg')
        }else{
             this.imgsrc = localStorage.getItem('avatarUrl');
        }
        this.active = location.hash.replace("#", "");
        this.userGroup = localStorage.getItem('userGroup')
        // 发送token 验证是否过期
        var token = localStorage.getItem('token');
        this.http.get('/getToken', { params: { token: token } })
            .then(res => {
                if (res.data == 'inTime') {
                    this.username = localStorage.getItem('acc')
                } else {
                    this.username = '请登录'
                    this.open('登录已经过期,请重新的登录')
                }
            })
    },
    methods: {
        handleOpen(key, keyPath) { },
        handleClose(key, keyPath) { },
        open(info) {
            this.$alert(info, {
                confirmButtonText: '确定',
                callback: action => {
                    this.$router.push('/')
                }
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            localStorage.setItem('avatarUrl', res)
            this.imgsrc = res;

        },
        beforeAvatarUpload(file) {
        }
    }
};
</script>

<style lang="less" scoped>
    .headImg{
        width:40px;
        vertical-align: -13px;
        margin-right:10px;
    }
i {
    color: #fff;
}
#index {
    width: 100%;
    height: 100%;
    .head {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        align-items: center;
        height: 8%;
        background: rgb(26, 219, 253);
        color: #fff;
        span {
            font-size: 25px;
            margin-right: 10px;
            vertical-align: -2px;
        }
        em {
            font-style: normal;
        }
    }
    .content {
        display: flex;
        height: 92%;
        .left {
            width: 200px;
            height: 100%;
            flex-shrink: 0;
            flex-grow: 0;
            background-color: rgb(5, 137, 189);
        }
        .right {
            height: 100%;
            width: 100%;
            background-color: rgb(240, 240, 240);
            overflow: auto;
        }
    }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>