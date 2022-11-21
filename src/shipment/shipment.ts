import { AbstractShipment, ShipmentData } from './shipment.models';
import {Counter} from "../persistence-layer/counter";
import { Shipper } from '../shipper/shipper.models';
import { AirEastShipper } from '../shipper/air-east-shipper';
import { ChicagoSprintShipper } from '../shipper/chicago-sprint-shipper';
import { PacificParcelShipper } from '../shipper/pacific-parcel-shipper';

export class Shipment implements AbstractShipment {
  private readonly _shipmentData: ShipmentData;
  protected shipmentData: ShipmentData;
  private counter: Counter;
  protected shipper: Shipper;

  constructor(data: ShipmentData) {
    this._shipmentData = data;
    this.shipmentData = {...this._shipmentData};
    this.counter = Counter.getInstance();
    this.shipper = this.getShipperInstance();
    this.shipmentData.shipmentID = this.getShipmentId();
  }

  getInstance(): Shipment {
    if (this.shipmentData.weight <= 15) {
      return new Letter(this.shipmentData);
    }
    if (this.shipmentData.weight <= 160) {
      return new StandardPackage(this.shipmentData);
    }
    return new OverweightPackage(this.shipmentData);
  }

  getShipmentId(): number {
    if (this._shipmentData.shipmentID) {
      return this._shipmentData.shipmentID;
    }
    return this.registerShipmentId();
  }

  ship(): string {
     const htmlMessage = this.getHTMLMessage();
     const humanFriendlyMessage = htmlMessage.replace(/<[^>]*>?/gm, '')

     console.log(humanFriendlyMessage);
     return htmlMessage;
  }

  private registerShipmentId(): number {
    return this.counter.register();
  }

  protected getCost(): string {
    const deliveryCost = this.shipper.getCost(this._shipmentData.weight);
    return `${deliveryCost.toFixed(2)} USD`
  }

  private getHTMLMessage(): string {
    return `<div> Shipment ID: ${this.shipmentData.shipmentID} 
    <br>From: <span class="from-address">${this.shipmentData.fromAddress}, 
    ${this.shipmentData.fromZipCode ? this.shipmentData.fromZipCode : ''}</span> 
    <br>To: <span class="to-address">${this.shipmentData.toAddress}, ${this.shipmentData.toZipCode}</span>
    <br>Shipper: <span class="shipper">${this.shipper.getTitle()}</span> 
    <br>Cost: <span class="cost">${this.getCost()}</span></div>`;
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

  protected getCost(): string {
    const deliveryCost = this.shipper.getSmallPackCost(this.shipmentData.weight);
    return `${deliveryCost.toFixed(2)} USD`
  }
}

export class StandardPackage extends Shipment {
  constructor(data: ShipmentData) {
    super(data);
  }

  protected getCost(): string {
    const deliveryCost = this.shipper.getMediumPackCost(this.shipmentData.weight);
    return `${deliveryCost.toFixed(2)} USD`
  }
}

export class OverweightPackage extends Shipment{
  constructor(data: ShipmentData) {
    super(data);
  }

  protected getCost(): string {
    const deliveryCost = this.shipper.getLargePackCost(this.shipmentData.weight);
    return `${deliveryCost.toFixed(2)} USD`
  }
}


