<template>
    <div class="homeloading">
      <h1>Loading...</h1>
      <!-- 可以添加其他加载中的动画或提示信息 -->
    </div>
  </template>
  
  <script>
  import { inject } from 'vue'; // 引入 Vue 3 中的 inject
  import axios from 'axios';
  
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005',
    withCredentials: true
  });
  
  export default {
    name: 'HomeLoading',
    created() {
      // 在组件创建时触发加载数据的方法
      this.loadData();
    },
    methods: {
      async loadData() {
        try {
          // 发送请求到后端，获取数据
          const response = await axiosInstance.get('/api/getUserData');
  
          if (response.status === 200) {
            // 使用 inject 获取 store
            const store = inject('store');
            store.commit('SET_USER_DATA', response.data);
  
            // 跳转到 UserHome 页面
            window.location.href = '/#/home/userhome';
          } else {
            console.error('数据获取失败');
            // 处理数据获取失败的情况
          }
        } catch (error) {
          console.error('数据获取失败: ', error);
          // 处理数据获取失败的情况
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* 添加适当的样式以展示加载中状态 */
  .homeloading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 24px;
  }
  </style>
  