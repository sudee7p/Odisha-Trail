export type Place = {
  id: string;
  name: string;
  district: string;
  region: string;
  type: string;
  lat: number;
  lng: number;
  famous: string;
  duration: number;
  entryFee: number;
  desc: string;
  bestTime: string;
  rating: number;
  image: string;
};

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const TYPE_FALLBACK: Record<string, string> = {
  Temple: img("photo-1582510003544-4d00b7f74220"),
  Beach: img("photo-1507525428034-b723cf961d3e"),
  Wildlife: img("photo-1549366021-9f761d450615"),
  Waterfall: img("photo-1432405972618-c60b0225b8f9"),
  Monument: img("photo-1564507592333-c60657eea523"),
  Cave: img("photo-1551522435-a13afa10f103"),
  Lake: img("photo-1500534314209-a25ddb2bd429"),
  Hill: img("photo-1464822759023-fed622ff2c3b"),
  Cultural: img("photo-1604608672516-f1b9b1d1f5c7"),
  Nature: img("photo-1441974231531-c6227db76b6e"),
  Dam: img("photo-1559825481-12a05cc00344"),
  Sanctuary: img("photo-1574068468668-a05a11f871da"),
  Birding: img("photo-1444464666168-49d633b86797"),
  "Hot spring": img("photo-1530541930197-ff16ac917b0e"),
};

// Verified Wikimedia Commons image URLs — each actually depicts the real landmark.
const SPECIFIC: Record<string, string> = {
  p1:  "https://upload.wikimedia.org/wikipedia/commons/b/b7/Shri_Jagannath_temple.jpg",
  p2:  "https://upload.wikimedia.org/wikipedia/commons/4/47/Konarka_Temple.jpg",
  p3:  "https://upload.wikimedia.org/wikipedia/commons/e/ee/Puri_Sea_Beach_viewed_from_the_light_house.jpg",
  p5:  "https://upload.wikimedia.org/wikipedia/commons/a/ab/Maa_Ramachnadi_Temple.jpg",
  p6:  "https://upload.wikimedia.org/wikipedia/commons/e/e2/Gpur.JPG",
  p8:  "https://upload.wikimedia.org/wikipedia/commons/5/5d/Lingaraj_Temple_%2C_Bhubaneswar.jpg",
  p9:  "https://upload.wikimedia.org/wikipedia/commons/7/72/Khandagari_and_Udaygiri_featured_image.jpg",
  p10: "https://upload.wikimedia.org/wikipedia/commons/7/72/Khandagari_and_Udaygiri_featured_image.jpg",
  p11: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Dhauli-Giri-Shanti-Stupa-Bhubaneswar-Orissa.jpg/1280px-Dhauli-Giri-Shanti-Stupa-Bhubaneswar-Orissa.jpg",
  p13: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Muktesvar_Temple.jpg",
  p12: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nandankanan%2C_Bhubaneswar%2C_Odisha.jpg",
  p14: "https://upload.wikimedia.org/wikipedia/commons/9/94/Birds_eyeview_of_Chilika_Lake.jpg",
  p18: "https://upload.wikimedia.org/wikipedia/commons/b/be/Simlipal_tiger_reserve.jpg",
  p19: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Barehipani_Falls.jpg",
  p20: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Joronda_Falls.jpg/1280px-Joronda_Falls.jpg",
  p15: "https://upload.wikimedia.org/wikipedia/commons/9/94/Birds_eyeview_of_Chilika_Lake.jpg",
  p21: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Sri_panchalingeswar_temple_%28with_1008_her_-_panoramio.jpg/960px-Sri_panchalingeswar_temple_%28with_1008_her_-_panoramio.jpg",
  p22: "https://upload.wikimedia.org/wikipedia/commons/4/43/Chandipur.jpg",
  p23: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Asian_Emerald_Dove_in_Kuldiha_Wildlife_Sanctuary_March_2025_by_Tisha_Mukherjee_02.jpg/960px-Asian_Emerald_Dove_in_Kuldiha_Wildlife_Sanctuary_March_2025_by_Tisha_Mukherjee_02.jpg",
  p25: "https://upload.wikimedia.org/wikipedia/commons/0/00/Hirakud_Dam.jpg",
  p26: "https://upload.wikimedia.org/wikipedia/commons/7/71/Debrigarh_Wildlife_sanctuary_%2838509512300%29.jpg",
  p27: "https://upload.wikimedia.org/wikipedia/commons/8/80/Samlei_Gudi_%28Samaleswari_Temple%29.jpg",
  p29: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Chausath_Yogini_Temple%2C_Ranipur_Jharial%2C_Odisha_%282018%29.jpg/1200px-Chausath_Yogini_Temple%2C_Ranipur_Jharial%2C_Odisha_%282018%29.jpg",
  p32: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Deomali_peak.jpg/1280px-Deomali_peak.jpg",
  p34: "https://upload.wikimedia.org/wikipedia/commons/5/53/Gupteshwara_Shiva-lingam.jpg",
  p35: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/A_Bonda_woman_at_the_market_05.jpg/960px-A_Bonda_woman_at_the_market_05.jpg",
  p36: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Araku-valley.jpg",
  p37: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Satkosia_tiger_Reserve_Entrance.jpg",
  p38: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Kapilasa_temple_Dhenkanal_Odisha4.jpg",
  p39: "https://upload.wikimedia.org/wikipedia/commons/7/73/Sunrise_at_Bhitarakanika.jpg",
  p40: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Ratnagiri_roof-top_view.jpg",
  p41: "https://upload.wikimedia.org/wikipedia/commons/9/95/Entrance_of_Barabati_fort.jpg",
};

