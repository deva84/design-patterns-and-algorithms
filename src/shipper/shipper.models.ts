import { PRICE_PER_OUNCE } from '../common/configuration';

export class Shipper {
  private static shipper: Shipper;

  static getInstance(): Shipper {
    if (!Shipper.shipper) {
      Shipper.shipper = new Shipper();
    }
    return Shipper.shipper;
  };

  getCost(weight: number): number {
    return weight * PRICE_PER_OUNCE;
  };

  getSmallPackCost(weight: number): number {
    return this.getCost(weight)
  }

  getMediumPackCost(weight: number): number {
    return this.getCost(weight);
  }

  getLargePackCost(weight: number): number {
    return this.getCost(weight);
  }

  getTitle(): string {
    return 'Shipper';
  }
}

export function calculateShippingCost(weight: number, basePrice: number, extraPrice: number, flatFee: number): number {
  return weight * (basePrice + extraPrice) + flatFee;
}
