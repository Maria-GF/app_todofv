import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('tasks', {
  state: () => ({
    tasks: [],
    newTask: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      this.tasks = tasks;
    },
    async addTask(title, userId) {
      const { data: newTask, error } = await supabase
        .from('tasks')
        .insert([{ title, user_id: userId, is_complete:false }]);
      if (error) throw error;
      this.tasks.unshift(newTask[0]);
    },
    async deleteTask(taskId) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .match({ id: taskId });
      if (error) throw error;
      const taskIndex = this.tasks.findIndex(
        (task) => task.id === taskId,
      );
      if (taskId !== -1) {
        this.tasks.splice(taskIndex, 1);
      }
    },
    async editTask(taskId, newTitle) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title: newTitle })
        .match({ id: taskId });
      if (error) throw error;
      const taskIndex = this.tasks.findIndex(
        (task) => task.id === taskId,
      );
      this.tasks[taskIndex].title = data[0].title;
    },
    async markCompleted(taskId, taskComplete) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ is_complete: taskComplete })
        .match({ id: taskId });
      if (error) throw error;
      const taskIndex = this.tasks.findIndex(
        (task) => task.id === taskId,
      );
      this.tasks[taskIndex].is_complete = data[0].is_complete;
    },
  },
});
