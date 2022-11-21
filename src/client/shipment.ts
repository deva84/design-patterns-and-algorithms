import { AbstractShipment, ShipmentData } from './client.models';
import { PRICE_PER_OUNCE } from '../common/configuration';
import {Counter} from "../persistence-layer/counter";

export class Shipment implements AbstractShipment {
  private readonly _shipmentData: ShipmentData;
  private shipmentData: ShipmentData;
  private counter: Counter;

  constructor(data: ShipmentData) {
    this._shipmentData = data;
    this.counter = Counter.getInstance();
  }

  getInstance(): AbstractShipment {
    this.shipmentData = {...this._shipmentData};
    if (!this._shipmentData.shipmentID) {
       this.shipmentData.shipmentID = this.getShipmentId();
    }
    return this;
  }

  getShipmentId(): number {
    if (this.shipmentData.shipmentID) {
      return this.shipmentData.shipmentID;
    }
    return this.registerShipmentId();
  }

  ship(): string {
     const message = `<div> Shipment ID: ${this.shipmentData.shipmentID} <br>Sent from: 
    <span class="from-address">${this.shipmentData.fromAddress}</span> 
    <br>To: <span class="to-address">${this.shipmentData.toAddress}</span> 
    <br>Cost: <span class="cost">${this.calculateCost()}</span></div>`;

     console.log(message.replace(/<[^>]*>?/gm, ''));
     return message;
  }

  private registerShipmentId(): number {
    return this.counter.register();
  }

  private calculateCost(): string {
    const rawCost = this.shipmentData.weight * PRICE_PER_OUNCE;
    const dollarCost = rawCost / 100;
    return `${dollarCost.toFixed(2)} USD`
  }
}