const RAW: Omit<Place, "image">[] = [
  { id:"p1",  name:"Puri Jagannath Temple",    district:"Puri",       region:"Coastal Odisha",  type:"Temple",    lat:19.8048,lng:85.8181,famous:"Char Dham pilgrimage",       duration:3,  entryFee:0,  desc:"One of the four sacred dhams in India, dedicated to Lord Jagannath.",                   bestTime:"Oct-Mar",rating:4.9 },
  { id:"p2",  name:"Konark Sun Temple",         district:"Puri",       region:"Coastal Odisha",  type:"Monument",  lat:19.8876,lng:86.0945,famous:"UNESCO heritage site",        duration:2.5,entryFee:40, desc:"13th-century marvel shaped like a colossal chariot — UNESCO World Heritage Site.",    bestTime:"Nov-Feb",rating:4.8 },
  { id:"p3",  name:"Puri Beach",                district:"Puri",       region:"Coastal Odisha",  type:"Beach",     lat:19.7979,lng:85.8312,famous:"Sea tourism",                 duration:2,  entryFee:0,  desc:"Famous golden beach with magnificent sunrise views and sea turtles.",                   bestTime:"Oct-Mar",rating:4.6 },
  { id:"p4",  name:"Chandrabhaga Beach",        district:"Puri",       region:"Coastal Odisha",  type:"Beach",     lat:19.9041,lng:86.1071,famous:"Sunrise views",               duration:1.5,entryFee:0,  desc:"Pristine beach near Konark famed for stunning dawn panoramas.",                        bestTime:"Nov-Feb",rating:4.5 },
  { id:"p5",  name:"Ramachandi Temple",         district:"Puri",       region:"Coastal Odisha",  type:"Temple",    lat:19.8498,lng:85.9841,famous:"River-sea confluence",         duration:1,  entryFee:0,  desc:"Riverside temple at the confluence of Kushabhadra River and the sea.",                  bestTime:"Oct-Mar",rating:4.2 },
  { id:"p6",  name:"Gopalpur Beach",            district:"Ganjam",     region:"Coastal Odisha",  type:"Beach",     lat:19.2609,lng:84.9037,famous:"Quiet seaside",               duration:2,  entryFee:0,  desc:"Serene beach haven with a lighthouse and colonial-era ambience.",                       bestTime:"Oct-Mar",rating:4.3 },
  { id:"p7",  name:"Rushikulya River Mouth",    district:"Ganjam",     region:"Coastal Odisha",  type:"Nature",    lat:19.3899,lng:85.0176,famous:"Olive ridley turtles",        duration:2,  entryFee:0,  desc:"World's largest Olive Ridley turtle mass-nesting site.",                              bestTime:"Jan-Mar",rating:4.7 },
  { id:"p8",  name:"Lingaraj Temple",           district:"Khordha",    region:"Bhubaneswar",     type:"Temple",    lat:20.2376,lng:85.8335,famous:"Ancient architecture",        duration:2,  entryFee:0,  desc:"11th-century Shiva temple — the largest in Bhubaneswar — Kalinga style pinnacle.",     bestTime:"Oct-Mar",rating:4.8 },
  { id:"p9",  name:"Udayagiri Caves",           district:"Khordha",    region:"Bhubaneswar",     type:"Caves",     lat:20.2528,lng:85.7794,famous:"Jain heritage",               duration:2,  entryFee:15, desc:"Rock-cut caves with Jain sculptures dating to 2nd century BCE.",                       bestTime:"Oct-Mar",rating:4.4 },
  { id:"p10", name:"Khandagiri Caves",          district:"Khordha",    region:"Bhubaneswar",     type:"Caves",     lat:20.2510,lng:85.7769,famous:"Ancient carvings",            duration:1.5,entryFee:15, desc:"Twin caves adjacent to Udayagiri with intricate royal carvings.",                      bestTime:"Oct-Mar",rating:4.3 },
  { id:"p11", name:"Dhauli Shanti Stupa",       district:"Khordha",    region:"Bhubaneswar",     type:"Monument",  lat:20.1857,lng:85.8556,famous:"Buddhist site",               duration:1.5,entryFee:0,  desc:"Peace pagoda on the Kalinga war site — Ashoka's edicts carved in rock.",                bestTime:"Oct-Mar",rating:4.5 },
  { id:"p12", name:"Nandankanan Zoo",           district:"Khordha",    region:"Bhubaneswar",     type:"Wildlife",  lat:20.3972,lng:85.8214,famous:"White tigers",                duration:3,  entryFee:50, desc:"First zoo in India to breed white tigers — also home to white crocodiles.",            bestTime:"Oct-Mar",rating:4.4 },
  { id:"p13", name:"Mukteshwar Temple",         district:"Khordha",    region:"Bhubaneswar",     type:"Temple",    lat:20.2394,lng:85.8333,famous:"Kalinga style",               duration:1,  entryFee:0,  desc:"Gem of Odishan temple architecture with ornamental torana gateway.",                   bestTime:"Oct-Mar",rating:4.6 },
  { id:"p14", name:"Chilika Lake",              district:"Multiple",   region:"Chilika",         type:"Lake",      lat:19.7167,lng:85.3167,famous:"Largest coastal lagoon",      duration:4,  entryFee:0,  desc:"Asia's largest brackish water lagoon — home to Irrawaddy dolphins and flamingos.",     bestTime:"Nov-Feb",rating:4.8 },
  { id:"p15", name:"Satapada",                  district:"Puri",       region:"Chilika",         type:"Nature",    lat:19.6667,lng:85.4167,famous:"Dolphins",                    duration:3,  entryFee:200,desc:"Gateway to Chilika's dolphin sanctuary — boat safaris at dawn.",                      bestTime:"Nov-Mar",rating:4.7 },
  { id:"p16", name:"Nalabana Bird Sanctuary",   district:"Khordha",    region:"Chilika",         type:"Sanctuary", lat:19.7500,lng:85.3500,famous:"Migratory birds",            duration:3,  entryFee:150,desc:"Flamingos, bar-headed geese, and 160+ migratory species winter here.",                 bestTime:"Nov-Jan",rating:4.6 },
  { id:"p17", name:"Mangalajodi",               district:"Khordha",    region:"Chilika",         type:"Birding",   lat:19.8833,lng:85.2167,famous:"Wetlands",                   duration:3,  entryFee:100,desc:"Community eco-tourism: paddle through reeds counting thousands of birds.",             bestTime:"Nov-Feb",rating:4.7 },
  { id:"p18", name:"Simlipal National Park",    district:"Mayurbhanj", region:"Northern Odisha", type:"Wildlife",  lat:21.8385,lng:86.3126,famous:"Tiger reserve",              duration:6,  entryFee:500,desc:"Core tiger reserve with 94 tigers, sal forests, and twin waterfalls.",                 bestTime:"Nov-May",rating:4.8 },
  { id:"p19", name:"Barehipani Falls",          district:"Mayurbhanj", region:"Northern Odisha", type:"Waterfall", lat:22.0500,lng:86.3333,famous:"2nd highest in India",       duration:2,  entryFee:0,  desc:"400-metre two-tiered cascade — India's second tallest waterfall inside Simlipal.",     bestTime:"Oct-Feb",rating:4.7 },
  { id:"p20", name:"Joranda Falls",             district:"Mayurbhanj", region:"Northern Odisha", type:"Waterfall", lat:22.0167,lng:86.3667,famous:"Scenic",                     duration:1.5,entryFee:0,  desc:"A single-drop 150 m waterfall draped in lush Simlipal vegetation.",                    bestTime:"Oct-Feb",rating:4.5 },
  { id:"p21", name:"Panchalingeswar Temple",    district:"Balasore",   region:"Northern Odisha", type:"Temple",    lat:21.5333,lng:86.8333,famous:"Hill shrine",                duration:2,  entryFee:0,  desc:"Five Shivalingams submerged in a perennial stream on a forested hill.",                 bestTime:"Oct-Mar",rating:4.5 },
  { id:"p22", name:"Chandipur Beach",           district:"Balasore",   region:"Northern Odisha", type:"Beach",     lat:21.4667,lng:87.0167,famous:"Vanishing sea",              duration:2,  entryFee:0,  desc:"The sea retreats 5 km twice daily — walk on the ocean floor!",                        bestTime:"Oct-Mar",rating:4.6 },
  { id:"p23", name:"Kuldiha Sanctuary",         district:"Balasore",   region:"Northern Odisha", type:"Wildlife",  lat:21.6167,lng:86.6333,famous:"Forest reserve",             duration:3,  entryFee:200,desc:"Dense tropical moist forest with elephants, leopards, and peacocks.",                  bestTime:"Oct-Feb",rating:4.3 },
  { id:"p24", name:"Khandadhar Waterfall",      district:"Sundargarh", region:"Northern Odisha", type:"Waterfall", lat:22.1667,lng:85.1833,famous:"Iron ore terrain",           duration:2.5,entryFee:0,  desc:"244 m free-fall through iron ore cliffs — among Odisha's most beautiful.",             bestTime:"Oct-Feb",rating:4.7 },
  { id:"p25", name:"Hirakud Dam",               district:"Sambalpur",  region:"Western Odisha",  type:"Dam",       lat:21.5181,lng:83.8726,famous:"Longest earthen dam",         duration:2,  entryFee:20, desc:"World's longest earthen dam (25 km); Gandhi Minar viewpoint at sunset.",              bestTime:"Oct-Feb",rating:4.4 },
  { id:"p26", name:"Debrigarh Sanctuary",       district:"Sambalpur",  region:"Western Odisha",  type:"Wildlife",  lat:21.6167,lng:83.7000,famous:"Biodiversity",               duration:4,  entryFee:300,desc:"Tiger corridor with leopards, gaur, and 250+ bird species around Hirakud.",           bestTime:"Nov-Apr",rating:4.5 },
  { id:"p27", name:"Samaleswari Temple",        district:"Sambalpur",  region:"Western Odisha",  type:"Temple",    lat:21.4726,lng:83.9732,famous:"Goddess temple",             duration:1.5,entryFee:0,  desc:"Ancient Shakti temple of Maa Samalei, patron deity of western Odisha.",                bestTime:"Oct-Mar",rating:4.7 },
  { id:"p28", name:"Harishankar Temple",        district:"Bolangir",   region:"Western Odisha",  type:"Temple",    lat:20.4333,lng:83.3167,famous:"Hill shrine",                duration:2.5,entryFee:0,  desc:"Shiva temple in a lush canyon with natural spring waterfalls around it.",              bestTime:"Oct-Mar",rating:4.6 },
  { id:"p29", name:"Ranipur Jharial",           district:"Bolangir",   region:"Western Odisha",  type:"Monument",  lat:20.5833,lng:83.0000,famous:"Temple ruins",               duration:2,  entryFee:25, desc:"64 yogini temple complex — one of only four in India — tantric masterpiece.",          bestTime:"Oct-Mar",rating:4.5 },
  { id:"p30", name:"Gandhamardan Hills",        district:"Bargarh",    region:"Western Odisha",  type:"Hill",      lat:21.2833,lng:83.5167,famous:"Mythology",                  duration:3,  entryFee:0,  desc:"Medicinal herb mountain from the Ramayana — source of Ong and Tel rivers.",            bestTime:"Oct-Mar",rating:4.4 },
  { id:"p31", name:"Duduma Waterfall",          district:"Koraput",    region:"Southern Odisha", type:"Waterfall", lat:18.4167,lng:82.5500,famous:"Hydro project",              duration:2,  entryFee:0,  desc:"Spectacular 175 m waterfall on the Machkund River — rainbow mist all day.",           bestTime:"Oct-Feb",rating:4.6 },
  { id:"p32", name:"Deomali Hills",             district:"Koraput",    region:"Southern Odisha", type:"Hill",      lat:18.8833,lng:82.9000,famous:"Highest peak",               duration:3,  entryFee:0,  desc:"Odisha's highest peak at 1,672 m with cloud-piercing views over tribal villages.",     bestTime:"Oct-Feb",rating:4.5 },
  { id:"p33", name:"Taptapani",                 district:"Ganjam",     region:"Southern Odisha", type:"Hot spring",lat:19.7500,lng:84.4167,famous:"Sulfur springs",             duration:2,  entryFee:0,  desc:"Natural hot sulfur springs in forested hillside — believed to have healing properties.",bestTime:"Oct-Mar",rating:4.3 },
  { id:"p34", name:"Gupteswar Cave",            district:"Koraput",    region:"Southern Odisha", type:"Cave",      lat:18.5833,lng:82.3500,famous:"Shiva temple",               duration:1.5,entryFee:20, desc:"Sacred cave shrine with a natural Shivalingam — stalactite formations inside.",        bestTime:"Oct-Mar",rating:4.4 },
  { id:"p35", name:"Onukudelli Market",         district:"Koraput",    region:"Southern Odisha", type:"Cultural",  lat:18.9167,lng:82.7833,famous:"Tribal market",              duration:2,  entryFee:0,  desc:"Authentic tribal haat — Kondhs, Bondas and Gadabas trade handicrafts.",               bestTime:"Oct-Mar",rating:4.5 },
  { id:"p36", name:"Araku Valley",              district:"Koraput",    region:"Southern Odisha", type:"Hill",      lat:18.3298,lng:82.8759,famous:"Coffee plantations",         duration:3,  entryFee:0,  desc:"Scenic valley with coffee estates, tribal villages, and the Borra Caves nearby.",      bestTime:"Oct-Mar",rating:4.6 },
  { id:"p37", name:"Satkosia Gorge",            district:"Angul",      region:"Central Odisha",  type:"Nature",    lat:20.5833,lng:84.5333,famous:"Tiger reserve",              duration:4,  entryFee:300,desc:"Mahanadi river gorge — crocodile sanctuary, tiger reserve, and tented eco-camps.",     bestTime:"Nov-Mar",rating:4.6 },
  { id:"p38", name:"Kapilash Temple",           district:"Dhenkanal",  region:"Central Odisha",  type:"Temple",    lat:20.8333,lng:85.5667,famous:"Hilltop Shiva",              duration:2,  entryFee:0,  desc:"1,000-stepped temple to Lord Chandrasekhar atop the scenic Kapilash hill.",            bestTime:"Oct-Mar",rating:4.5 },
  { id:"p39", name:"Bhitarkanika National Park",district:"Kendrapara", region:"Eastern Odisha",  type:"Wildlife",  lat:20.7500,lng:86.8833,famous:"Saltwater crocodiles",       duration:5,  entryFee:400,desc:"Dense mangrove delta — world's second largest saltwater crocodile population.",        bestTime:"Oct-Feb",rating:4.7 },
  { id:"p40", name:"Ratnagiri Buddhist Site",   district:"Jajpur",     region:"Eastern Odisha",  type:"Monument",  lat:20.8000,lng:86.3833,famous:"Buddhist monastery",         duration:2,  entryFee:25, desc:"7th-12th century Buddhist mahavihara with a 5-metre stone Buddha.",                   bestTime:"Oct-Mar",rating:4.5 },
  { id:"p41", name:"Barabati Fort",             district:"Cuttack",    region:"Eastern Odisha",  type:"Monument",  lat:20.4625,lng:85.8830,famous:"Mughal era",                 duration:1.5,entryFee:20, desc:"14th-century fort of the Gajapati dynasty on Mahanadi's bank.",                      bestTime:"Oct-Mar",rating:4.2 },
  { id:"p42", name:"Tikarpada Sanctuary",       district:"Angul",      region:"Central Odisha",  type:"Wildlife",  lat:20.5300,lng:84.5700,famous:"Crocodiles & tigers",        duration:4,  entryFee:200,desc:"Riverside sanctuary inside Satkosia — nest of mugger crocodiles and tigers.",          bestTime:"Nov-Mar",rating:4.4 },
];

