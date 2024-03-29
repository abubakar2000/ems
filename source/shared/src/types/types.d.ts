import { Quotation, QuotationLineItem } from '@prisma/client';

export interface NullableDefaults {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IQuotation extends NullableDefaults, Quotation {
  quotationLineItems: IQuotationLineItem[];
}

export interface IQuotationLineItem
  extends NullableDefaults,
    QuotationLineItem {
  quotation?: IQuotation;
}
