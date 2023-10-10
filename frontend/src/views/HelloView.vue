<template>
    <div>
      <button @click="fetchMessage">Get Message</button>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: ''
      };
    },
    methods: {
      async fetchMessage() {
        try {
          const response = await axios.get('http://localhost:3005/api/hello');
          this.message = response.data.message;
        } catch (error) {
          console.error('Error fetching message:', error);
        }
      }
    }
  };
  </script>
  