<template>
    <div>
        <div class="score">
            <div class="totalScore">
                <h1>3.9</h1>
                <h3>综合评分</h3>
                <p>高于周边商家{{headInfo.rankRate}}%</p>
            </div>
            <div class="right">
                <p>
                    服务态度
                    <span v-for="ele in starArr1" :class="ele"></span>
                    <i>{{headInfo.serviceScore}}</i>
                </p>
                <p>
                    商品评分
                    <span v-for="ele in starArr2" :class="ele"></span>
                    <i>{{headInfo.foodScore}}</i>
                </p>
                <p>
                    送达时间
                    {{ headInfo.deliveryTime}}
                    分钟
                </p>
            </div>
        </div>
        <div class="line"></div>
        <div class="evaluate">
            <div class="control">
                <button class="all" @click="changeBtnText('全部')">全部 {{ratings.length}}</button>
                <button class="good" @click="changeBtnText('满意')">满意 {{getGoodLen}}</button>
                <button class="bad" @click="changeBtnText('不满意')">不满意 {{getBadLen}}</button>
            </div>
            <div class="just">
                <Checkbox v-model="single" @on-change="changeSingle()">只看有内容的评价</Checkbox>
            </div>
            <div class="evaluateInfo">
                <ul class="content">
                    <ul class="evaluateInfoContent">
                        <li v-for="ele in newArr">
                            <img :src="ele.avatar" class="userImg" />
                            <div class="content">
                                <div class="name">
                                    <span class="username">{{ele.username}}</span>
                                    <span class="time">{{getTime(ele.rateTime)}}</span>
                                </div>
                                <p>
                                    <span class="star">
                                        <Rate allow-half v-model="ele.score" />
                                    </span>
                                    <span v-show="ele.deliveryTime">{{ele.deliveryTime}}分钟送达</span>
                                </p>
                                <h4 class="text" v-show="ele.text">{{ele.text}}</h4>
                                <div class="goodsArr">
                                    <img src="../assets/imgs/thumb_up.svg" v-show="ele.score >=3" />
                                    <img src="../assets/imgs/thumb_down.svg" v-show="ele.score <3" />
                                    <span v-for="item in ele.recommend">{{item}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { headerInfo, getRatings } from '../apis/apis'
import { getStar } from '../assets/js/getStar'
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            headInfo: '',
            starArr1: [],
            starArr2: [],
            ratings: [],
            single: false,
            newArr: [],
            btnText: '全部'
        }
    },
    async created() {
        this.headInfo = (await headerInfo()).data.data;
        this.ratings = (await getRatings()).data.data;
        this.newArr = this.ratings;
        // 计算star
        this.starArr1 = getStar(this.headInfo.serviceScore)
        this.starArr2 = getStar(this.headInfo.foodScore)
    },
    mounted() {
        let scroll1 = new BScroll('.evaluateInfo')
    },
    computed: {
        getGoodLen() {
            var num = 0;
            this.ratings.forEach(ele => {
                if (ele.score > 2) {
                    num++
                }
            })
            return num
        },
        getBadLen() {
            var num = 0;
            this.ratings.forEach(ele => {
                if (ele.score <= 2) {
                    num++
                }
            })
            return num
        },
        filterText() {

        },
    },
    methods: {
        getTime(val) {
            var date = new Date(val)
            var time = date.toLocaleString()
            return time;
        },
        changeBtnText(val) {
            this.btnText = val;

            if (this.btnText == '全部') {
                if (this.single) {
                    this.newArr.filter(ele => {
                        return ele.text.length > 0
                    })
                } else {
                    this.newArr = this.ratings
                }
            } else if (this.btnText == '满意') {
                this.newArr = this.ratings.filter(ele => {
                    return ele.score >= 3
                })
            } else if (this.btnText == '不满意') {
                this.newArr = this.ratings.filter(ele => {
                    return ele.score < 3
                })
            }
        },
        changeSingle() {
            var arr = this.newArr;
            if (this.single) {
                this.newArr = this.newArr.filter(ele => {
                    return ele.text.length > 0
                })
            } else {
                this.newArr = arr;
            }
        }
    }
}
</script>

<style lang="less" scoped>
// star 样式
.ON {
    background-image: url("../assets/imgs/star24_on@2x.png");
}
.OFF {
    background-image: url("../assets/imgs/star24_off@2x.png");
}
.HALF {
    background-image: url("../assets/imgs/star24_half@2x.png");
}

.score {
    display: flex;
    padding: 8px 20px;
    border-bottom: 1px solid #ccc;
    .totalScore {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid #ccc;
        padding-right: 20px;
        h1 {
            color: #fb9500;
        }
    }
    .right {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: space-around;
        span {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin: 0 2px;
            background-size: cover;
        }
        i {
            font-style: normal;
            font-size: 12px;
            color: #fb9500;
            margin-left: 4px;
        }
    }
}
.line {
    height: 10px;
    background-color: #f3f6f6;
    width: 100%;
    border-bottom: 1px solid #ccc;
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
    .just {
        padding: 10px 20px;
        color: #969797;
    }
    .evaluateInfo {
        border-top: 1px solid #ccc;
        height: 220px;
        overflow: auto;
        .evaluateInfoContent {
            padding-top: 10px;
            li {
                display: flex;
                padding: 0 10px;
                .userImg {
                    width: 20px;
                    height: 20px;
                }
                .content {
                    flex-grow: 1;
                    padding: 0 10px;
                    p {
                        transform: scale(0.8);
                        margin-left:-30px;
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
                        span {
                            display: inline-block;
                            width: 50px;
                            height: 20px;
                            border: 1px solid #ccc;
                            margin: 0 2px;
                            text-align: center;
                            line-height: 20px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-weight: 200;
                        }
                    }
                }
            }
        }
    }
}
</style>