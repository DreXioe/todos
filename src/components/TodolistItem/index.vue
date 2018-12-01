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
            done: val
          }
        });
      }
    },
    selectedDate() {
      if (this.todo.dueDate) {
        return "到期日:" + this.todo.dueDate;
      } else {
        return "無期限";
      }
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
          done: this.todo.done
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
