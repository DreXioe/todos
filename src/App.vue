<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app></v-navigation-drawer>
      <v-toolbar app></v-toolbar>
      <v-content>
       <v-container fluid>
          <v-tabs fixed-tabs>
            <v-tab 
              v-for="(n,index) in todoTabs"
              :key="index" :to="n.link"
            >
              {{ n.text }}
            </v-tab>
          </v-tabs>
          <Todoinput/>
          <div>
            <TodolistItem v-for="index in todoIndex" :key="index" :index="index"/>
          </div>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
  </div>
</template>

<script>
import Todoinput from "@/components/Todoinput/index.vue";
import TodolistItem from "@/components/TodolistItem/index.vue";

export default {
  name: "vuetify",
  data() {
    return {
      todoTabs: [
        { text: "全部", link: "/all" },
        { text: "未完成", link: "/undo" },
        { text: "已完成", link: "/complete" }
      ]
    };
  },
  components: {
    Todoinput,
    TodolistItem
  },
  computed: {
    todoIndex() {
      return this.$store.getters["todoIndex"];
    }
  },
  mounted() {
    this.$store.dispatch("INIT_TODOS");
  }
};
</script>

