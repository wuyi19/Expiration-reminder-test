<template>
  <div>
    <h1>到期提醒列表</h1>
    <ul>
      <li v-for="item in reminders" :key="item._id" :class="{ warning: daysLeft(item.expiryDate) <= 3 }">
        {{ item.name }} - 到期日期: {{ formatDate(item.expiryDate) }} （剩余 {{ daysLeft(item.expiryDate) }} 天）
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      reminders: []
    };
  },
  created() {
    this.fetchReminders();
  },
  methods: {
    async fetchReminders() {
      const res = await axios.get('http://你的VPS公网IP:3000/api/reminders');
      this.reminders = res.data;
    },
    daysLeft(expiryDate) {
      const now = new Date();
      const expiry = new Date(expiryDate);
      return Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.warning {
  color: red;
  font-weight: bold;
}
</style>
