<!-- UserHome.vue -->
<template>
  <div class="userhome">
    <!-- 左侧固定侧边栏 -->
    <div class="sidebar">
      <div class="profile">
        <!-- 用户头像及昵称 -->
        <router-link to="/person-info">
          <div class="avatar" @click="goToPersonInfo">
            <img class="avatar-img" :src="userAvatar" alt="User Avatar" />
          </div>
        </router-link>
        <p class="nickname">{{ userNickname }}</p>
        <hr />
        <!-- 跳转按钮 -->
        <router-link to="/file-manager">
          <button class="sidebar-btn">File Manager</button>
        </router-link>
        <router-link to="/ddl-manager">
          <button class="sidebar-btn">DDL Manager</button>
        </router-link>
      </div>
    </div>
    
    <!-- 右侧内容区域 -->
    <div class="main-content">
      <!-- 显示最近打开的文件 -->
      <div class="recent-documents">
        <h2>最近打开的文档</h2>
        <ul>
          <li v-for="document in recentDocuments" :key="document.id">
            <router-link :to="'/document/' + document.id">{{ document.name }}</router-link>
          </li>
        </ul>
      </div>
      
      <!-- 显示最近的作业 -->
      <div class="recent-assignments">
        <h2>最近的DDL</h2>
        <ul>
          <li v-for="assignment in recentAssignments" :key="assignment.id">
            {{ assignment.title }} - {{ assignment.dueDate }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userAvatar: require('../assets/logo.png'), // 用户头像路径
      userNickname: 'User Nickname', // 用户昵称
      recentDocuments: [], // 最近打开的文件列表
      recentAssignments: [] // 最近的作业列表
    };
  },
  mounted() {
    // 从后端获取最近打开的文档和最近的作业数据
    this.fetchRecentDocuments();
    this.fetchRecentAssignments();
  },
  methods: {
    // 获取最近打开的文档数据（示例方法，需要根据实际情况修改）
    fetchRecentDocuments() {
      // 使用axios或其他方法从后端获取数据，并赋值给recentDocuments数组
      this.recentDocuments = [
        { id: 1, name: 'Document 1' },
        { id: 2, name: 'Document 2' },
        { id: 3, name: 'Document 3' },
        { id: 4, name: 'Document 4' },
        { id: 5, name: 'Document 5' }
      ];
    },
    // 获取最近的作业数据（示例方法，需要根据实际情况修改）
    fetchRecentAssignments() {
      // 使用axios或其他方法从后端获取数据，并赋值给recentAssignments数组
      this.recentAssignments = [
        { id: 1, title: 'Assignment 1', dueDate: '2023-11-20' },
        { id: 2, title: 'Assignment 2', dueDate: '2023-11-22' },
        { id: 3, title: 'Assignment 3', dueDate: '2023-11-25' },
        { id: 4, title: 'Assignment 4', dueDate: '2023-11-28' },
        { id: 5, title: 'Assignment 5', dueDate: '2023-11-30' }
      ];
    },
    // 跳转到PersonInfo页面
    goToPersonInfo() {
      // 在此编写路由跳转的逻辑
      // 例如：this.$router.push('/person-info');
    }
  }
};
</script>

<style scoped>
/* 样式可以根据需求自行定义 */
.userhome {
  display: flex;
}

.sidebar {
  width: 250px;
  /* 其他样式设置 */
}

.profile {
  /* 其他样式设置 */
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  /* 其他样式设置... */
}

.avatar-img {
  width: 100%; /* 图片宽度100%填充头像框 */
  height: 100%; /* 图片高度100%填充头像框 */
  object-fit: cover; /* 图片等比例缩放，填充整个头像框 */
}

.nickname {
  /* 其他样式设置 */
}

hr {
  /* 其他样式设置 */
}

.sidebar-btn {
  /* 其他样式设置 */
}

.main-content {
  flex: 1;
  /* 其他样式设置 */
}

.recent-documents {
  /* 其他样式设置 */
}

.recent-assignments {
  /* 其他样式设置 */
}
</style>
