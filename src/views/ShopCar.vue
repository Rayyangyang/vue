<template>
    <div class="shopCarBox">
        <!-- <h2>购物车</h2> -->
        <div class="shopCar">
            <div class="shopCarImg" @click="showBox">
                <span class="empty" v-if="goodsList.length == 0 ">
                    <i class="iconfont icon-shop_car"></i>
                </span>
                <span class="has" v-if="goodsList.length >0">
                    <i class="iconfont icon-shop_car"></i>
                    <span v-if="goodsList.length > 0">
                        <!-- <em>1</em> -->
                        {{ getNum}}
                    </span>
                </span>
            </div>
            <div class="totalPriceBox">
                <div class="sendPriceTotalPrice">
                    ￥
                    <span>{{getTotalPrice}}</span>
                </div>
                <div class="goCount1" v-if="goodsList.length >0">
                    <span>去结算</span>
                </div>
                <div class="goCount2" v-if="goodsList.length == 0">
                    ￥0元起送
                    <span></span>
                </div>
            </div>
        </div>

        <transition name="slide-fade">
            <div class="goodsBox" v-show="isShow">
                <ul>
                    <li v-for="ele in goodsList">
                        <div class="namePriceBox">
                            <h3>{{ele.name}}</h3>
                            <span class="totalPrice">￥{{ele.price * ele.num}}</span>
                        </div>

                        <div class="control">
                            <img
                                src="../assets/imgs/remove_circle_outline.svg"
                                v-show="ele.num"
                                @click="changeNum(ele.id, -1)"
                            />
                            <span v-show="ele.num">{{ ele.num }}</span>
                            <img src="../assets/imgs/add_circle.svg" @click="changeNum(ele.id, 1)" />
                        </div>
                    </li>
                </ul>
            </div>
        </transition>
        <div class="mark" v-show="isShow" @click="hide"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: 0,
            isShow: false,

        }
    },
    computed: {
        goodsList() {
            return this.$store.getters.getCarList;
            console.log(this.$store.getters.getCarList)
        },
        getTotalPrice() {
            var price = 0;
            this.goodsList.forEach(ele => {
                price += ele.price * ele.num
            })
            return price
        },
        getNum(){
            var count = 0;
            this.goodsList.forEach(ele =>{
                count += ele.num
            })
            return count
        }
    },
    methods: {
        showBox() {
            if (this.goodsList.length > 0) {
                this.isShow = !this.isShow

            }
        },
        changeNum(id, val) {
            this.$store.commit('changeNum', { id, val })
        },
        hide() {
            this.isShow = !this.isShow
        }
    }
}
</script>

<style lang="less" scoped>
@import url("../assets/fonts/iconfont.css");
.shopCarBox {
    z-index: 99;
    position: relative;
}
.shopCar {
    z-index: 99;
    position: fixed;
    bottom: 0px;
    height: 8%;
    width: 100%;
    background-color: #333;
    .totalPriceBox {
        padding-left: 130px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .sendPriceTotalPrice {
            color: #fff;
            font-size: 14px;
            font-weight: 200;
            span {
                font-size: 22px;
            }
        }
        .goCount2 {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            width: 100px;
            font-size: 16px;
            height: 100%;
            text-align: center;
            background-color: #333;
            color: #ccc;
        }
        .goCount1 {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            width: 100px;
            font-size: 16px;
            height: 100%;
            color: #333;
            background-color: rgb(255, 218, 8);
        }
    }
}
.shopCarImg {
    position: absolute;
    z-index: 99;
    span {
        display: inline-block;
        width: 60px;
        height: 60px;
        border-radius: 60px;
        text-align: center;
        line-height: 60px;
        background-color: #ccc;
        position: absolute;
        top: -18px;
        left: 24px;
        i {
            font-size: 30px;
        }
    }
    .has {
        background-color: #fff;
        position: relative;
        i {
            color: rgb(255, 218, 8);
        }
        span {
            display: inline-block;
            position: absolute;
            top: -5px;
            left: 38px;
            width: 20px;
            height: 20px;
            border-radius: 20px;
            line-height: 20px;
            background-color: red;
            color:#fff;
        }
    }
}
.goodsBox {
    width: 100%;
    // height: 100px;
    z-index: 1;
    max-height: 250px;
    background: #fff;
    position: absolute;
    bottom: 0;
    overflow: auto;

    ul {
        padding: 0 15px;
        li {
            margin: 4px 0;
            line-height: 42px;
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .namePriceBox {
                width: 70%;
                display: flex;
                justify-content: space-between;
                h3 {
                    color: #333;
                }
                .totalPrice {
                    color: red;
                    font-size: 18px;
                }
            }
        }
    }
    // 增加 减少
    .control {
        margin-right: 4px;
        img {
            width: 20px;
            vertical-align: -5px;
        }
        span {
            display: inline-block;
            width: 14px;
            font-size: 16px;
            text-align: center;
        }
    }
}
.mark {
    width: 100%;
    height: 1000px;
    background-color: rgba(49, 49, 49, 0.644);
    position: absolute;
    bottom: 0;
    left: 0;
}

// 动画
.slide-fade-enter-active {
    transition: all 0.4s ease;
}
.slide-fade-leave-active {
    transition: all 0.4s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(40px);
    opacity: 0;
}
</style>