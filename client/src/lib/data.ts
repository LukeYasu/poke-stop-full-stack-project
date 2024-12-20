import { CartItem } from '../components/cartContext';
import { User } from '../components/UserContext';

export type Item = {
  itemId: number;
  name: string;
  price: number;
  salePrice: number | null;
  photoUrl: string;
  description: string;
  cardTag: string | null;
  itemType: string;
  quantity: number;
};

/*A list of objects that contain the source, alt and itemId of the images that are being displayed on the carousel*/
export const carouselImages = [
  { src: '../fire-bundle.png', alt: 'Fire Bundle', itemId: 37 },
  {
    src: '../trainer-starter-pack.png',
    alt: 'trainer starter pack',
    itemId: 36,
  },
];

export async function getItems(): Promise<Item[]> {
  const response = await fetch('/api/items');
  if (!response.ok) throw new Error(`response status: ${response.status}`);
  const items = await response.json();
  return items;
}

export async function getItem(itemId: number): Promise<Item> {
  const response = await fetch(`/api/items/${itemId}`);
  if (!response.ok) throw new Error(`response status: ${response.status}`);
  const item = await response.json();
  return item;
}
const authKey = 'um.auth';

type Auth = {
  user: User;
  token: string;
};

export function saveAuth(user: User, token: string): void {
  const auth: Auth = { user, token };
  localStorage.setItem(authKey, JSON.stringify(auth));
}

export function removeAuth(): void {
  localStorage.removeItem(authKey);
}

export function readUser(): User | undefined {
  const auth = localStorage.getItem(authKey);
  if (!auth) return undefined;
  return (JSON.parse(auth) as Auth).user;
}

export function readToken(): string | undefined {
  const auth = localStorage.getItem(authKey);
  if (!auth) return undefined;
  return (JSON.parse(auth) as Auth).token;
}

export async function readCart() {
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${readToken()}`,
    },
  };
  const res = await fetch('/api/cart-items', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return (await res.json()) as CartItem[];
}

export async function insertCart(cartItem: CartItem) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${readToken()}`,
    },
    body: JSON.stringify(cartItem),
  };
  const res = await fetch('/api/cart-items', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return (await res.json()) as CartItem;
}

export async function updateCart(cartItem: CartItem) {
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${readToken()}`,
    },
    body: JSON.stringify(cartItem),
  };
  const res = await fetch('/api/cart-items', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return (await res.json()) as CartItem;
}

export async function deleteCart(itemId: number) {
  const req = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${readToken()}`,
    },
  };
  const res = await fetch(`/api/cart-items/${itemId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}

export async function deleteClearCart() {
  const req = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${readToken()}`,
    },
  };
  const res = await fetch(`/api/cart-items`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}

export async function readFavorites() {
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${readToken()}`,
    },
  };
  const res = await fetch('/api/favorites', req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return (await res.json()) as Item[];
}

export async function insertFavorites(itemId: number) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${readToken()}`,
    },
  };
  const res = await fetch(`/api/favorites/${itemId}`, req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}

export async function deleteFavorites(itemId: number) {
  const req = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${readToken()}`,
    },
  };
  const res = await fetch(`/api/favorites/${itemId}`, req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
}
