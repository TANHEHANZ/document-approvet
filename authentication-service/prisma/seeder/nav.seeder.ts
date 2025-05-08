import { prisma } from "../../src/infraestructure/config/prisma.client";

interface NavItem {
  path: string;
  label: string;
  icon: string;
  color?: string;
  children?: NavItem[];
}

async function seedNavItems() {
  const navItemsReportes: NavItem[] = [
    {
      path: "/admin/reportes",
      label: "Reportes",
      icon: "ChartColumnDecreasing",
      color: "#9157D6",
      children: [
        {
          path: "/admin/dashboard/reports",
          label: "Gráficas",
          icon: "ChartPie",
        },
        {
          path: "/admin/dashboard/exports",
          label: "Exportaciones",
          icon: "FileText",
        },
        {
          path: "/admin/dashboard/alert",
          label: "Alertas",
          icon: "TriangleAlert",
        },
      ],
    },
  ];

  const navItemsGestion: NavItem[] = [
    {
      path: "/admin/usuarios",
      label: "Usuarios",
      icon: "UserRound",
      color: "#4FB9A8",
    },
    {
      path: "/admin/clientes",
      label: "Clientes",
      icon: "Client",
      color: "#EA547C",
    },
  ];

  const navItemsConfiguraciones: NavItem[] = [
    {
      path: "/admin/configuraciones",
      label: "Configuraciones",
      icon: "Settings",
      color: "#9157D6",
      children: [
        {
          path: "/admin/configuraciones/parametros",
          label: "Generales",
          icon: "Settings",
        },
        {
          path: "/admin/configuraciones/roles",
          label: "Roles",
          icon: "UserRoundCog",
        },
        {
          path: "/admin/configuraciones/permisos",
          label: "Permisos",
          icon: "UserRoundCog",
        },
        {
          path: "/admin/configuraciones/auditoria",
          label: "Auditoría",
          icon: "ScanEye",
        },
      ],
    },
  ];

  const allNavItems: NavItem[] = [
    ...navItemsReportes,
    ...navItemsGestion,
    ...navItemsConfiguraciones,
  ];

  for (const item of allNavItems) {
    const parent = await prisma.nav.upsert({
      where: { id: item.path },
      update: { name: item.label, icon: item.icon, color: item.color },
      create: {
        name: item.label,
        path: item.path,
        icon: item.icon,
        color: item.color,
      },
    });

    if (item.children) {
      for (const child of item.children) {
        await prisma.nav.upsert({
          where: { id: child.path }, // Use a unique identifier
          update: {
            name: child.label,
            icon: child.icon,
            parentId: parent.id,
          },
          create: {
            name: child.label,
            path: child.path,
            icon: child.icon,
            parentId: parent.id,
          },
        });
      }
    }
  }

  console.log("Nav items seeded successfully.");
}

export { seedNavItems };
