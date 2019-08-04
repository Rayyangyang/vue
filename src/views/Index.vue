<template>
    <div id="index">
        <div class="header" :style="{backgroundImage: 'url(' + (headInfo.avatar) + ')'}">
            <div class="mark">
                <div class="top">
                    <div class="headLeft">
                        <img :src="headInfo.avatar" />
                        <div class="info">
                            <div class="title">
                                <img src="../assets/imgs/brand@2x.png" alt />
                                <h2>{{ headInfo.name }}</h2>
                            </div>
                            <h4>{{ headInfo.description + ' / ' + headInfo.deliveryTime}}分钟送达</h4>
                            <div>
                                <img src="../assets/imgs/decrease.png" />
                                <h6>{{supports}}</h6>
                            </div>
                        </div>
                    </div>

                    <div class="num">
                        {{ len }} 个
                        <img src="../assets/imgs/keyboard_arrow_right.svg" />
                    </div>
                </div>
                <div class="bulletin" @click="isShow = !isShow">
                    <img src="../assets/imgs/bulletin@2x.png" class="img1" />
                    <div class="msg">{{ headInfo.bulletin}}</div>
                    <img src="../assets/imgs/keyboard_arrow_right.svg" class="img2" />
                </div>
            </div>
        </div>
        <div class="nav">
            <router-link to="/goods">
                <span @click="selectStyle('商品')" :class="{active: selectText == '商品'}">商品</span>
            </router-link>
            <router-link to="/evaluate">
                <span @click="selectStyle('评价')" :class="{active: selectText == '评价'}">评价</span>
            </router-link>
            <router-link to="/merchant">
                <span @click="selectStyle('商家')" :class="{active: selectText == '商家'}">商家</span>
            </router-link>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
  
        <div class="tips" v-show="isShow">
            <div class="title">
                <h1>{{ headInfo.name}}</h1>
            </div>
            <div class="star">
                <span v-for="ele in starArr" :class="ele"></span>
            </div>

            <div class="discountTitle">
                <div class="line1"></div>
                <div class="line2"></div>
                <h3>优惠信息</h3>
            </div>

            <div class="discountInfo">
                <div v-for="ele in headInfo.supports">
                    <img src />
                    <span>{{ele.description}}</span>
                </div>
            </div>
            <div class="shopInfo">
                <div class="discountTitle">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <h3>商家公告</h3>
                </div>
            </div>
            <div class="des">
                <p>{{headInfo.bulletin}}</p>
            </div>
            <div class="close" @click="isShow = !isShow">
                <img src="../assets/imgs/close.svg" />
            </div>
        </div>
    </div>
</template>

<script>
import { headerInfo } from '../apis/apis'
import { getStar } from '../assets/js/getStar'
export default {
    data() {
        return {
            selectText: '',
            headInfo: '',
            isShow: false,
            starArr: [],
            len: ''
        }
    },
    async created() {
        this.headInfo = (await headerInfo()).data.data;
        // 计算star
        this.starArr = getStar(this.headInfo.score)
        this.len = this.headInfo.supports.length
        var hash = location.hash.replace('#', '')
        if (hash == '/goods') {
            this.selectText = '商品'
        } else if (hash == '/evaluate') {
            this.selectText = '评价'
        } else if (hash == '/merchant') {
            this.selectText = '商家'
        }
    },
    methods: {
        selectStyle(val) {
            this.selectText = val
        },
    },
    computed: {
        supports() {
            if (!this.headInfo.supports) return ''
            var str = ''
            for (let prop of this.headInfo.supports) {
                str += prop.description
            }
            return str;
        },
    }
}
</script>

<style lang="less" scoped>
#index {
    height: 92%;
}
.header {
    height: 26%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: 130%;
    background-position: 50%;
    position: relative;
    .mark {
        width: 100%;
        height: 100%;
        background-color: rgba(46, 46, 46, 0.8);
        padding: 35px 10px 0 10px;
        .top {
            .headLeft {
                display: flex;
            }
            display: flex;
            color: #fff;
            justify-content: space-between;
            img {
                width: 70px;
                height: 70px;
                margin-right: 10px;
                border-radius: 10px;
            }
            h4 {
                font-weight: 200;
                line-height: 20px;
            }
            .info {
                .title {
                    img {
                        width: 30px;
                        height: 20px;
                        vertical-align: -4px;
                        margin-right: 5px;
                    }
                    h2 {
                        display: inline-block;
                    }
                    margin-bottom: 4px;
                }
                img {
                    width: 20px;
                    height: 20px;
                    border-radius: 0px;
                    margin-right: -14px;
                    vertical-align: 2px;
                }
                h6 {
                    width: 200px;
                    transform: scale(0.8);
                    display: inline-block;
                    font-weight: 200;
                }
            }
            .num {
                margin-top: 60px;
                width: 50px;
                height: 30px;
                border-radius: 30px;
                background-color: #1a1a1a;
                text-align: center;
                line-height: 30px;
                img {
                    width: 10px;
                    height: 10px;
                    background-color: #fff;
                    margin-right: 0px;
                }
            }
        }
        .bulletin {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            background: rgba(27, 27, 27, 0.657);
            height: 30px;
            line-height: 30px;
            padding-left: 14px;
            .img1 {
                width: 30px;
                vertical-align: 8px;
                margin-right: 10px;
            }
            .msg {
                width: 80%;
                display: inline-block;
                color: #fff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 200;
            }
            .img2 {
                vertical-align: 8px;
                width: 14px;
                height: 14px;
                background-color: #fff;
                margin-left: 6px;
                border-radius: 14px;
            }
        }
    }
}
.nav {
    height: 7%;
    display: flex;
    justify-content: space-around;
    // line-height: 34px;
    align-items: center;
    border-bottom: 2px solid #e5e5e5;
    .active {
        color: red;
    }
    span {
        font-size: 16px;
    }
}
.content {
    height: 67%;
}
.tips {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    color: #fff;
    background-color: rgba(61, 61, 61, 0.8);
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    padding-top: 100px;
    align-items: center;

    .star {
        margin: 15px 0px;
        span {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin: 0 4px;
        }
        .ON {
            background-image: url("../assets/imgs/star24_on@2x.png");
        }
        .OFF {
            background-image: url("../assets/imgs/star24_off@2x.png");
        }
        .HALF {
            background-image: url("../assets/imgs/star24_half@2x.png");
        }
    }

    .discountTitle {
        position: relative;
        .line1 {
            position: absolute;
            bottom: -12px;
            // transform: translate(-50%, 0);
            right: 40px;
            width: 100px;
            height: 1px;
            border: 1px solid rgba(216, 216, 216, 0.568);
        }
        .line2 {
            position: absolute;
            bottom: -12px;
            left: 40px;
            width: 100px;
            height: 1px;
            border: 1px solid rgba(216, 216, 216, 0.568);
        }
        h3 {
            position: absolute;
            text-align: center;
            transform: translate(-50%, 0);
            width: 80px;
        }
    }
    .discountInfo {
        margin-top: 30px;
        span {
            display: inline-block;
            line-height: 24px;
        }
    }
    .shopInfo {
        margin-top: 20px;
    }
    .des {
        p {
            // display: inline-block;
            margin-top: 28px;
            width: 240px;
            line-height: 20px;
        }
    }
    .close {
        position: absolute;
        bottom: 50px;
        img {
            background-color: #333;
            border-radius: 30px;
            width: 30px;
        }
    }
}
</style>