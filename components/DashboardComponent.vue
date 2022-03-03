<template>
    <graph-component></graph-component>
</template>

<script>
module.exports = {
    components: {
        'graph-component': httpVueLoader('./GraphComponent.vue')
    }
}
</script>

<style>

</style>