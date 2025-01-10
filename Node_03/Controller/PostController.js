import prisma from "../Db/db.config.js";


// @ Fetch post and pagination
export const fetchPosts = async (req, res) => {
    try {
       const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0 || limit > 100) {
    limit = 10;
  }
  const skip = (page - 1) * limit;
  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,
    include: {
      comment: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
    where: {
      NOT: {
        title: {
          endsWith: "Blog",
        },
      },
    },
  });

  //   * to get the total posts count
  const totalPosts = await prisma.post.count();
  const totalPages = Math.ceil(totalPosts / limit);
  return res.json({
    status: 200,
    data: posts,
    meta: {
      totalPages,
      currentPage: page,
      limit: limit,
    },
  });
    } catch (error) {
        console.log(`Erorr while fetching the post :"`, error);
    }
}

// @ Creating post
export const createPost = async (req, res) => {
    try {
        const {user_id, title, description} = req.body;
        const newPost = await prisma.post.create({
            data : {
                user_id: Number(user_id),
                title,
                description
            }
        })

        return res.json({status: 200, data: newPost, msg: `Post created successfully !`})
    } catch (error) {
        console.log(`Error while creating the post : `,error)
    }
}

// @ Updating the post
export const showPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await prisma.post.findUnique({
            where : {
                id: Number(postId)
            }
        })

        return res.json({
            status: 200, data: post
        })
    } catch (error) {
        console.log(`Error while displaying post: `,error)
    }
}

// Delete the post
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        await prisma.post.delete({
            where: {
                id: Number(postId)
            }
        })
    } catch (error) {
        console.log(`Error while deleting the post: `,error)
    }
}

// @ Searching  post
export const searchPost = async (req, res) => {
    try {
        const query = req.query.q;
  const posts = await prisma.post.findMany({
    where: {
      description: {
        search: query,
      },
    },
  });

  return res.json({ status: 200, data: posts });
    } catch (error) {
        console.log(`Error while searching post: `,error)
    }
}