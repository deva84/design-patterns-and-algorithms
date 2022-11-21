import { AbstractShipment, ShipmentData } from '../shipment/shipment.models';
import { Shipment } from '../shipment/shipment';
import { shipmentMocks } from '../shipment/shipment.mocks';

export class Client {
  private static client: Client;
  private static shipments: AbstractShipment[];

  private constructor() {
    Client.shipments = [];
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

    Client.shipments = [...Client.shipments, shipment];
    return shipment;
  }

  static getShipments(): AbstractShipment[] {
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
      const randomShipment = shipmentMocks[Math.floor(Math.random() * shipmentMocks.length)]
      this.createShipment(randomShipment);
    });
  }
}



