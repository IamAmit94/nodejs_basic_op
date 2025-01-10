import prisma from "../Db/db.config.js";



export const createComment = async (req, res) => {
    try {
        const {user_id, post_id, comment} = req.body;


        // increse the comment count when added
        await prisma.comment.update({
            where: {
                id: Number(post_id)
            },
            data: {
                comment_count: {
                    increment: 1
                }
            }
        })


        const newComment = await prisma.comment.create({
            data: {
                user_id: Number(user_id),
                post_id: Number(post_id),
                comment
            }
        })


        return res.json({
            status: 200,
            data: newComment,
            msg: `Comment added successfully !`
        })
    } catch (error) {
        console.log(`Error while creating the comment: `,error);
    }
}


export const showComment = async (req, res) => {
    try {

        const commentId = req.params.id;

        const post = await prisma.comment.findFirst({
            where: {
                id: Number(commentId)
            }
        })


        return res.json({
            status: 200,
            data: post
        })
        
    } catch (error) {
        console.log(`Error while displaying the comment: `,error);
    }
}


export const fetchComment = async(req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: {
              user: true,
              post: {
                include: {
                  user: true,
                },
              },
            },
          });
          return res.json({ status: 200, data: comments });
    } catch (error) {
        console.log(`Error while fetching comments: `,error);
    }
}

export const deleteComment = async(req, res) => {
    try {
        const commentId = req.params.id;

        // decrese the comment count

        await prisma.comment.update({
            where : {
                id: Number(post_id)
            },
            data: {
                comment_count: {
                    decrement: 1
                }
            }
        })

         await prisma.comment.delete({
            where: {
                id: Number(commentId)
            }
        })


        return res.json({
            status: 200,
            data: post
        })
        
    } catch (error) {
        console.log(`Error while deleting comment: `,error);
    }
}


