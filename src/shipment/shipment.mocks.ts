import { ShipmentData } from './shipment.models';

export const shipmentMocks: ShipmentData[] = [
  {
    weight: 10,
    fromAddress: '10 Str. Adams, Budapest',
    toAddress: '34 Bd. Eroilor, Bucharest',
    fromZipCode: '1017',
    toZipCode: '41014',
    mark: {
      fragile: true,
      doNotLeave: true,
      receiptRequested: true
    }
  },
  {
    weight: 256,
    fromAddress: '3 Avenue Plaza, Los-Angeles',
    toAddress: '45 Str. Szebenok, Prague',
    fromZipCode: '72009',
    toZipCode: '21340',
    mark: {
      fragile: false,
      doNotLeave: false,
      receiptRequested: true
    }
  }, {
    weight: 1000,
    fromAddress: '17 Str. Oysho, Tokio',
    toAddress: '124 Str. Urban, Texas',
    fromZipCode: '9876',
    toZipCode: '81345',
  }, {
    weight: 1230,
    fromAddress: '57 Str. Kurtz, Quebec',
    toAddress: '12 Str. Garden, Craiova',
    fromZipCode: '45678',
    toZipCode: '23456',
    mark: {
      fragile: false,
      doNotLeave: true,
      receiptRequested: false
    }
  },
  {
    weight: 120,
    fromAddress: '10 Str. Yankee, Munich',
    toAddress: '14 Bd. Zibelstam, Berlin',
    toZipCode: '21014',
  },
];
