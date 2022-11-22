import { AbstractShipment, ShipmentData } from './shipment.models';
import { Counter } from '../persistence-layer/counter';
import { Shipper } from '../shipper/shipper.models';
import { AirEastShipper } from '../shipper/air-east-shipper';
import { ChicagoSprintShipper } from '../shipper/chicago-sprint-shipper';
import { PacificParcelShipper } from '../shipper/pacific-parcel-shipper';
import { ShipmentDecorator } from './shipment-decorator';

export class Shipment implements AbstractShipment {
  private readonly _shipmentData: ShipmentData;
  protected shipmentData: ShipmentData;
  private counter: Counter;
  protected shipper: Shipper;

  constructor(data: ShipmentData) {
    this._shipmentData = data;
    this.shipmentData = { ...this._shipmentData };
    this.counter = Counter.getInstance();
    this.shipper = this.getShipperInstance();
    this.shipmentData.shipmentID = this.getShipmentId(this._shipmentData.shipmentID);
  }

  static getInstance(shipmentData: ShipmentData): AbstractShipment {
    const instance = this.getTypedShipmentInstance(shipmentData);

    if (instance.getShipmentData().mark) {
      return new ShipmentDecorator(instance);
    }
    return instance;
  }

  static getTypedShipmentInstance(shipmentData: ShipmentData): AbstractShipment {
    if (shipmentData.weight <= 15) {
      return new Letter(shipmentData);
    }
    if (shipmentData.weight <= 160) {
      return new StandardPackage(shipmentData);
    }
    return new OverweightPackage(shipmentData);
  }

  getShipmentData(): ShipmentData {
    return this.shipmentData;
  }

  getShipmentId(id?: number): number {
    if (id) {
      return id;
    }
    return this.registerShipmentId();
  }

  ship(): string {
    const id = this.shipmentData.shipmentID;
    const fromAddress = this.shipmentData.fromAddress;
    const fromZip = this.shipmentData.fromZipCode;
    const toAddress = this.shipmentData.toAddress;
    const toZip = this.shipmentData.toZipCode;
    const cost = this.getCost();

    const message = `Shipment with the ID ${id} will be picked up from ${fromAddress} ${fromZip} 
    and shipped to ${toAddress} ${toZip} Cost = ${cost}`;

    console.log(message);
    return message;
  }

  private registerShipmentId(): number {
    return this.counter.register();
  }

  getCost(): number {
    const deliveryCost = this.shipper.getCost(this._shipmentData.weight);
    return parseFloat(deliveryCost.toFixed(2));
  }

  private getShipperInstance(): Shipper {
    if (!this._shipmentData.fromZipCode) {
      return AirEastShipper.getInstance();
    }

    const zipPrefix = parseInt(this._shipmentData.fromZipCode[0]);
    if (zipPrefix < 4) {
      return AirEastShipper.getInstance();
    }
    if (zipPrefix < 7) {
      return ChicagoSprintShipper.getInstance();
    }
    return PacificParcelShipper.getInstance();
  }
}

// children classes are placed here in order to avoid circular dependency
export class Letter extends Shipment {
  constructor(data: ShipmentData) {
    super(data);
  }

  getCost(): number {
    const deliveryCost = this.shipper.getSmallPackCost(this.shipmentData.weight);
    return parseFloat(deliveryCost.toFixed(2));
  }
}

export class StandardPackage extends Shipment {
  constructor(data: ShipmentData) {
    super(data);
  }

  getCost(): number {
    const deliveryCost = this.shipper.getMediumPackCost(this.shipmentData.weight);
    return parseFloat(deliveryCost.toFixed(2));
  }
}

export class OverweightPackage extends Shipment {
  constructor(data: ShipmentData) {
    super(data);
  }

  getCost(): number {
    const deliveryCost = this.shipper.getLargePackCost(this.shipmentData.weight);
    return parseFloat(deliveryCost.toFixed(2));
  }
}

