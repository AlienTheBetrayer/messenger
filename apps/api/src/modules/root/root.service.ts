import { Injectable } from "@nestjs/common";

@Injectable()
export class RootService {
	health() {
		return {
			service: "Outwave API",
			status: "ok",
		};
	}
}
