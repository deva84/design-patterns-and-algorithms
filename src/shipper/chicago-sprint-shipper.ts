import { Shipper } from './shipper.models';
import { DeliveryPrice } from '../common/configuration';

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

  getTitle(): string {
    return 'Chicago Sprint';
  }
}
