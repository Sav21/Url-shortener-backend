import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const RequestingUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // TODO: Check "user" type?
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new Error("No user found in the request");
    }

    return request.user;
  },
);
