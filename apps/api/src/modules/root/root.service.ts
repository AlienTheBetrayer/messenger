import { Injectable } from "@nestjs/common";

@Injectable()
export class RootService {
	getApiHealth() {
		return {
			service: "Gravity API",
			status: "ok",
		};
	}
}
