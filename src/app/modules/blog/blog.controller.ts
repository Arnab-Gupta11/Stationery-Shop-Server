import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BlogServices } from './blog.service';
import sendResponse from '../../utils/sendResponse';

//Creat a new Blog.
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.createBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

//Get all blogs
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});
// Get a single project
const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogServices.getSingleBlogFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog fetched successfully',
    data: result,
  });
});

//Update a blog
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogIntoDB(id, req.body);
  if (result) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Blog updated successfully',
      data: result,
    });
  }
});

//Delete a blog
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogFromDB(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    });
  }
});

const getAllFeturedblogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllFeaturedBlogFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Featured Blogs fetched successfully',
    data: result,
  });
});
// Update a project
const updateBlogStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogStatusIntoDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog Status Updated',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  getAllFeturedblogs,
  updateBlogStatus,
};
