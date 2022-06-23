import { action } from "easy-peasy";

const notification = {
  isNotifier: false,
  notificationType: "success",

  setIsNotifier: action((state, payload) => {
    state.isNotifier = payload;
  }),
  setNotificationType: action((state, payload) => {
    state.notificationType = payload;
  }),
};

export default notification;
