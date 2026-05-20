export type Hotel = {
  id: string;
  name: string;
  city: string;
  region: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  lat: number;
  lng: number;
  image: string;
};

const wiki = (filename: string, w = 800) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${w}`;
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const HOTELS: Hotel[] = [
  { id:"h1", name:"Mayfair Heritage Puri",        city:"Puri",        region:"Coastal Odisha",  pricePerNight: 6800, rating: 4.7, amenities:["Sea view","Pool","Spa","Wi-Fi"], lat:19.7991, lng:85.8253, image: u("photo-1566073771259-6a8506099945") },
  { id:"h2", name:"Toshali Sands Resort",         city:"Puri",        region:"Coastal Odisha",  pricePerNight: 4200, rating: 4.4, amenities:["Beach","Pool","Restaurant"],     lat:19.8331, lng:85.8896, image: u("photo-1455587734955-081b22074882") },
  { id:"h3", name:"Hotel Holiday Resort",         city:"Puri",        region:"Coastal Odisha",  pricePerNight: 1800, rating: 4.0, amenities:["Wi-Fi","Restaurant"],            lat:19.8108, lng:85.8324, image: u("photo-1551882547-ff40c63fe5fa") },
  { id:"h4", name:"Mayfair Lagoon Bhubaneswar",   city:"Bhubaneswar", region:"Bhubaneswar",     pricePerNight: 7500, rating: 4.8, amenities:["Pool","Spa","5 restaurants"],    lat:20.3070, lng:85.8195, image: u("photo-1582719508461-905c673771fd") },
  { id:"h5", name:"Trident Bhubaneswar",          city:"Bhubaneswar", region:"Bhubaneswar",     pricePerNight: 5400, rating: 4.6, amenities:["Pool","Gym","Wi-Fi"],            lat:20.2547, lng:85.8390, image: u("photo-1564501049412-61c2a3083791") },
  { id:"h6", name:"Ginger Bhubaneswar",           city:"Bhubaneswar", region:"Bhubaneswar",     pricePerNight: 2300, rating: 4.1, amenities:["Wi-Fi","Breakfast"],             lat:20.2961, lng:85.8245, image: u("photo-1571003123894-1f0594d2b5d9") },
  { id:"h7", name:"Swosti Chilika Resort",        city:"Satapada",    region:"Chilika",         pricePerNight: 3800, rating: 4.5, amenities:["Lake view","Boating","Pool"],    lat:19.6711, lng:85.4204, image: u("photo-1542314831-068cd1dbfeeb") },
  { id:"h8", name:"Aranya Nivas Simlipal",        city:"Mayurbhanj",  region:"Northern Odisha", pricePerNight: 4500, rating: 4.4, amenities:["Forest stay","Safari"],          lat:21.8321, lng:86.3104, image: u("photo-1520250497591-112f2f40a3f4") },
  { id:"h9", name:"Hotel Sheela Sambalpur",       city:"Sambalpur",   region:"Western Odisha",  pricePerNight: 1600, rating: 4.0, amenities:["Wi-Fi","Restaurant"],            lat:21.4669, lng:83.9812, image: u("photo-1611892440504-42a792e24d32") },
  { id:"h10",name:"Sai International Koraput",    city:"Koraput",     region:"Southern Odisha", pricePerNight: 2100, rating: 4.2, amenities:["Mountain view","Wi-Fi"],         lat:18.8126, lng:82.7106, image: u("photo-1564501049412-61c2a3083791") },
  { id:"h11",name:"Hotel Akbari Continental",     city:"Cuttack",     region:"Eastern Odisha",  pricePerNight: 2800, rating: 4.3, amenities:["Pool","Restaurant","Wi-Fi"],     lat:20.4625, lng:85.8828, image: u("photo-1445019980597-93fa8acb246c") },
  { id:"h12",name:"Sand Pebbles Gopalpur",        city:"Gopalpur",    region:"Coastal Odisha",  pricePerNight: 3100, rating: 4.3, amenities:["Beachfront","Restaurant"],       lat:19.2659, lng:84.9094, image: u("photo-1540541338287-41700207dee6") },
];
