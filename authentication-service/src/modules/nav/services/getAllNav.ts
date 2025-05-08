import { createCache } from "@/infraestructure/lib/redis/modules/cache";
import { prisma } from "../../../infraestructure/config/prisma.client";

interface NavResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}
export const allRoutesNav = async (): Promise<NavResponse> => {
  try {
    const navCache = createCache();
    const dataCache = await navCache.get("nav/all");

    if (dataCache) {
      return {
        success: true,
        message: "Navigation routes retrieved from cache",
        data: dataCache,
      };
    }

    const allRoutes = await prisma.nav.findMany({
      where: {
        Status: "ACTIVE",
      },
      omit: {
        Status: true,
      },
    });

    if (!allRoutes.length) {
      return {
        success: false,
        message: "No navigation routes found",
        data: [],
      };
    }

    const mainRoutes = allRoutes.filter((route) => route.parentId === null);

    const routesWithChildren = mainRoutes.map((route) => {
      const children = allRoutes.filter((child) => child.parentId === route.id);
      return {
        ...route,
        children,
      };
    });

    await navCache.set("nav/all", routesWithChildren);
    return {
      success: true,
      message: "Navigation routes retrieved successfully",
      data: routesWithChildren,
    };
  } catch (error) {
    console.error("Error fetching navigation routes:", error);
    return {
      success: false,
      message: "Error fetching navigation routes",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
