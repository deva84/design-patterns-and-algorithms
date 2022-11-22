import { AbstractShipment } from '../shipment/shipment.models';
import { Shipment } from '../shipment/shipment';
import { shipmentMocks } from '../shipment/shipment.mocks';

export class Client {
  private static client: Client;

  public static getInstance(): Client {
    if (!Client.client) {
      Client.client = new Client();
    }

    return Client.client;
  }

  createShipment(): AbstractShipment {
    const randomShipment = shipmentMocks[Math.floor(Math.random() * shipmentMocks.length)];
    const shipment = Shipment.getInstance(randomShipment);
    shipment.ship();
    return shipment;
  }
}



