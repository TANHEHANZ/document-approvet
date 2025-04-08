import { PERMISSIONS } from "@firma-gamc/shared";
import { prisma } from "../../src/infraestructure/config/prisma.client";
import { createHash } from "crypto";

function generatePermissionId(permissionName: string): string {
  const hash = createHash("sha256").update(permissionName).digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(
    12,
    16
  )}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}
const getAllPermissions = () => {
  const permissions: string[] = [];

  Object.values(PERMISSIONS).forEach((domain) => {
    if (typeof domain === "object" && domain !== null) {
      Object.values(domain).forEach((permission) => {
        if (typeof permission === "string") {
          permissions.push(permission);
        }
      });
    }
  });

  return permissions;
};

async function seedPermissions() {
  try {
    const allPermissions = getAllPermissions();
    console.log("Checking permissions...");

    for (const permission of allPermissions) {
      // Validate permission format
      if (!permission.includes(":")) {
        console.warn(`Skipping invalid permission format: ${permission}`);
        continue;
      }

      const [domain, action, subAction] = permission.split(":");
      const description = subAction
        ? `Permission to ${action} ${subAction} in ${domain}`
        : `Permission to ${action} in ${domain}`;

      const permissionId = generatePermissionId(permission);

      await prisma.permissons.upsert({
        where: {
          id: permissionId,
          name: permission,
        },
        update: {
          description: description,
          isActive: true,
        },
        create: {
          id: permissionId,
          name: permission,
          description: description,
          isActive: true,
        },
      });
    }

    // Optional: Clean up removed permissions
    const existingPermissions = await prisma.permissons.findMany();
    const validPermissionIds = allPermissions.map((p) =>
      generatePermissionId(p)
    );

    for (const existingPerm of existingPermissions) {
      if (!validPermissionIds.includes(existingPerm.id)) {
        await prisma.permissons.update({
          where: { id: existingPerm.id },
          data: { isActive: false },
        });
      }
    }

    console.log("Permissions synchronized successfully.");
  } catch (error) {
    console.error("Error seeding permissions:", error);
    throw error;
  }
}

export { seedPermissions };
