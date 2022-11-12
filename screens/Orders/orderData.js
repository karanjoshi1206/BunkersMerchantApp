const data = [
	{
		id: 1,
		orderId: "12334555",
		orderItems: [
			{
				name: "Maggie",
				Qty: 2,
				size: "Half",
			},
			{
				name: "Chowmien",
				Qty: 2,
				size: "Full",
			},
		],
		orderBy: "Karan Joshi",
		paymentReceived: true,
		// time: Date.now(),
		orderStatus: 1,
	},

	{
		id: 2,
		orderId: "2345",
		orderItems: [
			{
				name: "Chai",
				Qty: 1,
			},
			{
				name: "Bread Omelette",
				Qty: 1,
				size: "Single",
			},
		],
		orderBy: "Karan Joshi",
		paymentReceived: true,
		orderStatus: 1,
	},
	{
		id: 3,
		orderId: "12334555",
		orderItems: [
			{
				name: "Maggie",
				Qty: 2,
				size: "Half",
			},
		],
		orderBy: "Karan Joshi",
		paymentReceived: true,
		orderStatus: 1,
	},
];

export default data;
