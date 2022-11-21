export interface ShipmentData {
  shipmentID?: number;
  weight: number;
  fromAddress: string;
  fromZipCode?: string;
  toAddress: string;
  toZipCode: string;
}

export abstract class AbstractShipment {
  abstract getInstance(): AbstractShipment;
  abstract getShipmentId(): number;
  abstract ship(): string;
}
