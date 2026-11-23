import { apiServices } from "../networkService";
import { API_ENDPOINT } from "@/constants/endpoints";
import { filterParams } from "../params";

type GetTasksParams = {
  user_id?: string;
};

type ResponseTaskData = {
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

/**
 * Fetches all tasks for a specific user
 * @returns Promise<ResponseTaskData> tasks data
 */

export const fetchAllTasksByUser = async (
  params: GetTasksParams,
): Promise<ResponseTaskData> => {
  const requestedParams = filterParams({
    ...params,
  });

  const { data } = await apiServices.get<ResponseTaskData>(
    API_ENDPOINT.GET_ALL_TASKS,
    requestedParams,
  );
  return data;
};
