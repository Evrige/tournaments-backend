import { confirmEmailHtml } from "./confirm-email-html";

export const confirmEmail = (email: string, confirmLink: string) => {
	return {
		recipients: [
			{
				name: "",
				address: email,
			},
		],
		subject: "Activated your account",
		html: confirmEmailHtml(confirmLink),
	};
};