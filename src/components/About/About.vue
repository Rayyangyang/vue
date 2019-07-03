<template>
    <div class="about">
        <div class="row">
            <div class="col-md-3">
                <ul class="nav nav-pills nav-stacked">
                    <li role="presentation">
                        <router-link to="/about/contact">联系我们</router-link>
                    </li>
                    <li role="presentation">
                        <router-link to="/about/history">历史订单</router-link>
                    </li>
                    <li role="presentation">
                        <router-link to="/about/express">快递信息</router-link>
                    </li>
                    <li role="presentation">
                        <router-link to="/about/info">公司信息</router-link>
                    </li>
                </ul>
            </div>
            <div class="col-md-9">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
