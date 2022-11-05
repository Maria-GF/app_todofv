<template>
  <section class='vh-100' >
    <div class='container py-5 h-100'>
      <div class='row d-flex justify-content-center align-items-center h-100'>
        <div class='col col-xl-10'>
          <div class='card homecard' style='border-radius: 1rem'>
                <div class='card-body p-4 p-lg-5 text-black'>
                  <div class='home'>
                    <h1><b>What's on for today?</b></h1>
                    <article>
                      <label for='newtask'>
                        <input
                          class='form-control form-control'
                          placeholder='Activities'
                          type='text'
                          v-model='newTask'
                        />
                      </label>
                      <button class='btn btn-secondary' @click='handleAddTask'>
                        Add
                      </button>
                    </article>
                    <table class='tasktable'>
                      <tr>
                        <th>Activity</th>
                        <th>Add date</th>
                        <th>Done(✓)</th>
                        <th>In Review</th>
                      </tr>
                      <tr v-for='task in tasks' :key='task.id'>
                        <td>
                          <span v-show='editing !== task.id'>{{
                            task.title
                          }}</span>
                          <label for='newTitle'>
                            <input
                              @keyup.enter='doneEdit(task.id)'
                              v-model='newTitle'
                              v-show='editing === task.id'
                              :placeholder='task.title'
                            />
                          </label>
                        </td>
                        <td>{{ formatDate(task.inserted_at) }}</td>
                        <td>
                          <label for='taskStatus'>
                            <input
                              @click='
                                handleComplete(task.id, !task.is_complete)
                              '
                              name='taskStatus'
                              type='checkbox'
                              v-model='task.is_complete'
                            />
                          </label>
                        </td>
                        <td>
                          <button
                            class='btn btn-light btn-sm'
                            v-show='editing !== task.id'
                            @click='edit(task.id)'
                          >
                            Edit
                          </button>
                          <button
                            class='btn btn-secondary btn-sm'
                            v-show='editing === task.id'
                            @click='doneEdit(task.id)'
                          >
                            Save
                          </button>
                          <button
                            class='btn btn-light btn-sm del'
                            @click='handleDelete(task.id)'
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    </table>
                    <button
                      class='btn btn-light btn-sm signout'
                      @click='handleSignOut'
                    style="background-color: #e4ecea">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/task';
import userStore from '@/store/user';
import moment from 'moment';

export default {
  name: 'HomeView',
  data() {
    return {
      newTask: '',
      editing: false,
      newTitle: '',
      msg: '',
    };
  },

  computed: {
    ...mapState(taskStore, ['tasks']),
    ...mapState(userStore, ['user']),
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    ...mapActions(taskStore, [
      'addTask',
      'fetchTasks',
      'editTask',
      'deleteTask',
      'markCompleted',
    ]),
    ...mapActions(userStore, ['signOut']),
    async handleSignOut() {
      try {
        await this.signOut();
        this.$router.push({ path: '/auth' });
      } catch (error) {
        this.msg = 'An error has occured';
      }
    },
    handleAddTask() {
      this.addTask(this.newTask, this.user.id);
      this.newTask = '';
    },
    edit(taskId) {
      this.editing = taskId;
    },
    doneEdit(taskId) {
      this.editTask(taskId, this.newTitle);
      this.editing = false;
      this.newTitle = '';
    },
    handleComplete(taskId, taskComplete) {
      this.markCompleted(taskId, taskComplete);
    },
    handleDelete(taskId) {
      this.deleteTask(taskId);
    },
    formatDate(date) {
      return moment(date).format('DD/MM/yyyy');
    },
  },
};
</script>
<style>
body{
  
  background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(181,182,222,1) 63%, rgba(148,233,213,1) 100%);
}
.homecard {
box-shadow: 5px 5px 15px 5px #667A6F;
}
.tasktable {
  width: 80%;
  margin-top: 40px;
}
.home {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.signout {
  position:relative;
  top: 1pc;
}
h1 {
  margin-bottom: 50px;
}
.btn-secondary {
  margin-left: 20px;
  background-color: #9a616d;
  border:#9a616d;
}
.del {
  color: red;
}
@media (max-width: 768px) {
   .tasktable {
     font-size: 14px;
     width: 110%;
   }
   .btn-sm {
    font-size: 10px;
   }
}
@media (max-width: 375px) {
  .btn-secondary{
    margin-top: 20px;
    width: 40%;
    margin-left: auto;
  }
}
</style>
