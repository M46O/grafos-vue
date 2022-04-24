<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" v-for="(node, index) in graph.nodes" :key="index + '_col'">
            {{ node }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(node, index) in graph.nodes" :key="index + '_row'">
          <th scope="row">{{ node }}</th>
          <td v-for="(nodeKey, index) in graph.nodes" :key="index" :class="{'table-success': graph.hasEdge(node, nodeKey)}">
            {{ graph.hasEdge(node, nodeKey) ? graph.getEdgeWeight(node, nodeKey) : '' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
module.exports = {
  props: {
    graph: {
      require: true,
    },
  },
};
</script>

<style>
</style>