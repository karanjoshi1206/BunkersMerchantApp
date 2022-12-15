const MerchantLogin = async (email, password) => {
	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let raw = JSON.stringify({
		email: email,
		password: password,
	});

	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			"https://cute-lime-macaw-toga.cyclic.app/merchant/login",
			requestOptions
		);
		const data = await response.json();
		return { status: response.status, data: data };
	} catch (error) {
		return { status: 401, error: true, message: "Something went wrong" };
	}
};

export default MerchantLogin;
