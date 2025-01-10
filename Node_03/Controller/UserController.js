import prisma from "../Db/db.config.js";

// @ Getting the user details
export const fetchUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        _count: {
          select: {
            post: true,
            comment: true,
          },
        },
      },
    });

    return res.json({ status: 200, data: users });
  } catch (error) {
    console.log("Error while fetching the user :", error);
  }
};

// @ user signup

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findUser) {
      return res.json({
        status: 400,
        message: `Email already existed !`,
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return res.json({
      status: 200,
      message: "User created Successfully!",
      data: newUser,
    });
  } catch (error) {
    console.log(`Error while creating user: `, error);
  }
};
// @ Display user acc to ID

export const showUser = async (req, res) => {
  try {
    const userid = req.params.id;
    const user = await prisma.user.findFirst({
      where: {
        id: Number(userid),
      },
    });

    return res.json({ data: user, status: 200 });
  } catch (error) {
    console.log(`Erorr while displaying the user: `, error);
  }
};

// @ update user data

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name,
        email,
        password,
      },
    });

    return res.json({ status: 200, message: "User updated successfully" });
  } catch (error) {
    console.log(`Error while updating the user data: `, error);
  }
};

// @ Delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    return res.json({ status: 200, msg: "User deleted successfully" });
  } catch (error) {
    console.log(`Erorr while deleting user: `, error);
  }
};
