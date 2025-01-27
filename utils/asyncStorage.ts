const asyncStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      const value = localStorage.getItem(key);
      return value ? value : null;
    } catch (error) {
      throw error;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      throw error;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (error) {
      throw error;
    }
  },
};

export default asyncStorage;
