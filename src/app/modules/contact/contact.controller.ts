import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ContactServices } from './contact.service';

// Create a contact message
const createContact = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.createContact(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Message received successfully',
    data: result,
  });
});

// Get all contact messages
const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.getAllContacts(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Messages retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

// Get a single contact message
const getSingleContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactServices.getSingleContact(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Message retrieved successfully',
    data: result,
  });
});

export const ContactControllers = {
  createContact,
  getAllContacts,
  getSingleContact,
};
