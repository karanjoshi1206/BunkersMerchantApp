export const initialState = {
	user: {},
	isLoggedIn: false,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case "isLoggedIn":
			return {
				...state,
				isLoggedIn: action.payload,
			};
	}
	return state;
};
