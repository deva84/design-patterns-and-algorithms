export interface ShipmentData {
  shipmentID?: number;
  weight: number;
  fromAddress: string;
  fromZipCode?: string;
  toAddress: string;
  toZipCode: string;
  mark?: {
    fragile: boolean;
    doNotLeave: boolean;
    receiptRequested: boolean
  }
}

export abstract class AbstractShipment {
  abstract getShipmentId(id?: number): number;
  abstract ship(): string;
  abstract getShipmentData(): ShipmentData;
  abstract getCost(): number;
}

export enum Mark {
  FRAGILE = 'MARK FRAGILE',
  DO_NOT_LEAVE = 'MARK DO NOT LEAVE IF ADDRESS NOT AT HOME',
  RECEIPT_REQUESTED = 'MARK RETURN RECEIPT REQUESTED'
}
