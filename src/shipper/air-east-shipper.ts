import { Shipper } from './shipper.models';
import { DeliveryPrice } from '../common/configuration';

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

  getTitle(): string {
    return 'Air East';
  }
}
