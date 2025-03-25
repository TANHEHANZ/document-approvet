import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
export const handlePrismaError = (error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          message: "Unique constraint violation",
          details: `The field ${error.meta?.target} already exists`,
        };
      case "P2014":
        return {
          message: "Invalid ID",
          details: "The provided ID does not exist in the database",
        };
      case "P2003":
        return {
          message: "Foreign key constraint failed",
          details: `Related record not found`,
        };
      default:
        return {
          message: "Database error",
          details: error.message,
        };
    }
  }

  if (error instanceof PrismaClientValidationError) {
    return {
      message: "Validation error",
      details: error.message,
    };
  }

  return {
    message: "Unexpected error",
    details: error.message,
  };
};
