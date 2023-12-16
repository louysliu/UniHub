<template>
  <div class="login">
    <input v-model="usernameOrEmail" placeholder="用户名或邮箱">
    <input v-model="password" type="password" placeholder="密码">
    <button @click="login">确认</button>
    <div v-if="showSuccessModal" class="success-modal">
      登录成功！
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3005' // 请将端口号和域名替换为您的后端地址
});
export default {
  data() {
    return {
      usernameOrEmail: '',
      password: '',
      showSuccessModal: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axiosInstance.post('/api/login', {
          usernameOrEmail: this.usernameOrEmail,
          password: this.password,
          // 可以将其他需要的数据传递到后端
        });

        if (response.status === 200) {
          // 登录成功，显示成功提示框
          this.showSuccessModal = true;

          const sessionId = response.data.sessionId;
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 1);
          const yourExpirationTime = expirationDate.toUTCString();
          document.cookie = `sessionId=${sessionId}; expires=${yourExpirationTime}; path=/`;

          // 等待一段时间后跳转到另一个页面
          setTimeout(() => {
            // 这里可以使用 Vue Router 的方式跳转到另一个页面
            // 如果您使用的是 Vue Router，请使用下面类似的方式：
            // this.$router.push('/other-page');
            // 如果不是使用 Vue Router，可以使用以下方式：
            window.location.href = '/#/home/homeloading';
          }, 1000); // xx毫秒后跳转，这里可以根据需要调整时间
        } else {
          // 处理错误消息
          // ...
          this.loginMessage = '登录失败，请稍后重试';
        }
      } catch (error) {
        console.error('登录失败: ', error);
        this.loginMessage = '登录失败，请稍后重试';
      }
    }
  }
};
</script>

<style scoped>
  /* 样式可以根据需要自行修改 */
  .login {
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
