import firebase from "firebase/compat/app";
export const sendVerification = (number, recaptchaVerifier, navigation) => {
	const phoneProvider = new firebase.auth.PhoneAuthProvider();
	phoneProvider
		.verifyPhoneNumber(`+91${number}`, recaptchaVerifier.current)
		.then((e) =>
			navigation.navigate("OTP Verification", {
				phoneNumber: number,
				verificationId: e,
			})
		)

		.catch((e) => console.log("error ", e));
};
