<template>
    <div class="merchant">
        <div class="top">
            <div class="title">
                <div class="titleLeft">
                    <h3>{{seller.name}}</h3>
                    <Rate allow-half v-model="seller.score" />
                    月售{{seller.sellCount}}单
                </div>
                <div class="titleRight">
                    <img src alt />
                    <span>已收藏</span>
                </div>
            </div>
            <div class="price">
                <div class="startPrice">
                    <span>起送价</span>
                    <h2>
                        15
                        <span>元</span>
                    </h2>
                </div>
                <div class="sendPrice">
                    <span>商家配送</span>
                    <h2>
                        {{seller.deliveryPrice}}
                        <span>分钟</span>
                    </h2>
                </div>
                <div class="sendTime">
                    <span>平均配送时间</span>
                    <h2>
                        {{seller.deliveryTime}}
                        <span>分钟</span>
                    </h2>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="announce">
            <h3>公告与活动</h3>
            <p class="text">{{ seller.bulletin}}</p>
            <p v-for="ele in seller.supports" class="info">
                <img :src="img1" v-if="ele.type == 0" />
                <img :src="img2" v-if="ele.type == 1" />
                <img :src="img3" v-if="ele.type == 2" />
                <span>{{ele.description}}</span>
            </p>
        </div>
        <div class="line"></div>
        <div class="sellerImg">
            <h2>商家实景</h2>
            <div class="wrapper">
                <ul class="content">
                    <div class="imgBox">
                        <img :src="ele" v-for="ele in seller.pics" />
                    </div>
                </ul>
            </div>
        </div>
        <div class="line"></div>
        <div class="sellerInfo">
            <h2>商家信息</h2>
            <div class="wrapper">
                <p v-for="ele in seller.infos">{{ele}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import { headerInfo } from '../apis/apis'
export default {
    data() {
        return {
            seller: '',
            valueHalf: 2.5,
            img1: require('../assets/imgs/decrease.png'),
            img2: require('../assets/imgs/discount_1@3x.png'),
            img3: require('../assets/imgs/special_1@2x.png')
        }
    },
    async created() {
        this.seller = (await headerInfo()).data.data;
        console.log(this.seller)

    },
    computed: {


    },
    mounted() {
        let scrollright = new BScroll('.wrapper', {
            click: true,
            scrollX: true,
             scrollY: false,
            eventPassthrough: "vertical"
        });
    }
}
</script>

<style lang="less" scoped>
.merchant {
    overflow: auto;
    height: 100%;
}
.top {
    margin-top: 10px;
    padding: 0 10px;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .price {
        line-height: 30px;
        display: flex;
        justify-content: space-around;
        text-align: center;
        div {
            flex: 1;
        }
        div > span {
            color: #999;
        }
        span {
            font-size: 14px;
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
.announce {
    padding: 0 10px;

    .text {
        color: #e66a71;
        margin-bottom: 10px;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
    }
    .info {
        margin: 14px 0px;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
    }
    img {
        width: 20px;
        vertical-align: -6px;
    }
}
.sellerImg {
    padding: 0 10px;

    width: 100%;
    .imgBox {
        margin: 10px;
        display: flex;
        img {
            margin: 0 10px;
        }
    }
    .wrapper {
        width: 100%;
        overflow: auto;
    }
}
.sellerInfo{
    padding: 0 10px;

    p{
        line-height: 44px;
        border-bottom:1px solid #ccc;
    }
}
</style>