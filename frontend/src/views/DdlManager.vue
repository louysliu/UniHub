<template>
    <div class="file-manager">
      <!-- 左侧第一个侧边栏 -->
      <div class="sidebar">
        <div class="user-info">
          <!-- 头像和昵称 -->
          <img :src="avatarUrl" alt="Avatar" class="avatar">
          <p class="nickname">{{ userData.UserHomeData.userDataFromMySQL.nickname }}</p>
        </div>
        <!-- 文件管理器和作业管理器按钮 -->
        <div class="navigation">
          <button @click="showFileManager">文件管理器</button>
          <button @click="showHomeworkManager">作业管理器</button>
        </div>
      </div>
  
      <!-- 右侧空白页面 -->
      <div class="main-content">
        <router-view></router-view> <!-- 在这里显示文件内容 -->
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        avatarUrl: require('../assets/logo.png'),
      };
    },
    computed: {
        userData() {
            return this.$store.getters.getUserData;
        }
    },
    methods: {
      showFileManager() {
        this.$router.push('file-manager'); // 跳转到文件管理器页面
      },
      showHomeworkManager() {
        this.$router.push('ddl-manager'); // 跳转到作业管理器页面
      },
    },
  };
  </script>
  
  <style>
  /* 样式可以根据需要进行调整 */
  .file-manager {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 200px;
    border-right: 1px solid #ccc;
    padding: 20px;
  }
  
  .user-info {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  
  .navigation {
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
  }
  </style>
  