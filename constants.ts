
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Lebanese Number Plate Keychain',
    price: 10,
    description: 'Custom Lebanese number plate design',
    image: 'p1.jpg'
  },
  {
    id: 'p2',
    name: 'Spotify Song Image Keychain',
    price: 10,
    description: 'Custom song image with Spotify code',
    image: 'p2.jpg'
  },
  {
    id: 'p3',
    name: 'Couples Keychain',
    price: 10,
    description: 'Custom couple design engraved in high precision',
    image: 'p3.jpg'
  },
  {
    id: 'p4',
    name: 'Dog Tag Keychain',
    price: 10,
    description: 'Back-side engraving available for high durability',
    image: 'p4.jpg'
  },
  {
    id: 'p5',
    name: 'Custom Round Keychain',
    price: 10,
    description: '4×4 cm custom engraving area',
    image: 'p5.jpg'
  },
  {
    id: 'p6',
    name: 'Bottle Opener Keychain',
    price: 10,
    description: 'Durable stainless steel opener with your logo',
    image: 'p6.jpg'
  },
  {
    id: 'service1',
    name: 'Laser Engraving Service',
    price: 0, // pricing depends
    description: 'Professional engraving on metal, stainless steel, and acrylic.',
    image: 'service1.jpg',
    isService: true
  },
  {
    id: 'service2',
    name: 'Laser Cutting Service',
    price: 0, // pricing depends
    description: 'Precision laser cutting with clean edges and accurate results.',
    image: 'service2.jpg',
    isService: true
  }
];

export const DELIVERY_FEE = 4;
export const DISCOUNT_CODE = 'LASER20';
export const DISCOUNT_PERCENT = 20;
export const BACK_SIDE_FEE = 3;
export const WHATSAPP_NUMBER = '96181388115';
