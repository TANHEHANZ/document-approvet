import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "../../../infraestructure/CONSTANTS";
import { CreateUserSchema } from "../../../infraestructure/models/user.dto";

export const createUser = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = CreateUserSchema.parse(req.body);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        password: validatedData.password, // Remember to hash password
        userTypeId: validatedData.userTypeId,
        statusId: validatedData.statusId,
      },
      include: {
        userType: true,
        status: true,
      },
    });

    return API.created(res, "User created successfully", user);
  } catch (error) {
    return API.serverError(res, undefined, error);
  }
};
