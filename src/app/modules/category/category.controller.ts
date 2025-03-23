import { Request, Response } from 'express';
import { categoryService } from './category.service';

export const categoryController = {
  async getAll(req: Request, res: Response) {
    const data = await categoryService.getAll();
    res.json(data);
  },
};
