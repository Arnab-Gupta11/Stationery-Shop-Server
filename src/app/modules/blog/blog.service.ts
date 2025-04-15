import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { blogSearchableFields } from './blog.constant';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

//Create a blog into DB
const createBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  return result;
};

//Get All blog from DB
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .sortOrder()
    .paginate();
  const result = await blogQuery.modelQuery;
  const meta = await blogQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

//Update a blog into DB
const updateBlogIntoDB = async (id: string, payload: Partial<IBlog>) => {
  //Update blog.
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

//Delete a blog From DB
const deleteBlogFromDB = async (blogId: string) => {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new AppError(404, 'The requested brand does not exist.');
  }

  // Soft delete by setting isActive to false
  const result = await Blog.findByIdAndUpdate(
    blogId,
    { isActive: false },
    { new: true },
  );

  return result;
};

// Get all Featured blog from DB
const getAllFeaturedBlogFromDB = async () => {
  const featuredBlog = await Blog.find({ isFeatured: true }).limit(5);
  let allBlogs: IBlog[] = [];
  if (featuredBlog.length < 5) {
    allBlogs = await Blog.find({ isFeatured: false })
      .sort({ createdAt: -1 })
      .limit(5 - featuredBlog.length);
  }
  const result = [...featuredBlog, ...allBlogs];
  return result;
};

//Update Blog status
const updateBlogStatusIntoDB = async (id: string) => {
  // Find the project first
  const project = await Blog.findById(id);

  if (!project) {
    throw new AppError(404, 'Blog not found');
  }

  // Toggle the `isFeatured` value
  const updatedProject = await Blog.findByIdAndUpdate(
    id,
    { $set: { isFeatured: !project.isFeatured } }, // Properly toggles the boolean value
    { new: true, runValidators: true },
  );

  return updatedProject;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllFeaturedBlogFromDB,
  updateBlogStatusIntoDB,
};
