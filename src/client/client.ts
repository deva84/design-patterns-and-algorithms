import { AbstractShipment, ShipmentData } from './client.models';
import { Shipment } from './shipment';
import { simpleShipmentMockOne } from './client.mocks';

export class Client {
  private static client: Client;
  private shipments: AbstractShipment[];

  private constructor() {
    this.shipments = [];
  }

  public static getInstance(): Client {
    if (!Client.client) {
      Client.client = new Client();
    }

    return Client.client;
  }

  createShipment(data: ShipmentData): AbstractShipment {
    const shipment = new Shipment(data).getInstance();
    const shipmentMessage = shipment.ship();
    this.publishMessage(shipmentMessage);

    this.shipments = [...this.shipments, shipment];
    return shipment;
  }

  getShipments(): AbstractShipment[] {
    return this.shipments;
  }

  private publishMessage(message: string): void {
    const messageEl = document.getElementById('message');
    messageEl.classList.remove('hide');
    messageEl.classList.add('show');
    messageEl.innerHTML = message;
  }

  listenToEvents(): void {
    const shipmentBtnEl = document.getElementById('shipment');
    shipmentBtnEl.addEventListener('click', () => {
      this.createShipment(simpleShipmentMockOne);
    });
  }
}



