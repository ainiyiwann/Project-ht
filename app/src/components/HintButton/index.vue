<template>
<a :title="title" style="margin:10px">
    <!-- $attrs为设置的所以属性 -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
</a>
</template>

<script>
export default {
    name:'HintButton',
    props:['title']
}
</script>

<style>

</style>