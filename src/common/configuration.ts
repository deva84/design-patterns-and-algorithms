export const PRICE_PER_OUNCE = 39;

export enum DeliveryPrice {
  AIR_EAST = 39,
  CHICAGO_SPRINT = 42,
  PACIFIC_PARCEL = 51
}


export const shippingPrice = {
  airEast: {
    small: { base: 0.39, extra: 0, flat: 0 },
    medium: { base: 0.25, extra: 0, flat: 0 },
    large: { base: 0.25, extra: 0, flat: 10 },
  },
  chicagoSprint: {
    small: { base: 0.42, extra: 0, flat: 0 },
    medium: { base: 0.20, extra: 0, flat: 0 },
    large: { base: 0.20, extra: 0, flat: 0 },
  },
  pacificParcel: {
    small: { base: 0.51, extra: 0, flat: 0 },
    medium: { base: 0.19, extra: 0, flat: 0 },
    large: { base: 0.19, extra: 0.02, flat: 0 },
  },
};
