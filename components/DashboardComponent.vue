<template>
    <graph-index-component></graph-index-component>
</template>

<script>
module.exports = {
    components: {
        'graph-index-component': httpVueLoader('./Graph/GraphIndexComponent.vue')
    }
}
</script>

<style>
</style>