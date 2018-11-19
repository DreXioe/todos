<script>
export default {
  name: "vuetify2",
  data() {
    return {
      todo: ""
    };
  },
  methods: {
    submitHanlder() {
      if (!this.todo) return;
      this.$store.commit("ADD_TODOS", {
        content: this.todo,
        done: false
      });
      this.todo = null;
    }
  }
};
</script>

<template src="./template.html">
    
</template>

