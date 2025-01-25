// import AppError from '../../errors/AppError';
// import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';

//Block User
const BlockUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return result;
};
//Delete a blog From DB
// const deleteBlogFromDbByAdmin = async (id: string) => {
//   //Check If the blog exist.
//   const isBlogExist = await Blog.findById(id).populate('author');
//   if (!isBlogExist) {
//     throw new AppError(404, 'The requested blog post does not exist.');
//   }

//   //Delete blog.
//   const result = await Blog.findByIdAndDelete(id);
//   return result;
// };

export const AdminServices = {
  BlockUserIntoDB,
  // deleteBlogFromDbByAdmin,
};
