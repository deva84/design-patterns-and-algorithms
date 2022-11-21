import { calculateShippingCost, Shipper } from './shipper.models';
import { DeliveryPrice, shippingPrice } from '../common/configuration';

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

  getSmallPackCost(weight: number): number {
    const prices = shippingPrice.pacificParcel.small
    return calculateShippingCost(weight, prices.base, prices.extra, prices.flat);
  }

  getMediumPackCost(weight: number): number {
    const prices = shippingPrice.pacificParcel.medium
    return calculateShippingCost(weight, prices.base, prices.extra, prices.flat);
  }

  getLargePackCost(weight: number): number {
    const prices = shippingPrice.pacificParcel.large
    return calculateShippingCost(weight, prices.base, prices.extra, prices.flat);
  }

  getTitle(): string {
    return 'Pacific Parcel';
  }
}
