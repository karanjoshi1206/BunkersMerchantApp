const getAllMenuItems = async () => {
	let requestOptions = {
		method: "GET",
		redirect: "follow",
	};

	try {
		const response = await fetch(
			"https://cute-lime-macaw-toga.cyclic.app/products",
			requestOptions
		);

		const data = await response.json();
		return { status: response.status, data: data };
	} catch (error) {
		return { status: 401, error: true, message: "Something went wrong" };
	}
};

export default getAllMenuItems;
