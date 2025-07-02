import type { Admin } from "src/schemas/admin.schema";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentAdmin = createParamDecorator(
    (data: keyof Admin, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const admin = request.user

        return data ? admin[data] : admin
    }
)