import { privateAxios, publicAxios } from "@/utils/axios";
import rolesRoutes from "../routes/roles.routes";

const getAllRoles = async () => {
  const res = await privateAxios.get(rolesRoutes.getAll);
  return res?.data;
};

const createRole = async (data: Object) => {
  const res = await privateAxios.post(rolesRoutes.create, data);
  return res?.data;
};

const rolesService = {
  getAllRoles,
  createRole,
};

export default rolesService;
