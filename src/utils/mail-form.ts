export const mailForm = (email: string, subject: string, html: string) => {
	return {
		recipients: [
			{
				name: "",
				address: email,
			},
		],
		subject,
		html,
	};
};