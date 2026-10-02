import { privateAxios } from "@/utils/axios";
import projectRoutes from "../routes/project.routes";


const getProjectList = async() => {
    const res = await privateAxios.get(projectRoutes.project);
    return res?.data;
}



const projectService = {
    getProjectList,
}

export default projectService;