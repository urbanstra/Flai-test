import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [
      {
        userId: 1,
        userName: 'Fuco',
        name: 'Jernej',
        surname: 'Kogovšek',
      },
      {
        userId: 2,
        userName: 'Mihi',
        name: 'Miha',
        surname: 'Brezovar',
      },
      {
        userId: 3,
        userName: 'Kure',
        name: 'Greg',
        surname: 'Kurinčič',
      },
    ],
    tasks: [
      {
        taskId: 1,
        reporterId: 3,
        assigneeId: 1,
        topic: 'Pometanje',
        description: 'Lažja fizična dela',
        priority: 2,
      },
      {
        taskId: 2,
        reporterId: 1,
        assigneeId: 2,
        topic: 'Raztovor',
        description: 'Težja fizična dela',
        priority: 5,
      },
      {
        taskId: 3,
        reporterId: 2,
        assigneeId: 3,
        topic: 'Naklad',
        description: 'Težja fizična dela',
        priority: 1,
      },
    ],
  },
  mutations: {
    PUSH_TO_TASKS(state, task) {
      state.tasks.push(task);
    },
    DELETE_TASK(state, id) {
      const i = state.tasks.map((item) => item.id).indexOf(id);
      state.tasks.splice(i, 1);
    },
  },
  actions: {
    addTask(context, task) {
      context.commit('PUSH_TO_TASKS', task);
    },
    deleteTask(context, id) {
      context.commit('DELETE_TASK', id);
    },
  },
  modules: {
  },
});
