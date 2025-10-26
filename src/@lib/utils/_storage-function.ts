// storage utils functions
export const storage = {
    getToken: (): string => {
      if (typeof window === 'undefined') return '';
      const token = localStorage.getItem(`${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-token`);
      if (!token) {
        return '';
      }
  
      return JSON.parse(token);
    },
    setToken: (token: string) => {
      if (typeof window === 'undefined') return false;
      localStorage.setItem(`${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-token`, JSON.stringify(token));
    },
    removeToken: () => {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(`${process.env.NEXT_PUBLIC_STORAGE_PREFIX}-token`);
    },
    clear: () => {
      if (typeof window === 'undefined') return;
      localStorage.clear();
    },
    setData(data: any, key: string) {
      if (typeof window === 'undefined') return false;
      localStorage.setItem(key, JSON.stringify(data));
    },
    getData(key: string) {
      if (typeof window === 'undefined') return false;
      var item = localStorage.getItem(key);
      if (!item) {
        return false;
      }
  
      return JSON.parse(item);
    },
    removeData(key: string) {
      if (typeof window === 'undefined') {
        return;
      }
      localStorage.removeItem(key);
    },
  };
  // storage utils functions end
  
  export const methodSuccessMessage = (method: 'POST' | 'PUT' | 'DELETE' | string): string => {
    switch (method.toUpperCase()) {
      case 'POST':
        return 'Created Success';
      case 'PUT':
        return 'Update Success';
      case 'DELETE':
        return 'Delete Success';
      default:
        return '';
    }
  };
  