import routeInfo from "../routeInfo";
import { getters as authGetterTypes } from "../../vuex/modules/auth/types";

export default ({ next, store }) => {
  if (store.getters[authGetterTypes.GET_TOKEN] === null) {
    return next({
      name: routeInfo.Login.name,
    });
  }

  return next();
};
