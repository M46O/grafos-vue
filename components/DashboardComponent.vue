<template>
  <div>
    <text-component></text-component>
    <graph-component></graph-component>
  </div>
</template>

<script>
module.exports = {
  components: {
    "graph-component": httpVueLoader("./GraphComponent.vue"),
    "text-component": httpVueLoader("./VectorInsertComponent.vue"),
  },
};
</script>

<style>
</style>