import { log } from "node:console";
import Role from "../schema/Role.schema.ts";

export const getRoles = async (req: any, res: any) => {
  try {
    let { id } = req.user;
    if (!id) {
      return res?.status(400).json({
        message: "Invalid user data",
        success: false,
      });
    }
    let roles = await Role.find(
      { companyId: id },
      {
        _id: 1,
        name: 1,
        permissions: 1,
      },
    ).sort({ createdAt: -1 });
    res?.status(200).json({
      message: "Roles fetched successfully",
      data: roles,
      success: true,
    });
  } catch (error) {
    res?.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const createRole = async (req: any, res: any) => {
  try {
    let { id } = req.user;
    let { role, permission } = req.body;

    if (!id) {
      return res?.status(400).json({
        message: "Invalid user data",
        success: false,
      });
    }

    if (!role || !permission) {
      return res?.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    let createRole = await Role.create({
      name: role,
      permissions: permission,
      companyId: id,
    });

    res?.status(200).json({
      message: "Role created successfully",
      data: createRole,
      success: true,
    });
  } catch (error) {
    res?.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

/**
 * update a user role
 */

export const updateRole = async (req: any, res: any) => {
  try {
    let { id } = req.user;
    let { name } = req.body;
    let { id: roleId } = req.params;

    if (!id) {
      return res.status(404).send({
        message: "Aunthentication failed",
        success: false,
      });
    }

    if (!name) {
      return res.status(404).send({
        message: "Role name is required",
        success: false,
      });
    }

    let role = await Role.findOneAndUpdate(
      { _id: roleId, companyId: id },
      { name: name },
      { new: true },
    );

    res?.status(200).json({
      message: "Role updated successfully",
      data: role,
      success: true,
    });
  } catch (error) {
    log("error", error);
    res?.status(500).send("Internal Server Error");
  }
};

/**
 * delete a user role
 */

export const deleteRole = async (req: any, res: any) => {
  try {
    let { id } = req.user;
    let { id: roleId } = req.params;

    if (!id) {
      return res.status(404).send({
        message: "Aunthentication failed",
        success: false,
      });
    }

    let role = await Role.findOneAndDelete({ _id: roleId, companyId: id });

    res?.status(200).json({
      message: "Role deleted successfully",
      data: role,
      success: true,
    });
  } catch (error) {
    log("error", error);
    res?.status(500).send("Internal Server Error");
  }
};
