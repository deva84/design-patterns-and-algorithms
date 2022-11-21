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

  getTitle(): string {
    return 'Shipper';
  }
}
