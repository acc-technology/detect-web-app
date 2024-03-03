import { useRequest } from 'ahooks';
import axios from 'axios';

const instance = axios.create({ baseURL: import.meta.env.VITE_BASE_API });

export const useUploadQuery = () =>
  useRequest(
    async ({ image }: { image: File }) => {
      const formData = new FormData();
      formData.append('image', image);
      return (await instance.post('/image/upload', formData)).data.data;
    },
    { manual: true },
  );

export const useGetImageQuery = ({ id }: { id: number }) =>
  useRequest(
    async () =>
      (await instance.get('/image/get', { params: { id } })).data.data,
  );

export const useListImageQuery = () =>
  useRequest(async () => (await instance.get('/image/list')).data.data);
