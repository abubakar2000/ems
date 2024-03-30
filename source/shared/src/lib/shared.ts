import { IQuotationLineItem } from '../types/types';

export function shared(): string {
  return 'shared';
}

export const calculatedQuotationHeader = (quotation: IQuotationLineItem) => {
  const purchasePriceTotal =
    Number(quotation?.purchasePricePerUnit) * Number(quotation?.quantity);

  const salePriceTotal =
    Number(quotation?.salePricePerUnit) * Number(quotation?.quantity);

  const saleTaxPerUnit =
    (Number(quotation?.saleTaxRate) / 100) *
    Number(quotation?.salePricePerUnit);

  const saleTaxTotal = saleTaxPerUnit * Number(quotation?.quantity);

  const quotedPricePerUnit =
    Number(quotation?.salePricePerUnit) + saleTaxPerUnit;

  const subTotal = quotedPricePerUnit * Number(quotation?.quantity);

  return {
    ...quotation,
    purchasePriceTotal,
    salePriceTotal,
    saleTaxPerUnit,
    saleTaxTotal,
    quotedPricePerUnit,
    subTotal,
  };
};
