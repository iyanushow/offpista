export interface IStorage {}

export const Storage = {
  setItem: (itemKey: string, itemValue: string | object) => {
    if (typeof itemValue === "object") {
      itemValue = JSON.stringify(itemValue);
    }
    localStorage.setItem(itemKey, itemValue);
  },

  getItem: (itemKey: string): object => {
    const itemValue = localStorage.getItem(itemKey);
    if (!itemValue) return {};

    return JSON.parse(itemValue);
  },

  removeItem: (itemKey: string) => {
    localStorage.removeItem(itemKey);
  },
};
