import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class GroupGuard implements CanActivate {
	canActivate(execution: ExecutionContext) {
    const request: Request = execution.switchToHttp().getRequest();

    return true;
	}
}
