<template>
    <div class="goodsInfo">
        <ul class="content">
            <div class="box">
                <div class="img">
                    <span class="back" @click='back'><</span>

                    <img :src="goods.image" />
                </div>
                <div class="content1">
                    <h2>{{goods.name}}</h2>
                    <p>月售{{goods.sellCount}}份 好评率{{goods.rating}}%</p>
                    <div class="price">
                        <div class="priceLeft">
                            <span>￥{{goods.price}}</span>
                            <del v-show="goods.oldPrice">￥{{goods.oldPrice}}</del>
                        </div>
                        <div class="addCar">
                            <Button type="primary">加入购物车</Button>
                        </div>
                    </div>
                </div>
                <div class="line"></div>
                <div class="des">
                    <h3>商品介绍</h3>
                    <p>{{goods.info}}</p>
                </div>
                <div class="line"></div>
                <div class="evaluate">
                    <div class="control">
                        <button class="all" @click="changeBtnText('全部')">全部 {{goods.ratings.length}}</button>
                        <button class="good" @click="changeBtnText('满意')">满意 {{getGoodLen}}</button>
                        <button class="bad" @click="changeBtnText('不满意')">不满意 {{getBadLen}}</button>
                    </div>
                    <div class="evaluateInfo">
                        <ul class="content">
                            <ul class="evaluateInfoContent">
                                <li v-for="ele in goods.ratings">
                                    <img :src="ele.avatar" class="userImg" />
                                    <div class="content">
                                        <div class="name">
                                            <span class="username">{{ele.username}}</span>
                                            <span class="time">{{getTime(ele.rateTime)}}</span>
                                        </div>
                                        <h4 class="text" v-show="ele.text">{{ele.text}}</h4>
                                        <div class="goodsArr">
                                            <img
                                                src="../assets/imgs/thumb_up.svg"
                                                v-show="ele.score >=3"
                                            />
                                            <img
                                                src="../assets/imgs/thumb_down.svg"
                                                v-show="ele.score <3"
                                            />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            goods: this.$route.params.val
        }
    },
    computed: {
        getGoodLen() {
            var num = 0;
            this.goods.ratings.forEach(ele => {
                if (ele.score > 2) {
                    num++
                }
            })
            return num
        },
        getBadLen() {
            var num = 0;
            this.goods.ratings.forEach(ele => {
                if (ele.score <= 2) {
                    num++
                }
            })
            return num
        },
    },
    methods: {
        get() {
            console.log(this.goods)
        },
        getTime(val) {
            var date = new Date(val)
            var time = date.toLocaleString()
            return time;
        },
        back(){
            console.log(11)
            this.$router.push('/goods')
        }
    },
    mounted() {
        this.scrollright = new BScroll('.goodsInfo', {
            click: true,
        });
    }
}
</script>

<style lang="less" scoped>
.goodsInfo {
    height: 100%;
    position: relative;
    z-index: 10;
    .img {
        width: 100%;
        height: 200px;
        overflow: hidden;
        img {
            width: 100%;
            transform: translate(0%, -20%);
        }
        span {
            display: inline-block;
            width: 40px;
            height: 40px;
            position: absolute;
            top: 0px;
            left: 10px;
            color: rgb(195, 194, 194);
            font-size: 40px;
            z-index: 999;
        }
    }
    .content1 {
        padding: 10px 10px 0 10px;
        p {
            margin-bottom: 20px;
        }
        .price {
            display: flex;
            justify-content: space-between;
            .priceLeft {
                span {
                    color: red;
                    font-size: 16px;
                    margin-right: 10px;
                }
            }
        }
    }
    .line {
        height: 16px;
        width: 100%;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background-color: #f3f6f6;
        margin: 10px 0px;
    }
    .des {
        padding: 0 10px;
        p {
            padding: 0 16px;
            line-height: 18px;
        }
    }
    .evaluate {
        .control {
            margin: 0 20px;
            margin-top: 8px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 8px;
            button {
                width: 60px;
                height: 30px;
                outline: none;
                border: none;
                color: #fff;
                margin-right: 10px;
            }
            .all {
                background-color: #00a1dc;
            }
            .good {
                background: #cceef7;
                color: #333;
            }
            .bad {
                background-color: #ececec;
                color: #333;
            }
        }
        .evaluateInfo {
            border-top: 1px solid #ccc;
            height: 220px;
            overflow: auto;
            .evaluateInfoContent {
                padding-top: 10px;
                li {
                    display: flex;
                    padding: 10px 10px;
                    .userImg {
                        width: 20px;
                        height: 20px;
                    }
                    .content {
                        flex-grow: 1;
                        padding: 0 10px;
                        p {
                            transform: scale(0.8);
                            margin-left: -30px;
                        }
                        .name {
                            display: flex;
                            justify-content: space-between;
                            span {
                                display: block;
                            }
                            .time {
                                color: #999;
                            }
                        }
                        .text {
                            width: 90%;
                            margin: 4px 0;
                        }
                        .goodsArr {
                            img {
                                width: 14px;
                                vertical-align: 4px;
                                margin-right: 4px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>