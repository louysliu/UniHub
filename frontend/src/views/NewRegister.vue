<template>
  <div class="newregister">
    <input v-model="username" placeholder="用户名" @input="checkUsername">
    <span>{{ usernameAvailability }}</span>
    <input v-model="email" placeholder="邮箱" @input="checkEmail">
    <span>{{ emailAvailability }}</span>
    <input v-model="password" type="password" placeholder="密码">
    <input v-model="confirmPassword" type="password" placeholder="确认密码">
    <button @click="register">确认</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      usernameAvailability: '',
      emailAvailability: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('/api/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          // 可以将其他需要的数据传递到后端
        });

        if (response.status === 200) {
          this.registrationMessage = response.data.message;
          // 注册成功后重置表单字段
          this.username = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
        } else {
          // 处理错误消息
          // ...
        }
      } catch (error) {
        console.error('注册失败: ', error);
        this.registrationMessage = '注册失败，请稍后重试';
      }
    }
  }
};
</script>

<style scoped>
  /* 样式可以根据需要自行修改 */
  .newregister {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin-top: -70px;
  }

  input {
    margin-bottom: 10px;
    width: 200px; /* 设置输入框宽度 */
    padding: 8px; /* 设置输入框内边距 */
    border-radius: 4px; /* 设置输入框圆角 */
    border: 1px solid #ccc; /* 设置输入框边框 */
    box-sizing: border-box; /* 确保边框不会增加元素的宽度 */
  }

  span {
    margin-bottom: 5px;
  }

  button {
    margin-top: 10px;
    width: 100px; /* 设置按钮宽度 */
    padding: 8px; /* 设置按钮内边距 */
    border: none; /* 移除按钮边框 */
    border-radius: 4px; /* 设置按钮圆角 */
    background-color: #007bff; /* 设置按钮背景颜色 */
    color: white; /* 设置按钮文字颜色 */
    cursor: pointer; /* 设置鼠标样式为指针 */
  }
</style>
