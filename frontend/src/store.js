import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    isLoading: false,
    userData: {},
    selectedDocument: null,
  },
  mutations: {
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_USER_DATA(state, data) {
      state.userData = data;
    },
    TOGGLE_FOLDER_EXPANDED(state, folder) {
      function toggleFolderRecursive(items) {
        for (const item of items) {
          if (item._id === folder._id) {
            item.expanded = !item.expanded;
            return true;
          }
          if (item.children && item.children.length > 0) {
            const found = toggleFolderRecursive(item.children);
            if (found) return true;
          }
        }
        return false;
      }

      toggleFolderRecursive(state.userData.UserHomeData.userFoldersAndFiles);
    },
    SET_SELECTED_DOCUMENT(state, document) {
      state.selectedDocument = document; // 设置选中文档的 mutation
    },
    UPDATE_SELECTED_DOCUMENT_CONTENT(state, updatedDocument) {
      state.selectedDocument = updatedDocument;
    },
  },
  actions: {
    fetchDataFromBackend({ commit }) {
      axios.get('/api/userData')
        .then(response => {
          commit('SET_USER_DATA', response.data);
          commit('SET_LOADING', true);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          commit('SET_LOADING', false);
        });
    }
  },
  getters: {
    getUserData: state => state.userData,
    getLoadingStatus: state => state.isLoading
  }
});
