import { log } from "node:console";
import User from "../schema/User.schema.ts";
import becrypt from "bcrypt";
import Role from "../schema/Role.schema.ts";

export const getEmployDetails = async (req: any, res: any) => {
  try {
    const { id, role } = req.user;

    if (!id || !role) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    let users = await User.find({ companyId: id });

    res?.status(200).send({
      message: "User details fetched successfully",
      data: users,
      success: true,
    });
  } catch {
    log("error", "error");
    res?.status(500).send("Internal Server Error");
  }
};

export const createEmploy = async (req: any, res: any) => {
  try {
    const { id, role } = req.user;
    const { firstName, lastName, email, title } = req.body;

    if (!id || !role) {
      return res.status(404).send({
        message: "Aunthentication failed",
        success: false,
      });
    }
    let password = await becrypt.hash(
      process.env.NEW_EMPLOY_PASSWORD as string,
      10,
    );
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email: email,
      role: title,
      password: password,
      companyId: id,
    });

    res?.status(200).send({
      message: "User created successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    log("error", error);
    res?.status(500).send("Internal Server Error");
  }
};

export const editEmploy = async (req: any, res: any) => {
  try {
    const { id, role } = req.user;
    const { firstName, lastName, email, title } = req.body;
    const { id: employId } = req.params;

    if (!id || !role) {
      return res.status(404).send({
        message: "Aunthentication failed",
        success: false,
      });
    }

    let user = await User.findOneAndUpdate(
      { _id: employId, companyId: id },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: title,
      },
      { new: true },
    );

    if (!user) {
      return res.status(404).send({
        message: "Employee not found",
        success: false,
      });
    }

    res?.status(200).send({
      message: "User updated successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    log("error", error);
    res?.status(500).send("Internal Server Error");
  }
};

export const deleteEmploy = async (req: any, res: any) => {
  try {
    const { id, role } = req.user;
    const { id: employId } = req.params;

    if (!id || !role) {
      return res.status(404).send({
        message: "Aunthentication failed",
        success: false,
      });
    }

    let user = await User.findOneAndDelete({ _id: employId, companyId: id });

    if (!user) {
      return res.status(404).send({
        message: "Employee not found",
        success: false,
      });
    }

    res?.status(200).send({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    log("error", error);
    res?.status(500).send("Internal Server Error");
  }
};

/**
 * get a user roles by id
 */

export const getEmployRoles = async (req: any, res: any) => {
  try {
    let { id } = req.user;
    let { limit = 10, page } = req.query;

    let Roles = await Role.find(
      { companyId: id },
      {
        _id: 1,
        name: 1,
      },
    )
      .limit(limit)
      .skip(limit * page);

    res?.status(200).json({
      message: "User roles fetched successfully",
      data: {
        roles: Roles,
        count: Roles.length,
      },

      success: true,
    });
  } catch (error) {
    log("error", error);
    res?.status(500).send("Internal Server Error");
  }
};

/**
 * create a user role
 *
 */

export const createRole = async (req: any, res: any) => {
  try {
    let { id } = req.user;
    let { name } = req.body;

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

    let role = await Role.create({
      name: name,
      companyId: id,
    });

    res?.status(200).json({
      message: "Role created successfully",
      data: role,
      success: true,
    });
  } catch (error) {
    log("error", error);
    res?.status(500).send("Internal Server Error");
  }
};