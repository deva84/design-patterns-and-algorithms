import { Shipper } from './shipper.models';
import { DeliveryPrice } from '../common/configuration';

export class PacificParcelShipper implements Shipper {
  private static shipper: PacificParcelShipper;

  static getInstance(): PacificParcelShipper {
    if (!PacificParcelShipper.shipper) {
      PacificParcelShipper.shipper = new PacificParcelShipper();
    }
    return PacificParcelShipper.shipper;
  }

  getCost(weight: number): number {
    const rawCost = weight * DeliveryPrice.PACIFIC_PARCEL;
    return rawCost / 100;
  }

  getTitle(): string {
    return 'Pacific Parcel';
  }
}