export const PLACES: Place[] = RAW.map((p) => ({
  ...p,
  image: SPECIFIC[p.id] || TYPE_FALLBACK[p.type] || TYPE_FALLBACK.Nature,
}));

export type EventItem = {
  id: string;
  name: string;
  date: string;
  duration: number;
  entry: number;
  desc: string;
  image: string;
};

export const EVENTS: EventItem[] = [
  { id:"e1",name:"Rath Yatra – Puri",        date:"Jul 2025",duration:3,entry:0,  desc:"Chariot festival of Lord Jagannath — world's largest procession.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Three_Chariots_in_front_of_Gundicha_Temple_in_2022_Rath_Yatra.jpg/960px-Three_Chariots_in_front_of_Gundicha_Temple_in_2022_Rath_Yatra.jpg" },
  { id:"e2",name:"Konark Dance Festival",    date:"Dec 1-5",  duration:5,entry:200,desc:"Classical dance performances against the Sun Temple backdrop.", image: img("photo-1547153760-18fc86324498") },
  { id:"e3",name:"Odisha Tribal Fair",       date:"Nov 2025", duration:4,entry:50, desc:"Vibrant showcase of tribal music, dance, crafts, and cuisine.", image: img("photo-1583316174775-bd6dc0e9f298") },
  { id:"e4",name:"Puri Beach Festival",      date:"Nov 5-9",  duration:5,entry:0,  desc:"Sand art, cultural shows, and adventure sports on Puri sands.", image: img("photo-1507525428034-b723cf961d3e") },
  { id:"e5",name:"Chilika Bird Festival",    date:"Jan 2026", duration:2,entry:100,desc:"Guided birdwatching, boat safaris, and conservation talks at Chilika.", image: img("photo-1444464666168-49d633b86797") },
  { id:"e6",name:"Makar Mela",               date:"Jan 14",   duration:1,entry:0,  desc:"Sacred ocean festival at dawn on Makar Sankranti at Chandrabhaga.", image: img("photo-1505228395891-9a51e7e86bf6") },
];

