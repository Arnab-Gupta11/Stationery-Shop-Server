import mongoose from 'mongoose';
import { TFavourite } from './favourite.interface';

const favouriteSchema = new mongoose.Schema<TFavourite>({
  userId: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

export const Favourite = mongoose.model<TFavourite>('Favorite', favouriteSchema);
