<template>
  <div class="newregister">
    <input v-model="username" placeholder="用户名" @input="checkUsername">
    <span>{{ usernameAvailability }}</span>
    <input v-model="email" placeholder="邮箱" @input="checkEmail">
    <span>{{ emailAvailability }}</span>
    <input v-model="nickname" placeholder="昵称">
    <input v-model="password" type="password" placeholder="密码">
    <input v-model="confirmPassword" type="password" placeholder="确认密码">
    <button @click="registerUser">确认</button>
    <div v-if="showSuccessModal" class="success-modal">
      注册成功！
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3005' // 端口号和域名为后端地址
});
export default {
  data() {
    return {
      username: '',
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      usernameAvailability: '',
      emailAvailability: '',
      showSuccessModal: false
    };
  },
  methods: {
    async checkUsername() {
      if (!this.username.trim()) {
        this.usernameAvailability = '必填';
        return;
      }

      try {
        const response = await axiosInstance.post('/api/checkUsername', {
          username: this.username
        });
        
        if (response.data.available) {
          this.usernameAvailability = '可用的用户名';
        } 
        else {
          this.usernameAvailability = '已被注册的用户名';
        }
      } catch (error) {
        console.error('检查用户名失败: ', error);
        this.usernameAvailability = '检查失败，请稍后重试';
      }
    },
    async checkEmail() {
      if (!this.email.trim()) {
        this.emailAvailability = '必填';
        return;
      }

      try {
        const response = await axiosInstance.post('/api/checkEmail', {
          email: this.email
        });
        
        if (response.data.available) {
          this.emailAvailability = '可用的邮箱';
        } 
        else {
          this.emailAvailability = '已被注册的邮箱';
        }
      } catch (error) {
        console.error('检查邮箱失败: ', error);
        this.emailAvailability = '检查失败，请稍后重试';
      }
    },
    async registerUser() {
      try {
        const response = await axiosInstance.post('/api/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          nickname: this.nickname,
        });

        if (response.status === 200) {
          // 注册成功，显示成功提示框
          this.showSuccessModal = true;

          // 等待一段时间后跳转到另一个页面
          setTimeout(() => {
            // 这里可以使用 Vue Router 的方式跳转到另一个页面
            // 如果您使用的是 Vue Router，请使用下面类似的方式：
            // this.$router.push('/other-page');
            // 如果不是使用 Vue Router，可以使用以下方式：
            window.location.href = '/#/home/login';
          }, 1000); // xx毫秒后跳转，这里可以根据需要调整时间
        } else {
          // 处理错误消息
          // ...
          this.registrationMessage = '注册失败，请稍后重试';
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
  .success-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
</style>
