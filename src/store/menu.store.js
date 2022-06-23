import { action, thunk } from "easy-peasy";
import axios from "../config/axios";

const menu = {
  menuOptionsList: [],
  filteredMenuOptionsList: [],
  filteredMenuCategoriesList: [],
  currentVenue: "",
  menuItemDetails: [],
  menuItemList: [],
  ingredientData: {},
  ingredientFullSupplyChain: [],
  ingredientsTabs: [],
  ingredientMapPathLatLng: [],
  isMainIngredientVisible: true,
  currentIngredientIcon: "",
  currentIngredientsSupplier: null,
  homepageImage: "",
  ingredientMapPathLatLngSecond_origin: [],
  ingredientMarkersPaths: [],
  currentHeaderTitle: "",

  setHeaderTitle: action((state, payload) => {
    state.currentHeaderTitle = payload;
  }),
  setHomepageImage: action((state, payload) => {
    state.homepageImage = payload;
  }),
  setCurrentIngredientIcon: action((state, payload) => {
    state.currentIngredientIcon = payload;
  }),
  setCurrentVenue: action((state, payload) => {
    state.currentVenue = payload;
  }),
  setIsMainIngredientVisible: action((state, payload) => {
    state.isMainIngredientVisible = payload;
  }),
  setMenuOptionsList: action((state, payload) => {
    state.menuOptionsList = payload;

    const gettingMenuOptionsList = payload[0].menu_item.map((menuItem) => {
      return menuItem.menu_category.menu_options;
    });
    state.filteredMenuOptionsList = [
      ...new Map(
        gettingMenuOptionsList.map((item) => [item["id"], item])
      ).values(),
    ];

    const gettingMenuCategoriesList = payload[0].menu_item.map((menuItem) => {
      return menuItem.menu_category;
    });

    state.filteredMenuCategoriesList = [
      ...new Map(
        gettingMenuCategoriesList.map((item) => [item["id"], item])
      ).values(),
    ];
  }),
  setMenuItemDetails: action((state, payload) => {
    state.menuItemDetails = payload;

    if (payload.length > 0) {
      state.ingredientsTabs = payload[0].ingredients.map((item) => {
        return { ...item, activeTab: false };
      });
    }
  }),
  setMenuItemList: action((state, payload) => {
    state.menuItemList = payload;
  }),
  setIngredientData: action((state, payload) => {
    state.ingredientData = payload;

    state.ingredientMapPathLatLng = [];
    state.ingredientFullSupplyChain = [];
    state.ingredientMapPathLatLngSecond_origin = [];

    // console.log(payload);
    state.currentIngredientsSupplier = payload.supplyChainInfo.supplier.id;

    // setting origin name & Lat Lng in supply chain

    const updatedOriginName = () => {
      if (payload.supplyChainInfo.second_origin != null) {
        return `${payload.supplyChainInfo.origin.name} & ${payload.supplyChainInfo.second_origin.name}`;
      }

      return payload.supplyChainInfo.origin.name;
    };

    state.ingredientFullSupplyChain.push({
      name: updatedOriginName(),
      desc: payload.supplyChainInfo.origin.description,
    });

    if (payload.supplyChainInfo.second_origin != null) {
      state.ingredientMapPathLatLngSecond_origin.push({
        lat: payload.supplyChainInfo.second_origin.latitude,
        lng: payload.supplyChainInfo.second_origin.longitude,
      });
      state.ingredientMapPathLatLngSecond_origin.push({
        lat: Number(payload.supplyChainInfo.supplier.latitude),
        lng: Number(payload.supplyChainInfo.supplier.longitude),
      });
    }
    state.ingredientMapPathLatLng.push({
      lat: Number(payload.supplyChainInfo.origin.latitude),
      lng: Number(payload.supplyChainInfo.origin.longitude),
    });

    if (payload.is_extended_supply_chain) {
      payload.data.forEach((stop) => {
        if (stop.is_supplier) {
          state.ingredientMapPathLatLng.push({
            lat: Number(stop.stop_latitude),
            lng: Number(stop.stop_longitude),
          });
        }

        state.ingredientFullSupplyChain.push({
          name: stop.stop_name,
          desc: stop.description,
        });
      });
    }

    // if (!payload.is_extended_supply_chain) {
    state.ingredientMapPathLatLng.push({
      lat: Number(payload.supplyChainInfo.supplier.latitude),
      lng: Number(payload.supplyChainInfo.supplier.longitude),
    });

    //

    state.ingredientFullSupplyChain.push({
      name: payload.supplyChainInfo.supplier.name,
      desc: payload.supplyChainInfo.supplier.description,
    });
    // }

    // setting end use name & Lat Lng in supply chain

    state.ingredientFullSupplyChain.push({
      name: payload.supplyChainInfo.end_use.end_use_name,
      desc: payload.supplyChainInfo.end_use.description,
    });

    state.ingredientMapPathLatLng.push({
      lat: Number(payload.supplyChainInfo.end_use.end_use_latitude),
      lng: Number(payload.supplyChainInfo.end_use.end_use_longitude),
    });

    state.ingredientMarkersPaths = [...state.ingredientMapPathLatLng];
    if (payload.supplyChainInfo.second_origin != null) {
      state.ingredientMarkersPaths.unshift({
        lat: payload.supplyChainInfo.second_origin.latitude,
        lng: payload.supplyChainInfo.second_origin.longitude,
      });
    }
  }),

  setMapPathEmpty: action((state, payload) => {
    state.ingredientMapPathLatLng = [];
  }),

  setActiveIngredientTabData: action((state, payload) => {
    let copyIngredientTabs = state.ingredientsTabs.map((item) => {
      return { ...item, activeTab: false };
    });

    if (!payload.toCloseSupplyChain) {
      const updatedActiveTab = {
        ...copyIngredientTabs[payload.index],
        activeTab: true,
      };
      copyIngredientTabs[payload.index] = updatedActiveTab;
    }
    state.ingredientsTabs = copyIngredientTabs;
  }),

  fetchMainImage: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const {
        menu: { setHomepageImage },
        loading: { setIsAppLoading },
        notification: { setIsNotifier, setNotificationType },
      } = getStoreActions();
      setIsAppLoading(true);

      try {
        const res = await axios.get(payload);

        setHomepageImage(res.data[0].image_url);

        setIsAppLoading(false);
      } catch (error) {
        // setNotificationType("error");
        setIsAppLoading(false);
        // setIsNotifier(true);
      }
    }
  ),
  fetchMenuOptionsList: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const {
        menu: { setMenuOptionsList },
        loading: { setIsAppLoading },
        notification: { setIsNotifier, setNotificationType },
      } = getStoreActions();
      setIsAppLoading(true);

      try {
        const res = await axios.get(payload);

        setMenuOptionsList(res.data);
        setIsAppLoading(false);
      } catch (error) {
        setNotificationType("error");
        setIsAppLoading(false);
        setIsNotifier(true);
      }
    }
  ),
  fetchMenuItemDetails: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const {
        menu: { setMenuItemDetails },
        loading: { setIsAppLoading },
        notification: { setIsNotifier, setNotificationType },
      } = getStoreActions();
      setIsAppLoading(true);
      setMenuItemDetails([]);

      try {
        const res = await axios.get(payload);

        setMenuItemDetails(res.data);

        setIsAppLoading(false);
      } catch (error) {
        setNotificationType("error");
        setIsAppLoading(false);
        setIsNotifier(true);
      }
    }
  ),
  fetchMenuItemList: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const {
        menu: { setMenuItemList },
        loading: { setIsAppLoading },
        notification: { setIsNotifier, setNotificationType },
      } = getStoreActions();
      setIsAppLoading(true);

      try {
        const res = await axios.get(payload);

        setMenuItemList(res.data);
        setIsAppLoading(false);
      } catch (error) {
        setNotificationType("error");
        setIsAppLoading(false);
        setIsNotifier(true);
      }
    }
  ),
  fetchIngredientSupplyChain: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const {
        menu: { setIngredientData },
        loading: { setIsAppLoading },
        notification: { setIsNotifier, setNotificationType },
      } = getStoreActions();

      setIsAppLoading(true);

      try {
        const res = await axios.get(payload.URL);

        // console.log(res, "asda");

        setIngredientData({
          data: res.data,
          supplyChainInfo: payload.supplyChainInfo,
          is_extended_supply_chain: payload.isExtendedSupplyChain,
        });

        setIsAppLoading(false);
      } catch (error) {
        setNotificationType("error");
        setIsAppLoading(false);
        setIsNotifier(true);
        console.log(error);
      }
    }
  ),
};

export default menu;
