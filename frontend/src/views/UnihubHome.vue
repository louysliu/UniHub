<template>
    <div class="unihubhome">
      <img src="../assets/logo2.png" alt="Logo" class="logo">
      <div class="buttons">
        <button @click="goToLogin">登录</button>
        <button @click="goToRegister">注册</button>
      </div>
      <div class="spacer">
        <a :href="githubLink">GitHub</a>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        githubLink: 'https://github.com/louix33/UniHub'
      };
    },
    methods: {
      goToLogin() {
        // 导航至登录页面
        this.$router.push('/home/userlogin');
      },
      goToRegister() {
        // 导航至注册页面
        this.$router.push('/home/newregister');
      }
    }
  };
</script>
  
<style>
  /* 样式可以根据需要自行修改 */
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
  }
  
  .logo {
    width: 200px;
    height: auto;
    transform: scale(4);
    margin-top: 120px;
  }
  
  .buttons {
    margin-top: 160px;
  }
  
  button {
    margin: 10px;
  }

  .spacer {
    margin-top: 50px;
  }
</style>
  