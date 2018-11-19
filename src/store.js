import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LS = {
    load() {
        // 字串化陣列
        return JSON.parse(localStorage.getItem('vue-todo') || '[]')
    },
    save(data) {
        localStorage.setItem('vue-todo', JSON.stringify(data))
    }
}

const filter = {
    all(todos) {
        return todos
    },
    undo(todos) {
        return todos.filter(todo => {
            return !todo.done
        })
    },
    complete(todos) {
        return todos.filter(todo => {
            return todo.done
        })
    }
}

export default new Vuex.Store({
    strict: true,
    state: {
        todos: [{
                content: '使用 vue 寫完todos list 功能',
                done: false
            },
            {
                content: '上傳git',
                done: true
            },
            {
                content: '整合後台',
                done: false
            }
        ]
    },
    getters: {
        todoIndex(state) {
            return filter[state.route.name](state.todos).map(todo => state.todos.indexOf(todo))
        },
        todoAll(state) {
            return filter['all'](state.todos).length
        },
        todoDone(state) {
            return filter['complete'](state.todos).length
        }
    },
    mutations: {
        SET_TODOS(state, data) {
            state.todos = data
            LS.save(state.todos)
        },
        ADD_TODOS(state, data) {
            state.todos.push(data)
            LS.save(state.todos)
        },
        UPDATE_TODOS(state, {
            index,
            data
        }) {
            // 須更新陣列內容，才會觸發 observe 事件
            // [X] state.todos[index] = data
            state.todos[index].content = data.content
            state.todos[index].done = data.done
            LS.save(state.todos)
        },
        DELETE_TODOS(state, index) {
            state.todos.splice(index, 1)
            LS.save(state.todos)
        }
    },
    actions: {
        INIT_TODOS({
            commit
        }) {
            //Load data from Local Storage
            commit('SET_TODOS', LS.load())
        }
    }
})