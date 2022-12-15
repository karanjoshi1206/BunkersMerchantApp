const MerchantSignUp = async (email, password, name, phoneNumber) => {
	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	let raw = JSON.stringify({
		email: email,
		password: password,
		name: name,
		phoneNumber: phoneNumber,
	});

	console.log("raw is ", raw);
	let requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			"https://cute-lime-macaw-toga.cyclic.app/merchant/signup",
			requestOptions
		);
		const data = await response.json();
		console.log("data ", data);
		return { status: response.status, data: data };
	} catch (error) {
		console.log("error is ", error);
		return { status: 401, error: true, message: "Something went wrong" };
	}
};

export default MerchantSignUp;
