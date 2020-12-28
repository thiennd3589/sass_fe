
export enum LANG {
  EN = "en",
  VI = "vi",
}

interface GlobalInterface {

  //User
  isAuthenticated: boolean;
  user: {
    token?: string | null;
  };
}

export let Global: GlobalInterface = {
  //User
  isAuthenticated: false,
  user: {
    token: null,
  },
};
