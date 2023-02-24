export const reducer = (state, action) => {
  switch (action.type) {
    case "ON_OPEN_FORM_CREATE":
      return { ...state, ...{ isOpenFormCreate: true } };
    case "ON_CLOSE_FORM_CREATE":
      return { ...state, ...{ isOpenFormCreate: false } };

    case "ON_OPEN_FORM_UPDATE":
      return { ...state, ...{ isOpenFormUpdate: true, ID_UPDATE: action.ID } };
    case "ON_CLOSE_FORM_UPDATE":
      return { ...state, ...{ isOpenFormUpdate: false, ID_UPDATE: null } };
    case "ON_OPEN_DC_DELETE":
      return { ...state, ...{ isOpenDCDelete: true, ID_DELETE: action.ID } };
    case "ON_CLOSE_DC_DELETE":
      return { ...state, ...{ isOpenDCDelete: false, ID_DELETE: null } };
    default:
      return state;
  }
};

export const initState = {
  isOpenFormUpdate: false,
  isOpenFormCreate: false,
  ID_UPDATE: null,
  ID_DELETE: null,
};
