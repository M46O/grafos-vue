<template>
  <div>
    <input v-model="message" class="form-control" placeholder="" />
    <button class="btn btn-primary mb-2" v-on:click="AddVectorAristas">
      Agregar al vector de aristas
    </button>

    <input v-model="message2" class="form-control" placeholder="" />

    <button class="btn btn-primary mb-2" v-on:click="AddVector2">
      Agregar al vector de aristas
    </button>
    <!-- <p>Los valores del vector de las aristas es de: {{ Aristas }}</p> -->
  </div>
</template>

<script>
module.exports = {
  name: "text",
  data() {
    return {
      message: "",
      message2: "",
      Aristas: [],
      Vertices: [],
    };
  },
  mounted() {
    window.TextComponent = this;
    // window.TextComponent.Aristas = this.Aristas;
    // window.TextComponent.Vertices = this.Vertices;
  },
  methods: {
    AddVectorAristas() {
      const myArray = this.message.split(",");
      this.ssss = this.message.split(",");
      console.log(myArray);
      var i = 0;
      for (i; i <= myArray.length; i++) {
        console.log();
        if (!isNaN(myArray[i])) {
          this.Aristas.push(myArray[i]);
        }
      }
      this.message = "";
    },
    AddVector2() {
      const myArray = this.message2.split(",");
      this.ssss = this.message2.split(",");
      console.log(myArray);
      var i = 0;
      for (i; i <= myArray.length; i++) {
        console.log();
        if (!isNaN(myArray[i])) {
          this.Vertices.push(myArray[i]);
        }
      }
    },
  },
};
</script>
