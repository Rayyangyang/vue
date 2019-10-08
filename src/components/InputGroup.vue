<template>
    <div class="inputgroup">
        <input
            type="text"
            :placeholder="placeholder"
            @input="$emit('input', $event.target.value)"
        />
        <button v-if="text">{{ text }}</button>
    </div>
</template>

<script>
export default {
    name: "inputGroup",
    props: ["placeholder", "text", "phone"],
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
.inputgroup {
    border: 1px solid #ccc;
    width: 70%;
    line-height: 30px;
    box-sizing: border-box;
    padding: 0 0 0 10px;
    margin-top: 20px;
    input {
        border: none;
        outline: none;
        font-size: 14px;
    }
    button {
        border: none;
        outline: none;
        background-color: #fff;
    }
}
</style>