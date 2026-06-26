/* ============================================================
   AlexitoFind — data.js
   Simulated Application Data — No Backend Required
   ============================================================ */

'use strict';

// ============================================================
// CURRENT USER (Logged-in User)
// ============================================================
const CURRENT_USER = {
  id: 0,
  name: 'Alexito',
  lastName: 'García',
  age: 26,
  city: 'Madrid',
  country: 'España',
  bio: 'Apasionado por los viajes, la música y las nuevas conexiones. Siempre listo para una aventura ✈️🎵 Buscando personas auténticas con quienes compartir buenos momentos.',
  avatar: 'assets/img/avatar-0.jpg',
  coverPhoto: null,
  photos: ['assets/img/avatar-0.jpg'],
  interests: ['🎵 Música', '✈️ Viajes', '📸 Fotografía', '🍕 Gastronomía', '🎮 Gaming', '🏋️ Fitness'],
  stats: { matches: 42, likes: 128, superLikes: 8, views: 370 },
  premium: false,
  online: true,
  verified: true,
  joinDate: '2024-03-15',
};

// ============================================================
// EXPLORE PROFILES
// ============================================================
const USERS = [
  {
    id: 1,
    name: 'Sofía',
    lastName: 'Martínez',
    age: 25,
    city: 'Barcelona',
    country: 'España',
    distance: '2 km',
    bio: 'Diseñadora gráfica con alma de viajera 🌍. Amante del café, el arte y los atardeceres en la playa. Busco alguien con quien compartir aventuras y buenas conversaciones.',
    avatar: 'assets/img/avatar-1.jpg',
    photos: ['assets/img/avatar-1.jpg'],
    interests: ['🎨 Arte', '☕ Café', '🌊 Playa', '📚 Lectura'],
    online: true,
    verified: true,
    liked: false,
    superLiked: false,
  },
  {
    id: 2,
    name: 'Isabella',
    lastName: 'García',
    age: 28,
    city: 'Buenos Aires',
    country: 'Argentina',
    distance: '8.200 km',
    bio: 'Psicóloga de día, bailarina de tango de noche 💃. La vida es demasiado corta para bailar despacio. Busco conexiones genuinas.',
    avatar: 'assets/img/avatar-2.jpg',
    photos: ['assets/img/avatar-2.jpg'],
    interests: ['💃 Baile', '🧠 Psicología', '🎭 Teatro', '🍷 Vino'],
    online: false,
    verified: true,
    liked: false,
    superLiked: false,
  },
  {
    id: 3,
    name: 'Valentina',
    lastName: 'López',
    age: 23,
    city: 'México DF',
    country: 'México',
    distance: '9.100 km',
    bio: 'Estudiante de arquitectura 🏛️. Construyo sueños de día y colecciono estrellas de noche ⭐. El diseño y la creatividad son mi pasión.',
    avatar: 'assets/img/avatar-3.jpg',
    photos: ['assets/img/avatar-3.jpg'],
    interests: ['🏛️ Arquitectura', '📐 Diseño', '🌮 Gastronomía', '🎬 Cine'],
    online: true,
    verified: false,
    liked: false,
    superLiked: false,
  },
  {
    id: 4,
    name: 'Camila',
    lastName: 'Torres',
    age: 26,
    city: 'Lima',
    country: 'Perú',
    distance: '10.300 km',
    bio: 'Chef en formación 🍜 y yogui de corazón 🧘‍♀️. Creo que la mejor conversación ocurre alrededor de una buena mesa. El bienestar es mi estilo de vida.',
    avatar: 'assets/img/avatar-4.jpg',
    photos: ['assets/img/avatar-4.jpg'],
    interests: ['🍜 Cocina', '🧘 Yoga', '🌿 Naturaleza', '📷 Fotografía'],
    online: true,
    verified: true,
    liked: false,
    superLiked: false,
  },
  {
    id: 5,
    name: 'Mariana',
    lastName: 'Costa',
    age: 24,
    city: 'São Paulo',
    country: 'Brasil',
    distance: '9.800 km',
    bio: 'Ingeniera de software y amante de los datos 💻. Cuando no estoy programando, estoy explorando nuevos senderos 🏔️. La tecnología puede cambiar el mundo.',
    avatar: 'assets/img/avatar-5.jpg',
    photos: ['assets/img/avatar-5.jpg'],
    interests: ['💻 Tech', '🏔️ Senderismo', '🎵 Jazz', '♟️ Ajedrez'],
    online: false,
    verified: true,
    liked: false,
    superLiked: false,
  },
  {
    id: 6,
    name: 'Diego',
    lastName: 'Fernández',
    age: 27,
    city: 'Madrid',
    country: 'España',
    distance: '3 km',
    bio: 'Músico y emprendedor 🎸. Creo que la vida es mejor con buena música y mejores personas a tu lado. Siempre abierto a nuevas experiencias.',
    avatar: 'assets/img/avatar-6.jpg',
    photos: ['assets/img/avatar-6.jpg'],
    interests: ['🎸 Música', '🚀 Emprendimiento', '🏋️ Gym', '🎮 Gaming'],
    online: true,
    verified: false,
    liked: false,
    superLiked: false,
  },
  {
    id: 7,
    name: 'Sebastián',
    lastName: 'Gómez',
    age: 29,
    city: 'Bogotá',
    country: 'Colombia',
    distance: '8.700 km',
    bio: 'Abogado de día, fotógrafo de fin de semana 📸. Capturo momentos y defiendo causas. En busca de nuevas historias y personas interesantes.',
    avatar: 'assets/img/avatar-7.jpg',
    photos: ['assets/img/avatar-7.jpg'],
    interests: ['📸 Fotografía', '⚖️ Derecho', '✈️ Viajes', '🎭 Cultura'],
    online: true,
    verified: true,
    liked: false,
    superLiked: false,
  },
  {
    id: 8,
    name: 'Mateo',
    lastName: 'Jiménez',
    age: 25,
    city: 'Santiago',
    country: 'Chile',
    distance: '11.200 km',
    bio: 'Médico residente 🏥 y montañista apasionado 🏔️. La adrenalina del quirófano y las cumbres me mantienen vivo. Valoro la profundidad en todo.',
    avatar: 'assets/img/avatar-8.jpg',
    photos: ['assets/img/avatar-8.jpg'],
    interests: ['🏥 Medicina', '🏔️ Montañismo', '🚴 Ciclismo', '📚 Ciencia'],
    online: false,
    verified: true,
    liked: false,
    superLiked: false,
  },
  {
    id: 9,
    name: 'Luna',
    lastName: 'Reyes',
    age: 24,
    city: 'Miami',
    country: 'EE.UU.',
    distance: '7.400 km',
    bio: 'Modelo y activista social 🌸. Creo en la belleza interior y exterior. Busco conexiones genuinas con personas auténticas que quieran hacer el bien ✨.',
    avatar: 'assets/img/avatar-9.jpg',
    photos: ['assets/img/avatar-9.jpg'],
    interests: ['🌸 Moda', '🌎 Activismo', '💄 Belleza', '🧘 Meditación'],
    online: true,
    verified: true,
    liked: false,
    superLiked: false,
  },
  {
    id: 10,
    name: 'Andrés',
    lastName: 'Morales',
    age: 28,
    city: 'Barcelona',
    country: 'España',
    distance: '590 km',
    bio: 'Startupero serial 🚀 y amante del surf 🏄. Fracasé 3 veces antes de triunfar. Aprendo del océano y de la vida. ¿Hablamos?',
    avatar: 'assets/img/avatar-10.jpg',
    photos: ['assets/img/avatar-10.jpg'],
    interests: ['🚀 Startups', '🏄 Surf', '💡 Innovación', '📖 Libros'],
    online: false,
    verified: false,
    liked: false,
    superLiked: false,
  },
];

