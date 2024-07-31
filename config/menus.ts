import {
  Application,
  DashBoard,
  ClipBoard2,
  Pointer,
  Settings,
  UserSign,
} from "@/components/svg";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const menusConfig = {
  mainNav: [
    {
      title: " Dashboard",
      icon: DashBoard,
      href: "/dashboard",
    },
    {
      title: "Global Setting",
      icon: Settings,
      child: [
        {
          title: "Main Setting",
          href: "/mainsetting",
          icon: Settings,
        },
        {
          title: "Product Features",
          href: "/productfeatures",
          icon: Pointer,
        },
        {
          title: "Payment Mode",
          href: "/project",
          icon: ClipBoard2,
        },
        {
          title: "Role",
          href: "/project",
          icon: UserSign,
        },
      ],
    },
    {
      title: "Quatation",
      icon: Application,
      href: "/quatation",
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: " Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Global Setting",
        icon: Settings,
        child: [
          {
            title: "Main Setting",
            href: "/mainsetting",
            icon: Settings,
          },
          {
            title: "Product Features",
            href: "/productfeatures",
            icon: Pointer,
          },
          {
            title: "Payment Mode",
            href: "/project",
            icon: ClipBoard2,
          },
          {
            title: "Role",
            href: "/project",
            icon: UserSign,
          },
        ],
      },
      {
        title: "Quatation",
        icon: Application,
        href: "/quatation",
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: " Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Global Setting",
        icon: Settings,
        child: [
          {
            title: "Main Setting",
            href: "/mainsetting",
            icon: Settings,
          },
          {
            title: "Product Features",
            href: "/productfeatures",
            icon: Pointer,
          },
          {
            title: "Payment Mode",
            href: "/project",
            icon: ClipBoard2,
          },
          {
            title: "Role",
            href: "/project",
            icon: UserSign,
          },
        ],
      },
      {
        title: "Quatation",
        icon: Application,
        href: "/quatation",
      },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
