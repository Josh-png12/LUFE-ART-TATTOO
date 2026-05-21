export type PortfolioCategory =
  | "All"
  | "Blackwork"
  | "Fine Line"
  | "Anime"
  | "Realismo"
  | "Custom";

export type TattooPiece = {
  id: number;
  src: string;
  alt: string;
  category: Exclude<PortfolioCategory, "All">;
  orientation: "portrait" | "square";
  title: string;
  note: string;
  atmosphere: string;
  location: string;
};

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  detail: string;
};

export type SkinStory = {
  title: string;
  meaning: string;
  note: string;
};

export const siteConfig = {
  name: "LUFE ART TATTOO",
  url: "https://lufearttattoo.com",
  instagramUrl: "https://www.instagram.com/lufearttattoo/",
  whatsappNumber: "573003320209",
  whatsappDisplay: "+57 300 3320209",
  slogan: "El arte deja marcas. Nosotros las hacemos eternas."
};

export const portfolioCategories: PortfolioCategory[] = [
  "All",
  "Blackwork",
  "Fine Line",
  "Anime",
  "Realismo",
  "Custom"
];

export const tattooPieces: TattooPiece[] = [
  {
    id: 1,
    src: "/images/tattoos/tattoo-1.png",
    alt: "Blackwork wolf tattoo",
    category: "Blackwork",
    orientation: "portrait",
    title: "Instinto",
    note: "Sombras densas, presencia animal y un gesto agresivo contenido.",
    atmosphere: "Oscuridad ritual y contraste brutal.",
    location: "Pierna"
  },
  {
    id: 2,
    src: "/images/tattoos/tattoo-2.png",
    alt: "Fine line tattoo detail",
    category: "Fine Line",
    orientation: "portrait",
    title: "Trazos Silenciosos",
    note: "Limpieza extrema, ritmo visual y respiracion entre lineas.",
    atmosphere: "Minimalismo fino con tension delicada.",
    location: "Brazo"
  },
  {
    id: 3,
    src: "/images/tattoos/tattoo-3.png",
    alt: "Anime tattoo artwork",
    category: "Anime",
    orientation: "portrait",
    title: "Narrativa Viva",
    note: "Referencias visuales reinterpretadas con fuerza propia sobre piel.",
    atmosphere: "Memoria visual convertida en identidad.",
    location: "Antebrazo"
  },
  {
    id: 4,
    src: "/images/tattoos/tattoo-4.png",
    alt: "Realism tattoo composition",
    category: "Realismo",
    orientation: "portrait",
    title: "Memoria y Volumen",
    note: "Detalle, contraste y profundidad cinematica sobre anatomia.",
    atmosphere: "Presencia emocional y lectura inmediata.",
    location: "Pantorrilla"
  },
  {
    id: 5,
    src: "/images/tattoos/tattoo-5.png",
    alt: "Custom tattoo concept",
    category: "Custom",
    orientation: "portrait",
    title: "Pieza Unica",
    note: "Concepto exclusivo construido desde historia personal.",
    atmosphere: "Direccion artistica irrepetible.",
    location: "Espalda"
  },
  {
    id: 6,
    src: "/images/tattoos/tattoo-6.png",
    alt: "Blackwork sleeve tattoo",
    category: "Blackwork",
    orientation: "portrait",
    title: "Oscuridad Arquitectonica",
    note: "Negro solido, texturas y equilibrio visual en gran formato.",
    atmosphere: "Masa, estructura y elegancia brutal.",
    location: "Brazo"
  },
  {
    id: 7,
    src: "/images/tattoos/tattoo-7.png",
    alt: "Custom realism tattoo",
    category: "Custom",
    orientation: "portrait",
    title: "Identidad Permanente",
    note: "Diseno dirigido para que la piel cuente algo irrepetible.",
    atmosphere: "Simbolo personal convertido en permanencia.",
    location: "Pierna"
  }
];

export const selectedWorks = [tattooPieces[0], tattooPieces[3], tattooPieces[4], tattooPieces[6]];

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Consultation",
    description: "Toda pieza comienza con una conversacion precisa.",
    detail:
      "Referencias, simbolos, anatomia y atmosfera se filtran hasta encontrar una direccion clara."
  },
  {
    index: "02",
    title: "Design",
    description: "La idea se convierte en una composicion con peso visual.",
    detail:
      "No se replica una imagen: se construye un lenguaje que funcione sobre piel y tiempo."
  },
  {
    index: "03",
    title: "Preparation",
    description: "La calma antes de la marca definitiva.",
    detail:
      "Escala, ubicacion, contraste y lectura corporal se ajustan para que nada quede al azar."
  },
  {
    index: "04",
    title: "Execution",
    description: "La tecnica sostiene la emocion.",
    detail:
      "Linea, saturacion y ritmo de sesion se trabajan con precision para que la pieza respire."
  },
  {
    index: "05",
    title: "Permanence",
    description: "La tinta deja de ser idea y se vuelve memoria visible.",
    detail:
      "Cada tatuaje esta pensado para permanecer con presencia, caracter y coherencia visual."
  }
];

export const skinStories: SkinStory[] = [
  {
    title: "Herencia",
    meaning: "Un simbolo familiar convertido en presencia diaria.",
    note: "La pieza no recuerda solo a alguien. Recuerda una fuerza que se lleva encima."
  },
  {
    title: "Metamorfosis",
    meaning: "Cerrar una etapa y convertirla en marca consciente.",
    note: "El tatuaje aparece como un punto de quiebre: no nostalgia, sino transformacion."
  },
  {
    title: "Instinto",
    meaning: "Una imagen feroz para sostener caracter y direccion.",
    note: "La piel deja de ser superficie y se vuelve declaracion."
  }
];

export const instagramHighlights = [
  "Atmosfera de estudio",
  "Nuevas piezas",
  "Proceso creativo",
  "Reservas directas"
];