// ============================================================
// MATCHES
// ============================================================
let MATCHES = [
  { userId: 1, timestamp: new Date(Date.now() - 300000),   isNew: true  },
  { userId: 4, timestamp: new Date(Date.now() - 3600000),  isNew: true  },
  { userId: 7, timestamp: new Date(Date.now() - 7200000),  isNew: false },
  { userId: 9, timestamp: new Date(Date.now() - 86400000), isNew: false },
];

// ============================================================
// CONVERSATIONS
// ============================================================
let CONVERSATIONS = [
  {
    id: 'c1',
    userId: 1,
    messages: [
      { id: 'm1', from: 1, text: '¡Hola! Me alegra que hagamos match 😊', time: '2:30 PM', read: true  },
      { id: 'm2', from: 0, text: '¡Hola Sofía! La sensación es mutua 😄', time: '2:32 PM', read: true  },
      { id: 'm3', from: 1, text: 'Vi que también te gusta viajar... ¿cuál es tu destino favorito?', time: '2:33 PM', read: true  },
      { id: 'm4', from: 0, text: '¡Japón sin duda! La cultura, la comida, todo es increíble 🇯🇵', time: '2:35 PM', read: true  },
      { id: 'm5', from: 1, text: '¡No puede ser!! Yo tengo Tokio en mi bucket list ⭐', time: '2:36 PM', read: false },
    ],
    lastMessage: '¡No puede ser!! Yo tengo Tokio en mi bucket list ⭐',
    lastTime: '2:36 PM',
    unread: 1,
  },
  {
    id: 'c2',
    userId: 4,
    messages: [
      { id: 'm1', from: 4, text: '¡Match! ¿Qué tal tu día? 🌟', time: '11:20 AM', read: true },
      { id: 'm2', from: 0, text: '¡Muy bien! Acabo de terminar de trabajar. ¿Y tú?', time: '11:45 AM', read: true },
      { id: 'm3', from: 4, text: 'Aquí practicando yoga y preparando el almuerzo 🧘🍜', time: '11:46 AM', read: true },
    ],
    lastMessage: 'Aquí practicando yoga y preparando el almuerzo 🧘🍜',
    lastTime: '11:46 AM',
    unread: 0,
  },
  {
    id: 'c3',
    userId: 7,
    messages: [
      { id: 'm1', from: 7, text: 'Vi tu perfil y me pareció muy interesante', time: 'Ayer', read: true },
      { id: 'm2', from: 0, text: 'Igualmente! Esa foto en Machu Picchu es increíble 📸', time: 'Ayer', read: true },
      { id: 'm3', from: 7, text: 'Gracias! Fue en diciembre pasado, fue una experiencia increíble', time: 'Ayer', read: true },
    ],
    lastMessage: 'Gracias! Fue en diciembre pasado, fue una experiencia increíble',
    lastTime: 'Ayer',
    unread: 0,
  },
  {
    id: 'c4',
    userId: 9,
    messages: [
      { id: 'm1', from: 9, text: 'Hola! Me encantan tus fotos de viajes 🌍', time: 'Lun', read: true },
      { id: 'm2', from: 0, text: '¡Gracias Luna! ¿Has viajado mucho tú también?', time: 'Lun', read: true },
    ],
    lastMessage: '¡Gracias Luna! ¿Has viajado mucho tú también?',
    lastTime: 'Lun',
    unread: 0,
  },
];

