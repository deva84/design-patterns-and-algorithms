import { AbstractShipment, Mark, ShipmentData } from './shipment.models';

export class ShipmentDecorator implements AbstractShipment {

  constructor(protected shipment: AbstractShipment) {
  }

  getShipmentId(id: number): number {
    return id;
  }

  ship(): string {
    const data = this.getShipmentData();
    const cost = this.getCost();
    const isFragile = data.mark.fragile;
    const isDoNotLeave = data.mark.doNotLeave;
    const isReceiptRequested = data.mark.receiptRequested;

    const message = `Shipment with the ID ${data.shipmentID} will be picked up from ${data.fromAddress} ${data.fromZipCode} 
    and shipped to ${data.toAddress} ${data.toZipCode} Cost = ${cost}
    ${isFragile ? `**${Mark.FRAGILE}**` : ''}
    ${isDoNotLeave ? `**${Mark.DO_NOT_LEAVE}**` : ''}
    ${isReceiptRequested ? `**${Mark.RECEIPT_REQUESTED}**` : ''}
    `;
    console.log(message);
    return  message;
  }

  getShipmentData(): ShipmentData {
    return this.shipment.getShipmentData();
  }

  getCost(): number {
    return this.shipment.getCost();
  }
}
