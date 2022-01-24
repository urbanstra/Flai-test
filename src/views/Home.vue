<template>
  <div class="home">
    <HelloWorld msg="Task assignment MiniWebApp"/>
    <br>
    <br>
    <span>User: </span>
    <select v-model="selectedUserId">
      <option v-for="(user, index) in users"
      v-bind:key="index"
      v-bind:value="user.userId">
        {{ user.name }}
      </option>
    </select>
    <span @click="sortByPriority" class="mx-3">Sort by priority</span>
    <span @click="clear">Clear</span>
    <br>
    <br>
    <table>
      <tr>
        <th>Assignee Name</th>
        <th>Topic</th>
        <th>Priority</th>
        <th></th>
        <th></th>
      </tr>
      <tr
        v-for="(task, index) in getFilteredTasks(tasks)"
        v-bind:key="index">
        <td>{{ getUser(task.assigneeId).name }}</td>
        <td>{{ task.topic }}</td>
        <td>{{ task.priority }}</td>
        <td>
          <button @click="getTask(task)">More</button>
        </td>
        <td>
          <button @click="deleteTask(task)">Delete</button>
        </td>
      </tr>
    </table>
    <!-- modal -->
    <div class="modal-mask" v-if="showModal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Vsi Podatki
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <ul>
                <li>{{ showAllInfo.reporterId }}</li>
                <li>{{ getUser(showAllInfo.assigneeId).name  }}</li>
                <li>{{ showAllInfo.topic }}</li>
                <li>{{ showAllInfo.description }}</li>
              </ul>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="showModal = false">
                Ok
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <!-- end of modal -->
    <br>
    <br>
    <!-- Create task form -->
    <h2>Create Task</h2>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-2" label-for="input-2">
        <span>Reporter id </span>
        <b-form-select
          id="input-3"
          v-model="form.reporterId"
          :options="reporterIds"
          required
        ></b-form-select>
        <br>
        <span>Assignee id </span>
        <b-form-select
          id="input-3"
          v-model="form.assigneeId"
          :options="assigneeIds"
          required
        ></b-form-select>
        <br>
        <b-form-input
          v-model="form.topic"
          placeholder="enter topic"
          required
          class="input-enter"
        ></b-form-input>
        <b-form-input
          v-model="form.description"
          placeholder="enter description"
          required
          class="input-enter"
        ></b-form-input>
        <br>
        <span>Priority (1 - highest) </span>
        <b-form-select
          id="input-3"
          v-model="form.priority"
          :options="priorities"
          required
        ></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data: () => {
    const defaultModal = false;
    return {
      selectedUserId: null,
      showModal: defaultModal,
      showAllInfo: {},
      form: {
        taskId: null,
        reporterId: '',
        assigneeId: '',
        topic: '',
        description: '',
        priority: '',
      },
      priorities: [{ text: 'Select One', value: null }, 1, 2, 3, 4, 5],
      reporterIds: [{ text: 'Select One', value: null }, 1, 2, 3],
      assigneeIds: [{ text: 'Select One', value: null }, 1, 2, 3],
    };
  },
  computed: {
    users() {
      const { users } = this.$store.state;
      return users;
    },
    tasks() {
      const { tasks } = this.$store.state;
      return tasks;
    },
  },
  methods: {
    getUser(id) {
      return this.users.find((user) => user.userId === id);
    },
    getTask(task) {
      this.showModal = true;
      this.showAllInfo = task;
    },
    getFilteredTasks(tasks) {
      return tasks
        .filter((task) => task.assigneeId === this.selectedUserId || this.selectedUserId === null);
    },
    sortByPriority() {
      this.tasks.sort((a, b) => (a.priority) - (b.priority));
    },
    clear() {
      this.selectedUserId = null;
      this.tasks.sort((a, b) => (a.taskId) - (b.taskId));
    },
    onSubmit(event) {
      event.preventDefault();
      const arr = [];
      this.tasks.forEach((task) => {
        arr.push(task.taskId);
      });
      this.form.taskId = (Math.max(...arr) + 1);
      this.$store.dispatch('addTask', this.form);
    },
    deleteTask(task) {
      this.$store.dispatch('deleteTask', task.taskId);
    },
  },
};
</script>
<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 450px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #616b67;
}

.modal-footer{
  justify-content: center;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

table {
border-collapse: collapse;
width: 100%;
}

td, th {
border: 1px solid #dddddd;
text-align: left;
padding: 8px;
width: 10rem;
}

tr:nth-child(even) {
  background-color: #dddddd; }

</style>
