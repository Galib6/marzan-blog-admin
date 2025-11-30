export interface IB2bRequestState {
  information: any;
  documents?: any;
  step: 'basic-information' | 'document-upload' | 'final-review';
}

interface IState {
  [name: string]: {
    key: string;
    initialValue: any;
  };
}

export const states: IState = {
  menu: {
    key: 'menu',
    initialValue: {
      openedMenuKeys: [],
      activeTabsKeys: 'menu',
    },
  },
  sidebar: {
    key: 'sidebar',
    initialValue: {
      opened: true,
    },
  },

  activeGroups: {
    key: 'activeGroups',
    initialValue: [],
  },
};
