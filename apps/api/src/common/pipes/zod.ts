import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import z from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
	constructor(private schema: z.ZodType) {}

	transform(value: unknown) {
		const result = this.schema.safeParse(value);

		if (!result.success) {
			throw new BadRequestException({
				message: result.error.issues.map((e) => e.message),
				error: 'Bad Request',
				statusCode: 200,
			});
		}

		return result.data;
	}
}
