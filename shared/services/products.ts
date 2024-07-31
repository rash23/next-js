import { Product } from '@prisma/client';
import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(ApiRoutes.PRODUCTS_SEARCH, { params: { query } });

  return data;
};
