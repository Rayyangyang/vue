<template>
    <div class="inpBox">
        <div class="inputgroup" :class="{'redBorder' : error}">
            <input
                type="text"
                :placeholder="placeholder"
                @input="$emit('input', $event.target.value)"
            />
            <button v-if="text" @click="$emit('btnClick')" :disabled = 'disabled'>{{ text }}</button>
        </div>
        <div class="error" v-show="error">{{error}}</div>
    </div>
</template>

<script>
export default {
    name: "inputGroup",
    props: ["placeholder", "text", "phone", "error","disabled"],
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
.inpBox {
    position: relative;
    width: 70%;
}
.inputgroup {
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
    line-height: 30px;
    box-sizing: border-box;
    padding: 0 0 0 10px;
    margin-bottom: 30px;
    input {
        border: none;
        outline: none;
        font-size: 14px;
        width: 66%;
    }
    button {
        margin-right: 2px;
        border: none;
        outline: none;
        background-color: #fff;
    }
}
.redBorder {
    border-color: red;
}
.error {
    width: 70%;
    font-size: 14px;
    color: red;
    position: absolute;
    bottom: 8px;
}
</style>