// ============================================================
// NOTIFICATIONS
// ============================================================
let NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'match',
    userId: 1,
    text: '<strong>Sofía Martínez</strong> y tú hacen match 🎉',
    time: 'Hace 5 min',
    read: false,
    icon: '💘',
    iconBg: 'rgba(253,38,122,0.12)',
  },
  {
    id: 'n2',
    type: 'like',
    userId: 4,
    text: '<strong>Camila Torres</strong> te dio Me Gusta ❤️',
    time: 'Hace 1 hora',
    read: false,
    icon: '❤️',
    iconBg: 'rgba(255,88,100,0.12)',
  },
  {
    id: 'n3',
    type: 'superlike',
    userId: 9,
    text: '<strong>Luna Reyes</strong> te dio Super Like ⭐',
    time: 'Hace 2 horas',
    read: false,
    icon: '⭐',
    iconBg: 'rgba(255,184,0,0.12)',
  },
  {
    id: 'n4',
    type: 'message',
    userId: 1,
    text: '<strong>Sofía</strong> te envió un mensaje nuevo',
    time: 'Hace 3 horas',
    read: true,
    icon: '💬',
    iconBg: 'rgba(59,130,246,0.12)',
  },
  {
    id: 'n5',
    type: 'like',
    userId: 3,
    text: '<strong>Valentina López</strong> te dio Me Gusta',
    time: 'Ayer',
    read: true,
    icon: '❤️',
    iconBg: 'rgba(255,88,100,0.12)',
  },
  {
    id: 'n6',
    type: 'match',
    userId: 7,
    text: '<strong>Sebastián Gómez</strong> y tú hacen match',
    time: 'Ayer',
    read: true,
    icon: '💘',
    iconBg: 'rgba(253,38,122,0.12)',
  },
  {
    id: 'n7',
    type: 'visit',
    userId: 6,
    text: '<strong>Diego Fernández</strong> visitó tu perfil',
    time: 'Hace 2 días',
    read: true,
    icon: '👁️',
    iconBg: 'rgba(139,92,246,0.12)',
  },
  {
    id: 'n8',
    type: 'like',
    userId: 2,
    text: '<strong>Isabella García</strong> te dio Me Gusta',
    time: 'Hace 3 días',
    read: true,
    icon: '❤️',
    iconBg: 'rgba(255,88,100,0.12)',
  },
];

