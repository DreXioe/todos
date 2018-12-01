<script>
export default {
  name: "TodolistItem",
  data() {
    return {
      edit: null,
      dialog: false
    };
  },
  props: {
    index: {
      type: Number,
      requried: true
    }
  },
  computed: {
    todo() {
      return this.$store.state.todos[this.index];
    },
    done: {
      get() {
        return this.todo.done;
      },
      set(val) {
        this.$store.commit("UPDATE_TODOS", {
          index: this.index,
          data: {
            content: this.todo.content,
            done: val,
            time: this.todo.time
          }
        });
      }
    },
<<<<<<< HEAD
    selectedDate() {
      if (this.todo.dueDate) {
        return "到期日:" + this.todo.dueDate;
      } else {
        return "無期限";
      }
=======
    time() {
      var event = new Date(this.todo.time);
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      };
      return event.toLocaleDateString("zh-TW", options);
>>>>>>> 8dae9083b99c82c9654aff57576fdb38d03f2be5
    }
  },
  methods: {
    deleteHandler() {
      //if (confirm(`確定要刪除嗎 ${this.todo.content} ?`))
      this.$store.commit("DELETE_TODOS", this.index);
      this.dialog = false;
    },
    editHandler() {
      if (this.done) return;
      this.edit = this.todo.content;
    },
    submitHandler() {
      if (!this.edit) {
        this.deleteHandler();
        return;
      }
      this.$store.commit("UPDATE_TODOS", {
        index: this.index,
        data: {
          content: this.edit,
          done: this.todo.done,
          time: this.todo.time
        }
      });
      this.edit = null;
    },
    cancelHanlder() {
      this.edit = null;
    },
    showCalendar() {
      this.$store.commit("SHOW_CALENDAR", this.todo);
    },
    showDialog() {
      this.dialog = true;
    }
  }
};
</script>
<template src="./template.html"></template>
