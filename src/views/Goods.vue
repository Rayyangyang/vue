<template>
    <div class="goods">
        <div class="left">
            <ul class="content">
                <ul class="leftContent">
                    <li
                        v-for="(ele, i) in goodsList"
                        @click="changeSelect(ele.name)"
                        :class="{active : curSelect == ele.name }"
                    >
                        <span class="numBox" v-if='ele.listNum > 0'>{{ele.listNum}}</span>
                        <p class="text">
                            <img src="../assets/imgs/special_1@2x.png" v-show="ele.type == 2" />
                            {{ ele.name }}
                        </p>
                    </li>
                </ul>
            </ul>
        </div>
        <div class="right">
            <ul class="rightContent content">
                <li v-for="ele in goodsList" :id="ele.name" ref="box">
                    <h3>{{ele.name}}</h3>
                    <ul>
                        <li v-for="item in ele.foods" >
                            <div class="goodsLeft" @click='getGoodsInfo(item)'>
                                <img :src="item.image" class="goodsImg" />
                                <div class="goodsInfo">
                                    <h4>{{ item.name }}</h4>
                                    <p class="des">{{ item.description}}</p>
                                    <p>月售{{ item.sellCount}}份 好评率{{ item.rating +'%'}}</p>
                                    <span>
                                        <i>￥</i>
                                        {{item.price}}
                                    </span>
                                    <del v-show="item.oldPrice">￥{{ item.oldPrice }}</del>
                                </div>
                            </div>
                            <div class="control">
                                <img
                                    src="../assets/imgs/remove_circle_outline.svg"
                                    v-show="item.num"
                                    @click="changeNum(item.id, -1)"
                                />
                                <span v-show="item.num">{{ item.num }}</span>
                                <img src="../assets/imgs/add_circle.svg" @click="changeNum(item.id, 1)" />
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getGoods } from '../apis/apis'
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            curSelect: '',
            heightArr: [0],
            listArr: [],
            scrollY: 0,
        }
    },
    created() {
        // 拿去vuex中的数据
        this.$store.dispatch('getGoodsList')
        this.$nextTick(() => {
            let lis = this.$refs.box;
            var height = 0;
            for (let i = 0; i < lis.length; i++) {
                height += lis[i].clientHeight
                this.heightArr.push(height)
            }
            for (let i = 0; i < lis.length; i++) {
                this.listArr.push(lis[i].id)
            }
            console.log(this.heightArr)
        })
    },
    mounted() {
        this.scrollleft = new BScroll('.left', {
            click: true
        })
        this.scrollright = new BScroll('.right', {
            click: true,
            probeType: 3
        });
        this.scrollright.on('scroll', (pos) => {
            this.scrollY = Math.abs(pos.y);
            var hArr = this.heightArr
            for (var i = 0; i < hArr.length; i++) {
                var height1 = hArr[i];
                var height2 = hArr[i + 1];
                if (this.scrollY > height1 && this.scrollY < height2) {
                    this.curSelect = this.listArr[i]
                }
            }
        })
    },
    methods: {
        changeNum(id, val){
            this.$store.commit('changeNum', {id, val})
        },
        changeSelect(val) {
            console.log(val)
            this.curSelect = val;
            this.scrollright.scrollToElement('#' + val, 400)
        },
        getGoodsInfo(val){
            this.$router.push({name :'/goodsInfo', params :{val : val}})
        },
    },
    computed: {
        goodsList(){
            console.log(this.$store.state.goodsList)
            return this.$store.state.goodsList
        },
    }
}
</script>

<style lang="less" scoped>

.active {
    background-color: #fff;
}
.goods {
    display: flex;
    height: 100%;

    .left {
        width: 80px;
        height: 100%;
        flex-shrink: 0;
        background-color: #f3f6f6;
        overflow: auto;
        .leftContent {
            width: 100%;
            li {
                color: rgb(22, 22, 22);
                font-size: 12px;
                border-bottom: 1px solid #ccc;
                padding: 12px 10px;
                position:relative;
                .text {
                    transform: scale(0.9);
                    color: #333333;
                    line-height: 16px;
                    vertical-align: middle;
                    img {
                        width: 14px;
                        vertical-align: -1px;
                        margin: -2px -2px -2px 0;
                    }
                }
                .numBox{
                    position:absolute;
                    right:0px;
                    top:0;
                    width:15px;
                    height:15px;
                    background-color: red;
                    border-radius: 15px;
                    text-align: center;
                    line-height: 15px;
                    color:#fff;
                }
            }
        }
    }
    .right {
        flex: 1;
        height: 100%;
        overflow: auto;
        .rightContent {
            li {
                h3 {
                    line-height: 30px;
                    background-color: #f3f6f6;
                }
                ul {
                    padding-left: 10px;
                    li {
                        margin: 10px 0px;
                        display: flex;
                        justify-content: space-between;
                        .goodsLeft {
                            display: flex;
                            .goodsImg {
                                width: 65px;
                                height: 65px;
                                margin-right: 10px;
                            }
                            .goodsInfo {
                                width: 150px;
                                h4 {
                                    font-size: 14px;
                                    font-weight: 800;
                                }
                                .des {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    width: 10em;
                                }
                                span {
                                    i {
                                        font-style: normal;
                                        color: red;
                                        font-size: 12px;
                                    }
                                    font-size: 16px;
                                    color: red;
                                }
                            }
                        }
                        .control {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-right: 10px;
                            img {
                                width: 20px;
                                vertical-align: -5px;
                            }
                            span {
                                display: inline-block;
                                width: 14px;
                                font-size: 14px;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>