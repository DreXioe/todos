<script>
import axios from "axios";
export default {
  name: "NewTodo",
  data() {
    return {
      todoContent: "",
      dueDate: "",
      newTodo: {
        content: "",
        dueDate: "",
        uuid: "00000000-0000-0000-0000-000000000000",
        done: false
      }
    };
  },
  computed: {
    selectedDate() {
      if (this.newTodo.dueDate) {
        return "到期日:" + this.newTodo.dueDate;
      } else {
        return "無期限";
      }
    }
  },
  methods: {
    submitHanlder() {
      if (!this.newTodo.content) return;
      var self = this;
      axios
        .get("https://www.uuidgenerator.net/api/version4")
        .then(function(response) {
          // handle success
          self.$store.commit("ADD_TODOS", {
            todoId: response.data,
            dueDate: self.newTodo.dueDate,
            content: self.newTodo.content,
            done: false
          });
          self.resetTodo();
        })
        .catch(function(error) {
          // handle error
          let id = "11111111" + error;
          self.$store.commit("ADD_TODOS", {
            todoId: id,
            dueDate: self.newTodo.dueDate,
            content: self.todo,
            done: false
          });
          self.resetTodo();
        });
    },
    showCalendar() {
      this.$store.commit("SHOW_CALENDAR", this.newTodo);
    },
    resetTodo() {
      this.todoContent = null;
      this.dueDate = null;
      this.newTodo = {
        content: "",
        dueDate: "",
        uuid: "00000000-0000-0000-0000-000000000000"
      };
      this.$store.commit("RESET_CALENDAR_TODO");
    }
  }
};
</script>

<template src="./template.html"></template>

