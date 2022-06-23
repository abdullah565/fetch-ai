import { createStore } from "easy-peasy";
import menu from "./menu.store";
import loading from "./loading.store";
import notification from "./notification.store";
import suppliers from "./suppliers.store";

export const store = createStore({
  menu: menu,
  loading: loading,
  notification: notification,
  suppliers: suppliers,
});
