/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
  public setItem = async (key: string, data: any): Promise<void> => {
    return AsyncStorage.setItem(key, JSON.stringify(data));
  };

  public getItem = async <K>(key: string): Promise<K | undefined | null> => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        return JSON.parse(data) as K;
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  public multiSet = async (data: Record<string, any>[]): Promise<void> => {
    return AsyncStorage.multiSet(data.map((v) => [v[0], JSON.stringify(v[1])]));
  };

  public multiRemove = async (keys: string[]): Promise<void> => {
    return AsyncStorage.multiRemove(keys);
  };

  public removeItem = (key: string): Promise<void> => {
    return AsyncStorage.removeItem(key);
  };

  public clear = (): Promise<void> => {
    return AsyncStorage.clear();
  };
}

export default new LocalStorage();
