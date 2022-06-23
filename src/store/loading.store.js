import { action } from "easy-peasy";

const loading = {
  isAppLoading: false,

  setIsAppLoading: action((state, payload) => {
    state.isAppLoading = payload;
  }),
};

export default loading;