// ============================================================
// APP SETTINGS
// ============================================================
const APP_SETTINGS = {
  discovery: {
    ageMin: 20,
    ageMax: 35,
    maxDistance: 50,
    showMe: 'everyone',   // 'men' | 'women' | 'everyone'
    showOnExplore: true,
    globalMode: false,
  },
  notifications: {
    matches:   true,
    messages:  true,
    likes:     true,
    superLikes: true,
    appUpdates: false,
    emailDigest: true,
  },
  privacy: {
    profileVisible: true,
    showDistance:   true,
    showAge:        true,
    readReceipts:   true,
  },
  account: {
    phone: '+34 600 000 000',
    email: 'alexito@alexitofind.app',
    linkedSocial: ['Google'],
  },
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/** Get user by ID */
function getUserById(id) {
  if (id === 0) return CURRENT_USER;
  return USERS.find(u => u.id === id) || null;
}

/** Get matched users with full data */
function getMatchedUsers() {
  return MATCHES.map(m => ({ ...m, user: getUserById(m.userId) })).filter(m => m.user);
}

/** Get conversations enriched with user data */
function getConversationsWithUsers() {
  return CONVERSATIONS.map(c => ({ ...c, user: getUserById(c.userId) })).filter(c => c.user);
}

/** Get conversation by user ID */
function getConversationByUserId(userId) {
  return CONVERSATIONS.find(c => c.userId === userId) || null;
}

/** Unread notification count */
function getUnreadNotificationsCount() {
  return NOTIFICATIONS.filter(n => !n.read).length;
}

/** Unread message count */
function getUnreadMessagesCount() {
  return CONVERSATIONS.reduce((sum, c) => sum + (c.unread || 0), 0);
}

/** Add a new match */
function addMatch(userId) {
  if (!MATCHES.find(m => m.userId === userId)) {
    MATCHES.unshift({ userId, timestamp: new Date(), isNew: true });
  }
}

/** Add a notification */
function addNotification(notif) {
  NOTIFICATIONS.unshift({ id: 'n' + Date.now(), read: false, ...notif });
}

/** Mark all notifications as read */
function markAllNotificationsRead() {
  NOTIFICATIONS.forEach(n => { n.read = true; });
}

/** Mark all messages in conversation as read */
function markConversationRead(convId) {
  const conv = CONVERSATIONS.find(c => c.id === convId);
  if (conv) {
    conv.unread = 0;
    conv.messages.forEach(m => { m.read = true; });
  }
}
