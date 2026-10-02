import { log } from "node:console";
import Project from "../schema/Project.schema.ts";

export const getProjects = async (req: any, res: any) => {
  try {
    const { id, role } = req.user;

    if (!id || !role) {
      return res?.status(400).send({
        message: "Invalid user data",
        success: false,
      });
    }

    let projects = await Project.find({companyId: id});

    res?.status(200).send({
      message: "Projects fetched successfully",
      data: projects,
      success: true,
    });
  } catch (error) {
    log("error", error);
    res?.status(500).send("Internal Server Error");
  }
};


