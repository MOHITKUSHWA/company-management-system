import { privateAxios } from "@/utils/axios";
import employRoutes from "../routes/employ.routes";

const getEmployDetails = async (id: string) => {
  const res = await privateAxios.get(employRoutes.getAll);
  return res?.data;
};

const createEmploy = async (data: Object) => {
  const res = await privateAxios.post(employRoutes.create, data);
  return res?.data;
};

const editEmploy = async (id: string, data: Object) => {
  const res = await privateAxios.put(
    employRoutes.update.replace(":id", id),
    data,
  );
  return res?.data;
};

const deleteEmploy = async (id: string) => {
  const res = await privateAxios.delete(employRoutes.delete.replace(":id", id));
  return res?.data;
};

const employService = {
  getEmployDetails,
  createEmploy,
  editEmploy,
  deleteEmploy,
};

export default employService;
