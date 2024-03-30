import { Quotation, QuotationLineItem } from '@prisma/client';

export interface NullableDefaults {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IQuotation extends NullableDefaults, Quotation {
  quotationLineItems: IQuotationLineItem[];
  incomeTaxRate?: number | null;
  salesTaxRecovery?: number | null;
}

export interface IQuotationLineItem
  extends NullableDefaults,
    QuotationLineItem {
  quotation?: IQuotation;
  quotationId?: number;

  quantity?: number | null;
  purchasePricePerUnit?: number | null;
  salePricePerUnit?: number | null;
  saleTaxRate?: number | null;
}
