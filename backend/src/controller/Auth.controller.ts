import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import User from "../schema/User.schema.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Company from "../schema/Company.schema.ts";
import { log } from "node:console";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { transporter } from "../config/email.config.ts";
import Otp from "../schema/Otp.schema.ts";
import ErrorHandler from "../utils/errorhandle.ts";
import catchAsync from "../utils/catchAsync.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const randomSixDigit = () => Math.floor(100000 + Math.random() * 900000);

interface UpdateProfileData {
  name?: string;
  email?: string;
  companyName?: string;
  nameOfOwner?: string;
  profileImage?: string | undefined | null;
}

/**
 * Handles user registration requests.
 */

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(400, errors.array()[0].msg));
  }
  let data = req.body;
  if (data?.email && data?.password) {
    let oldCompany = await Company.findOne({ email: data?.email });
    if (oldCompany && !oldCompany?.isVerified) {

    }
    if (oldCompany) {
      return next(new ErrorHandler(400, "Company already exists"));
    }
    data = {
      ...data,
      password: await bcrypt.hash(data?.password, 10),
    };

    let user: any = await Company.create(data);

    if (!user) {
      return next(new ErrorHandler(400, "User not created"));
    }

    const welcomeTemplatePath = path.join(
      __dirname,
      "../emails/welomeMai.ejs",
    );

    /**
     * ganerate otp 6 digit with exp 10 min
     */

    const otp: any = randomSixDigit();
    const saveOtp = await Otp?.create({
      email: data?.email,
      otp,
      role: "company",
    });
    if (!saveOtp) {
      return next(new ErrorHandler(500, "Internal Server Error"));
    }
    /**
     * send verification mail
     */
    const html = await ejs.renderFile(welcomeTemplatePath, {
      name: data?.companyName,
      otp,
    });

    await transporter.sendMail({
      from: `"Task Manager" <${process.env.FROM_EMAIL}>`,
      to: data?.email,
      subject: "Welcome to Task Manager",
      html,
    });

    res?.status(200).send({
      message: "Verification mail sent successfully",
      success: true,
    });
  } else {
    res?.status(400)?.send({
      message: "",
    });
  }
});

/**
 * Handles user login requests.
 * @param req - The request object.
 * @param res - The response object.
 */

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "Email and password are required"));
  }

  let user: any;

  if (role === "employee") {
    user = await User.findOne(
      { email },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    );
  } else {
    user = await Company.findOne(
      { email },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    );
  }

  if (!user) {
    return next(new ErrorHandler(404, `${role} not found`));
  }

  if (!user.isVerified) {
    return next(new ErrorHandler(401, `${role} is not verified`));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new ErrorHandler(401, "Invalid password"));
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role || "company",
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    },
  );
  res?.status(200).send({
    message: `${role} logged in successfully`,
    data: user,
    accessToken: token,
    success: true,
    isVerified: user.isVerified,
  });
}
);

/**
 * Get details of the logged in user.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The details of the logged in user.
 */

