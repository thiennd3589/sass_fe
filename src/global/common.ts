import { Menu } from "interfaces/common";

export enum LANG {
  EN = "en",
  VI = "vi",
}

export enum SCREEN {
  ROADMAP = "roadmap",
  CAMPAIGN = "campaign",
  REPORT = "report",
}

interface GlobalInterface {
  menus: Menu[];
  //User
  isAuthenticated: boolean;
  user: {
    token?: string | null;
  };
}

export let Global: GlobalInterface = {
  menus: [
    {
      title: "Basic info",
      route: "/basicInfo",
      icon: "info circle",
    },
  ],
  //User
  isAuthenticated: false,
  user: {
    token: null,
  },
};
