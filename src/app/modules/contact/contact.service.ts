import { Contact } from './contact.model';
import { TContact } from './contact.interface';
import QueryBuilder from '../../builder/QueryBuilder';

// Create a contact inquiry
const createContact = async (payload: TContact) => {
  const result = await Contact.create(payload);
  return result;
};

// Get all contact inquiries
const getAllContacts = async (query: Record<string, unknown>) => {
  const ContactQuery = new QueryBuilder(Contact.find(), query)
    .sort()
    .sortOrder()
    .paginate();
  const result = await ContactQuery.modelQuery;
  const meta = await ContactQuery.countTotal();

  return {
    result,
    meta,
  };
};

// Get a single contact inquiry by ID
const getSingleContact = async (id: string) => {
  const result = await Contact.findById(id);
  return result;
};

export const ContactServices = {
  createContact,
  getAllContacts,
  getSingleContact,
};
