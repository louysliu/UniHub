<template>
    <ul class="tree-view">
      <li v-for="item in data" :key="item._id">
        <span @click="handleClick(item)">
          {{ isFolder(item) ? item.folder_name : item.file_name }}
        </span>
        <ul v-if="isFolder(item) && item.expanded">
          <tree-view :data="item.children" @folderClick="folderClick" @documentClick="documentClick" />
        </ul>
      </li>
    </ul>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      ...mapState({
        userFoldersAndFiles: state => state.userData.UserHomeData.userFoldersAndFiles,
      }),
    },
    methods: {
      handleClick(item) {
        if (this.isFolder(item)) {
          this.toggleFolder(item);
        } else {
          this.$emit('documentClick', item);
        }
      },
      toggleFolder(folder) {
        this.$store.commit('TOGGLE_FOLDER_EXPANDED', folder);
      },
      folderClick(folder) {
        this.toggleFolder(folder);
      },
      documentClick(document) {
        this.$emit('documentClick', document);
      },
      isFolder(item) {
        return item.children && item.children.length > 0;
      },
    },
  };
  </script>
  
  <style>
  /* 样式可以根据需要进行调整 */
  /* ... */
  </style>
  