export const getDetails = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const { id, role } = req.user;

  let user: UpdateProfileData | null = null;

  if (role === "employee") {
    user = await User.findById(id, {
      password: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
  } else {
    user = await Company.findById(id, {
      password: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
  }

  if (!user) {
    return next(new ErrorHandler(404, `${role} not found`));
  }

  res?.status(200).send({
    message: "User details fetched successfully",
    data: user,
    success: true,
  });
});

/**
 * forGet Password
 */

export const forgetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email = "" } = req?.body;

  if (!email) {
    return next(new ErrorHandler(400, "Email is required"));
  }

  let oldCompany = await Company.findOne({ email });

  if (!oldCompany) {
    return res.status(401).send({
      message: `Compnay is not found`,
      success: false,
    });
  }

  /**
   * generate otp for forget password in 10 minutes exp
   */

  const otp: any = randomSixDigit();
  const saveOtp = await Otp?.create({
    email: oldCompany?.email,
    otp,
    role: "company",
  });

  if (!saveOtp) {
    return next(new ErrorHandler(400, "Otp not created"));
  }

  const html = await ejs.renderFile(
    path.join(__dirname, "../emails/forgetPassword.ejs"),
    {
      name: oldCompany?.companyName,
      otp,
    },
  );

  await transporter.sendMail({
    from: `"Task Manager" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: "Password Reset OTP",
    html,
  });

  res?.status(200).send({
    message: "OTP sent successfully",
    success: true,
  });

});

export const otpVerification = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new ErrorHandler(400, "Email and OTP are required"));
  }

  const savedOtp = await Otp.findOne({ email, otp });

  if (!savedOtp) {
    return next(new ErrorHandler(400, "Invalid OTP"));
  }

  await Otp.deleteOne({ _id: savedOtp._id });
  let company: any = await Company.findOneAndUpdate(
    { email },
    { isVerified: true },
  );
  const token = jwt.sign(
    {
      id: company?._id,
      email,
      role: "company",
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    },
  );
  res?.status(200).send({
    message: "OTP verified successfully",
    success: true,
    token: token,
  });
});

export const resendOtp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler(400, "Email is required"));
  }

  const company = await Company.findOne({ email });
  if (!company) {
    return next(new ErrorHandler(404, "Company not found"));
  }

  const otp: any = randomSixDigit();
  const saveOtp = await Otp?.create({
    email,
    otp,
  });

  if (!saveOtp) {
    return next(new ErrorHandler(400, "Otp not created"));
  }

  const html = await ejs.renderFile(
    path.join(__dirname, "../emails/welomeMai.ejs"),
    {
      name: company.companyName,
      otp,
    },
  );

  await transporter.sendMail({
    from: `"Task Manager" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: "Resend OTP - Welcome to Task Manager",
    html,
  });

  res?.status(200).send({
    message: "OTP resent successfully",
    success: true,
  });

});

export const resetPassword = async (req: any, res: Response) => {
  try {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword) {
      return res.status(400).send({
        message: "Reset token and new password are required",
        success: false,
      });
    }

    let decodedToken: any;
    try {
      decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET as string);
    } catch (error) {
      return res.status(400).send({
        message: "Invalid or expired reset token",
        success: false,
      });
    }

    const company = await Company.findOne({ email: decodedToken.email });
    if (!company) {
      return res.status(404).send({
        message: "Company not found",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    company.password = hashedPassword;
    await company.save();

    res?.status(200).send({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    log(error, "error");
    res?.status(500).send("Internal Server Error");
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { id, role } = req.user;
    const updateData = req.body;

    let user: UpdateProfileData | null;

    if (role === "employee") {
      user = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        select: { password: 0, __v: 0, createdAt: 0, updatedAt: 0 },
      });
    } else {
      user = await Company.findByIdAndUpdate(id, updateData, {
        new: true,
        select: { password: 0, __v: 0, createdAt: 0, updatedAt: 0 },
      });
    }
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    res?.status(200).send({
      message: "Profile updated successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    log(error, "error");
    res?.status(500).send("Internal Server Error");
  }
};

export const changePassword = async (req: any, res: Response) => {
  try {
    const { id, role } = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).send({
        message: "Current password and new password are required",
        success: false,
      });
    }

    let user: any;

    if (role === "employee") {
      user = await User.findById(id);
    } else {
      user = await Company.findById(id);
    }

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Current password is incorrect",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res?.status(200).send({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    log(error, "error");
    res?.status(500).send("Internal Server Error");
  }
};

export const uploadProfileImage = async (req: any, res: Response) => {
  try {
    const { id, role } = req.user;
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).send({
        message: "Profile image is required",
        success: false,
      });
    }

    let user: any;

    if (role === "employee") {
      user = await User.findByIdAndUpdate(
        id,
        { profileImage: imageUrl },
        { new: true },
      );
    } else {
      user = await Company.findByIdAndUpdate(
        id,
        { profileImage: imageUrl },
        { new: true },
      );
    }

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Profile image uploaded successfully",
      profileImage: imageUrl,
      success: true,
    });
  } catch (error) {
    log(error, "error");
    res?.status(500).send("Internal Server Error");
  }
};

export const deleteAccount = async (req: any, res: Response) => {
  try {
    const { id, role } = req.user;

    let user: any;

    if (role === "employee") {
      user = await User.findByIdAndDelete(id);
    } else {
      user = await Company.findByIdAndDelete(id);
    }

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    res?.status(200).send({
      message: "Account deleted successfully",
      success: true,
    });
  } catch (error) {
    log(error, "error");
    res?.status(500).send("Internal Server Error");
  }
};
