const initialState = {
  people: [],
};

const PeopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PEOPLE":
      return {
        ...state,
        people: [...state.people, action.payload],
      };

    case "DELETE_PEOPLE":
      const neware = state.people.filter((e) => e.id !== action.payload);
      return {
        ...state,
        people: neware,
      };

    case "UPDATE_PEOPLE":
      const x = state.people.map((e) =>
        e.id === action.payload.idholder
          ? { ...e, name: action.payload.edit }
          : e
      );
      return {
        ...state,
        people: x,
      };
    default:
      return state;
  }
};

export default PeopleReducer;
