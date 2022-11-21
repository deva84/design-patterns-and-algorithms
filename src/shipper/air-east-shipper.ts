import { calculateShippingCost, Shipper } from './shipper.models';
import { DeliveryPrice, shippingPrice } from '../common/configuration';

export class AirEastShipper implements Shipper {
  private static shipper: AirEastShipper;

  static getInstance(): AirEastShipper {
    if (!AirEastShipper.shipper) {
      AirEastShipper.shipper = new AirEastShipper();
    }
    return AirEastShipper.shipper;
  }

  getCost(weight: number): number {
    const rawCost = weight * DeliveryPrice.AIR_EAST;
    return rawCost / 100;
  }

  getSmallPackCost(weight: number): number {
    const prices = shippingPrice.airEast.small
    return calculateShippingCost(weight, prices.base, prices.extra, prices.flat);
  }

  getMediumPackCost(weight: number): number {
    const prices = shippingPrice.airEast.medium
    return calculateShippingCost(weight, prices.base, prices.extra, prices.flat);
  }

  getLargePackCost(weight: number): number {
    const prices = shippingPrice.airEast.large
    return calculateShippingCost(weight, prices.base, prices.extra, prices.flat);
  }

  getTitle(): string {
    return 'Air East';
  }
}
