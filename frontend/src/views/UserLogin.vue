<template>
  <div class="userlogin">
    <input v-model="usernameOrEmail" placeholder="用户名或邮箱">
    <input v-model="password" type="password" placeholder="密码">
    <button @click="login">确认</button>
  </div>
</template>

<style scoped>
  /* 样式可以根据需要自行修改 */
  .userlogin {
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
</style>
