import { action, thunk } from "easy-peasy";
import axios from "../config/axios";

const suppliers = {
  suppliersData: [],
  singleSupplierData: {},
  currentLatLng: {},
  sustainabilityTabsData: [
    {
      id: 0,
      title: "Environment",
      isActive: true,
      desc: "1",
    },
    {
      id: 1,
      title: "Social",
      isActive: false,
      desc: "3",
    },
    {
      id: 2,
      title: "Governance",
      isActive: false,
      desc: "2",
    },
  ],

  setSuppliersData: action((state, payload) => {
    state.suppliersData = payload;
  }),
  setCurrentLatLng: action((state, payload) => {
    state.currentLatLng = payload;
  }),
  setActiveSupplierData: action((state, payload) => {
    let copySuppliers = state.suppliersData.map((item) => {
      return { ...item, isActive: false };
    });
    const updatedActiveSupplier = { ...copySuppliers[payload], isActive: true };
    copySuppliers[payload] = updatedActiveSupplier;

    state.suppliersData = copySuppliers;
  }),
  setSuppliersTabs: action((state, payload) => {
    let copyTabs = state.sustainabilityTabsData.map((item) => {
      return { ...item, isActive: false };
    });
    const updatedTabTrue = { ...copyTabs[payload], isActive: true };
    copyTabs[payload] = updatedTabTrue;

    state.sustainabilityTabsData = copyTabs;
  }),
  setSingleSupplierData: action((state, payload) => {
    state.singleSupplierData = payload;

    const copySustainabilityTabs = [...state.sustainabilityTabsData];
    copySustainabilityTabs[0] = {
      ...copySustainabilityTabs[0],
      desc: payload.environmental_info,
    };
    copySustainabilityTabs[1] = {
      ...copySustainabilityTabs[1],
      desc: payload.social_info,
    };
    copySustainabilityTabs[2] = {
      ...copySustainabilityTabs[2],
      desc: payload.governance_info,
    };

    state.sustainabilityTabsData = copySustainabilityTabs;
  }),

  fetchSuppliers: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const {
        suppliers: {
          setSuppliersData,
          setCurrentLatLng,
          setActiveSupplierData,
        },
        loading: { setIsAppLoading },
        notification: { setIsNotifier, setNotificationType },
      } = getStoreActions();
      setIsAppLoading(true);

      try {
        const res = await axios.get(payload);

        setCurrentLatLng({
          lat: Number(res.data[0].latitude),
          lng: Number(res.data[0].longitude),
        });

        setSuppliersData(res.data);
        setActiveSupplierData(0);
        setIsAppLoading(false);
      } catch (error) {
        setNotificationType("error");
        setIsAppLoading(false);
        setIsNotifier(true);
      }
    }
  ),
  fetchSingleSupplier: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const {
        suppliers: { setSingleSupplierData },
        loading: { setIsAppLoading },
        notification: { setIsNotifier, setNotificationType },
      } = getStoreActions();
      setIsAppLoading(true);

      try {
        const res = await axios.get(payload);

        setSingleSupplierData(res.data);
        setIsAppLoading(false);
      } catch (error) {
        setNotificationType("error");
        setIsAppLoading(false);
        setIsNotifier(true);
      }
    }
  ),
};

export default suppliers;
