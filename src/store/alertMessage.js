export default {
  namespaced: true,
  state: {
    messages: [],
  },
  actions: {
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      let apiStatus = '';
      if (status) {
        apiStatus = 'success';
      } else {
        apiStatus = 'danger';
      }
      const messages = {
        message,
        apiStatus,
        timestamp,
      };
      context.commit('PUSH_MESSAGES', messages);
      context.dispatch('removeMessageWithTiming', timestamp);
    },
    removeMessage(context, index) {
      context.commit('REMOVE_MESSAGE', index);
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.commit('MESSAGE_TIME', timestamp);
      }, 3000);
    },
  },
  mutations: {
    PUSH_MESSAGES(state, messages) {
      state.messages.push(messages);
    },
    REMOVE_MESSAGE(state, index) {
      state.messages.splice(index, 1);
    },
    MESSAGE_TIME(state, timestamp) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(i, 1);
        }
      });
    },
  },
  getters: {
    messages: (state) => state.messages,
  },
};
