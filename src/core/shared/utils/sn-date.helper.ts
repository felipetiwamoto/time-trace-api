export const snDate = {
	modify: (date: Date, amount: number, unit: "seconds" | "minutes" | "hours" | "days"): Date => {
		switch (unit) {
			case "seconds":
				return new Date(new Date(date).setSeconds(date.getSeconds() + amount));
			case "minutes":
				return new Date(new Date(date).setMinutes(date.getMinutes() + amount));
			case "hours":
				return new Date(new Date(date).setHours(date.getHours() + amount));
			case "days":
				return new Date(new Date(date).setDate(date.getDate() + amount));
		}
	}
}