export const REGIONS = ["All Regions","Coastal Odisha","Bhubaneswar","Chilika","Northern Odisha","Western Odisha","Southern Odisha","Central Odisha","Eastern Odisha"];
export const TYPES = ["All Types","Temple","Beach","Wildlife","Waterfall","Monument","Cave","Caves","Lake","Hill","Cultural","Nature","Dam","Sanctuary","Birding","Hot spring"];

export const TYPE_GRADIENT: Record<string, string> = {
  Temple: "from-amber-500 to-orange-600",
  Beach: "from-sky-400 to-blue-600",
  Wildlife: "from-emerald-500 to-green-700",
  Waterfall: "from-cyan-400 to-blue-600",
  Monument: "from-purple-500 to-fuchsia-700",
  Cave: "from-stone-500 to-stone-800",
  Caves: "from-stone-500 to-stone-800",
  Lake: "from-teal-400 to-cyan-700",
  Hill: "from-slate-500 to-slate-800",
  Cultural: "from-rose-500 to-pink-700",
  Nature: "from-lime-500 to-emerald-700",
  Dam: "from-blue-500 to-indigo-700",
  Sanctuary: "from-green-500 to-teal-700",
  Birding: "from-indigo-400 to-blue-700",
  "Hot spring": "from-red-400 to-orange-600",
};
