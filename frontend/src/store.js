import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    isLoading: false,
    userData: {}
  },
  mutations: {
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_USER_DATA(state, data) {
      state.userData = data;
    }
  },
  actions: {
    fetchDataFromBackend({ commit }) {
      commit('SET_LOADING', true);

      axios.get('/api/userData')
        .then(response => {
          commit('SET_USER_DATA', response.data);
          commit('SET_LOADING', false);
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
