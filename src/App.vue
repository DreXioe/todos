<template>
  <div id="app">
    <v-app>
      <v-toolbar color="teal" dark app>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title class="text-xs-center">TodoList</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <v-tabs fixed-tabs>
            <v-tab v-for="(n, index) in todoTabs" :key="index" :to="n.link">
              {{ n.text }} ({{ n.count }})
            </v-tab>
          </v-tabs>
          <Todoinput />
          <div>
            <TodolistItem
              v-for="index in todoIndex"
              :key="index"
              :index="index"
            />
          </div>
        </v-container>
      </v-content>
      <v-footer dark height="auto">
        <v-card class="flex" flat tile>
          <v-card-title class="teal">
            <v-spacer></v-spacer>
            <strong class="subheading">Footer</strong>

            <v-spacer></v-spacer>
          </v-card-title>

          <v-card-actions class="grey darken-3 justify-center">
            &copy;2018 — <strong>FJ</strong>
          </v-card-actions>
        </v-card>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Todoinput from "@/components/Todoinput/index.vue";
import TodolistItem from "@/components/TodolistItem/index.vue";

export default {
  name: "vuetify",
  components: {
    Todoinput,
    TodolistItem
  },
  computed: {
    todoIndex() {
      return this.$store.getters["todoIndex"];
    },
    todoAll() {
      return this.$store.getters["todoAll"];
    },
    todoDone() {
      return this.$store.getters["todoDone"];
    },
    todoUndo() {
      return this.todoAll - this.todoDone;
    },
    todoTabs() {
      return [
        { text: "全部", link: "/all", count: this.todoAll },
        { text: "未完成", link: "/undo", count: this.todoUndo },
        {
          text: "已完成",
          link: "/complete",
          count: this.todoDone
        }
      ];
    }
  },
  mounted() {
    this.$store.dispatch("INIT_TODOS");
  }
};
</script>
