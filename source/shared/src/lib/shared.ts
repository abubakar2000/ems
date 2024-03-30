import { IQuotation, IQuotationLineItem } from '../types/types';

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

export const calculatedQuotationLevelHeaders = (quotations: IQuotation) => {
  const TotalPurchasePrice = quotations?.quotationLineItems?.reduce(
    (acc, item) => acc + calculatedQuotationHeader(item)?.purchasePriceTotal,
    0
  );

  const TotalSalePrice = quotations?.quotationLineItems?.reduce(
    (acc, item) => acc + calculatedQuotationHeader(item)?.salePriceTotal,
    0
  );

  const TotalSaleTax = quotations?.quotationLineItems?.reduce(
    (acc, item) => acc + calculatedQuotationHeader(item)?.saleTaxTotal,
    0
  );

  const Total = quotations?.quotationLineItems?.reduce(
    (acc, item) => acc + calculatedQuotationHeader(item)?.subTotal,
    0
  );

  const IncomeTax = (Number(quotations.incomeTaxRate) / 100) * Total;
  const TotalExpenses = IncomeTax + TotalSaleTax + TotalPurchasePrice;
  const AfterIncomeTax = Total - IncomeTax;
  const AfterTotalSaleTax = AfterIncomeTax - TotalSaleTax;
  const AfterExpenses = AfterTotalSaleTax - TotalPurchasePrice;
  const AfterRecorvery = AfterExpenses + Number(quotations.salesTaxRecovery);

  const TotalTaxes = IncomeTax + TotalSaleTax;

  return {
    TotalPurchasePrice,
    TotalSalePrice,
    TotalSaleTax,
    Total,
    IncomeTax,
    TotalTaxes,
    TotalExpenses,
    AfterIncomeTax,
    AfterTotalSaleTax,
    AfterExpenses,
    AfterRecorvery,
  };
};
