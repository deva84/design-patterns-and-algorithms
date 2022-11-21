import { calculateShippingCost, Shipper } from './shipper.models';
import { DeliveryPrice, shippingPrice } from '../common/configuration';

export class ChicagoSprintShipper implements Shipper {
  private static shipper: ChicagoSprintShipper;

  static getInstance(): ChicagoSprintShipper {
    if (!ChicagoSprintShipper.shipper) {
      ChicagoSprintShipper.shipper = new ChicagoSprintShipper();
    }
    return ChicagoSprintShipper.shipper;
  }

  getCost(weight: number): number {
    const rawCost = weight * DeliveryPrice.CHICAGO_SPRINT;
    return rawCost / 100;
  }

  getSmallPackCost(weight: number): number {
    const prices = shippingPrice.chicagoSprint.small
    return calculateShippingCost(weight, prices.base, prices.extra, prices.flat);
  }

  getMediumPackCost(weight: number): number {
    const prices = shippingPrice.chicagoSprint.medium
    return calculateShippingCost(weight, prices.base, prices.extra, prices.flat);
  }

  getLargePackCost(weight: number): number {
    const prices = shippingPrice.chicagoSprint.large
    return calculateShippingCost(weight, prices.base, prices.extra, prices.flat);
  }

  getTitle(): string {
    return 'Chicago Sprint';
  }
}
