import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class TestService {
    constructor(private prisma: PrismaService) {}

    async randomTestGet() {
        return await this.prisma.test.findMany({
            orderBy: {
                created_at: "desc",
            },
        });
    }

    async randomTestPost() {
        return await this.prisma.test.create({
            data: {
                id: crypto.randomUUID(),
                value: Math.floor(Math.random() * 100),
            },
        });
    }
}
