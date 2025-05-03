// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

export enum Queries {
  GetOrder = 'get-order',
}

export enum Mutations {
  PostCreateOrder = 'stripe-create-order',
  PostRefundPayment = 'stripe-refund-payment',
}
