<template>
  <div>
    <form @submit="createEdge()">
      <div class="row p-2 g-3">
        <div class="col-md-12">
          <label class="form-label">Agregar Arista:</label>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="P. Vértice" required minlength="1" v-model="edgeForm.edgeA" />
            <span class="input-group-text">➜</span>
            <input type="text" class="form-control" placeholder="S. Vértice" required minlength="1" v-model="edgeForm.edgeB" />
            <span class="input-group-text">=</span>
            <input type="number" class="form-control" placeholder="Valor" min="0" required v-model="edgeForm.value" />
          </div>
        </div>
      </div>
      <div class="row p-2 g-2 d-flex justify-content-center">
        <div class="col-md-2 d-grid">
          <button type="submit" class="btn btn-primary">Agregar</button>
        </div>
        <div class="col-md-2 d-grid">
          <button type="reset" class="btn btn-danger" @click="clear()">
            Limpiar
          </button>
        </div>
      </div>
      <div class="row p-2 g-3">
        <div class="col-md-12">
          <graph-table-component :graph="graph"></graph-table-component>
        </div>
      </div>
    </form>
    <hr>
    <form v-if="graph && graph.nodes.length > 0" @submit="searchRoute()">
      <div class="row p-2 g-3">
        <div class="col-md-12">
          <label class="form-label">Buscar Ruta de Menor Peso:</label>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="P. Vértice" required minlength="1" v-model="searchForm.edgeA" />
            <span class="input-group-text">➜</span>
            <input type="text" class="form-control" placeholder="S. Vértice" required minlength="1" v-model="searchForm.edgeB" />
          </div>
        </div>
      </div>
      <div class="row p-2 g-2 d-flex justify-content-center">
        <div class="col-md-2 d-grid">
          <button type="submit" class="btn btn-success">Buscar</button>
        </div>
      </div>
      <div class="row p-2 g-3">
        <div class="col-md-12">
            <ul class="list-group">
                <li class="list-group-item" v-for="(item, index) in routeGraph" :key="index">
                  Arista: {{item.edge}} - Vértice: {{item.vertex}} - Distancia: {{item.distance}}
                </li>
            </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
module.exports = {
  components: {
    "graph-table-component": httpVueLoader("./GraphTableComponent.vue"),
  },
  data() {
    return {
      graph: null,
      edgeForm: {
        edgeA: null,
        edgeB: null,
        value: null,
      },
      searchForm: {
        edgeA: 'X1',
        edgeB: 'KL',
      },
      routeGraph: []
    };
  },

  mounted() {
    this.graph = new Graph(false);

    this.graph.addNode("R4");
    this.graph.addNode("KL");
    this.graph.addNode("JT");
    this.graph.addNode("RG");
    this.graph.addNode("H9");

    this.graph.addNode("F7");
    this.graph.addNode("X2");
    this.graph.addNode("A4");
    this.graph.addNode("Y6");
    this.graph.addNode("A2");

    this.graph.addNode("O10");
    this.graph.addNode("O9");
    this.graph.addNode("F4");
    this.graph.addNode("H5");
    this.graph.addNode("H3");

    this.graph.addNode("R9");
    this.graph.addNode("R5");
    this.graph.addNode("R10");
    this.graph.addNode("LL");
    this.graph.addNode("U8");

    this.graph.addNode("D4");
    this.graph.addNode("U7");
    this.graph.addNode("T5");
    this.graph.addNode("T6");
    this.graph.addNode("E4");
    this.graph.addNode("X1");

    this.graph.addEdge("R4", "KL", 5);
    this.graph.addEdge("KL", "JT", 6);
    this.graph.addEdge("JT", "RG", 5);
    this.graph.addEdge("RG", "H9", 4);
    this.graph.addEdge("H9", "F7", 5);
    this.graph.addEdge("F7", "X2", 9);
    this.graph.addEdge("X2", "A4", 8);
    this.graph.addEdge("A4", "Y6", 8);
    this.graph.addEdge("A4", "A2", 7);
    this.graph.addEdge("A2", "O10", 7);
    this.graph.addEdge("A2", "O9", 8);
    this.graph.addEdge("O10", "O9", 7);
    this.graph.addEdge("O9", "F4", 7);
    this.graph.addEdge("F4", "H5", 6);
    this.graph.addEdge("F4", "H3", 4);
    this.graph.addEdge("A2", "R9", 6);
    this.graph.addEdge("R9", "R5", 5);
    this.graph.addEdge("R5", "R10", 5);
    this.graph.addEdge("R5", "U8", 3);
    this.graph.addEdge("R5", "T5", 4);
    this.graph.addEdge("R10", "LL", 5);
    this.graph.addEdge("U8", "LL", 6);
    this.graph.addEdge("U8", "D4", 5);
    this.graph.addEdge("D4", "U7", 3);
    this.graph.addEdge("T5", "T6", 4);
    this.graph.addEdge("R9", "X1", 6);
    this.graph.addEdge("X1", "T5", 7);
    this.graph.addEdge("X1", "E4", 6);

    this.graph = Object.assign(
        Object.create(Object.getPrototypeOf(this.graph)),
        this.graph
      );
  },

  methods: {
    createEdge() {
      window.event.preventDefault();

      if (this.graph.hasEdge(this.edgeForm.edgeA, this.edgeForm.edgeB)) {
        if (!confirm(`Ya cuenta con una arista entre ${this.edgeForm.edgeA} ➜ ${this.edgeForm.edgeB}. ¿Desea Remplazar el Valor?`)) {
            return;
        }

        this.graph.removeEdge(this.edgeForm.edgeA, this.edgeForm.edgeB);
      }

      if (!this.graph.findNode(this.edgeForm.edgeA)) {
        this.graph.addNode(this.edgeForm.edgeA);
      }

      if (!this.graph.findNode(this.edgeForm.edgeB)) {
        this.graph.addNode(this.edgeForm.edgeB);
      }

      this.graph.addEdge(
        this.edgeForm.edgeA,
        this.edgeForm.edgeB,
        this.edgeForm.value
      );

      this.graph = Object.assign(
        Object.create(Object.getPrototypeOf(this.graph)),
        this.graph
      );
    },

    searchRoute() {
        window.event.preventDefault();

        if (!this.graph.findNode(this.searchForm.edgeA)) {
            alert(`El vértice ${this.searchForm.edgeA} no existe`);
        } else

        if (!this.graph.findNode(this.searchForm.edgeB)) {
            alert(`El vértice ${this.searchForm.edgeB} no existe`);
        } else 
        
        if (this.graph.findNode(this.searchForm.edgeA) === this.graph.findNode(this.searchForm.edgeB)) {
            alert(`El primer vértice es igual al segundo vértice ingresado.`);
        } else {
            this.routeGraph = this.graph.dijkstra(this.searchForm.edgeA, this.searchForm.edgeB);
        }
    },

    clear() {
      this.edgeForm = {
        edgeA: null,
        edgeB: null,
        value: null,
      };

      this.searchForm = {
        edgeA: null,
        edgeB: null,
      };

      this.routeGraph = [];

      this.graph = new Graph(false);

      this.graph = Object.assign(
        Object.create(Object.getPrototypeOf(this.graph)),
        this.graph
      );
    },
  },
};
</script>

<style>
</style>