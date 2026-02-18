import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export interface School {
  id: string;
  name: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logo: ImagePlaceholder;
}

export interface TimeSlot {
  id: string;
  label: string;
  capacity: number;
}

export interface Student {
  id: string;
  name: string;
  schoolId: string;
  email: string;
  status: 'present' | 'absent' | 'pending';
}

export interface Booking {
  studentId: string;
  companyId: string;
  timeSlotId: string;
}

export const schools: School[] = [
  { id: 'aldini-valeriani', name: 'Istituto Aldini Valeriani' },
  { id: 'belluzzi-fioravanti', name: 'IIS Belluzzi-Fioravanti' },
  { id: 'crescenzi-pacinotti-sirani', name: 'IIS Crescenzi-Pacinotti-Sirani' },
  { id: 'rosa-luxemburg', name: 'ITCS Rosa Luxemburg' },
];

export const companies: Company[] = [
  { id: 'lamborghini', name: 'Lamborghini', description: 'Automobili di lusso ad altissime prestazioni. Icona del design e dell\'ingegneria italiana.', logo: PlaceHolderImages[0] },
  { id: 'ducati', name: 'Ducati', description: 'Moto sportive di fama mondiale, note per design, performance e suono del motore.', logo: PlaceHolderImages[1] },
  { id: 'ferrari', name: 'Ferrari', description: 'Marchio leggendario di auto sportive e da corsa, simbolo di lusso, velocità ed esclusività.', logo: PlaceHolderImages[2] },
  { id: 'marchesini-group', name: 'Marchesini Group', description: 'Leader mondiale nelle macchine per il confezionamento farmaceutico e cosmetico.', logo: PlaceHolderImages[3] },
  { id: 'ima-group', name: 'IMA Group', description: 'Macchine automatiche per il confezionamento di prodotti farmaceutici, cosmetici e alimentari.', logo: PlaceHolderImages[4] },
  { id: 'coesia', name: 'Coesia (GD)', description: 'Gruppo specializzato in soluzioni industriali e di packaging ad alta tecnologia.', logo: PlaceHolderImages[5] },
  { id: 'sacmi', name: 'SACMI', description: 'Gruppo leader nei settori macchine per ceramica, packaging e food & beverage.', logo: PlaceHolderImages[6] },
  { id: 'datalogic', name: 'Datalogic', description: 'Leader nell\'acquisizione automatica dei dati e automazione industriale (lettori barcode, mobile computer).', logo: PlaceHolderImages[7] },
  { id: 'marposs', name: 'Marposs', description: 'Strumenti di precisione per la misura e il controllo in ambiente di produzione industriale.', logo: PlaceHolderImages[8] },
  { id: 'faac', name: 'FAAC', description: 'Soluzioni per l\'automazione di accessi (cancelli, barriere, porte) e il controllo accessi.', logo: PlaceHolderImages[9] },
  { id: 'gruppo-hera', name: 'Gruppo Hera', description: 'Grande multiutility italiana operante nei settori ambiente, idrico ed energia.', logo: PlaceHolderImages[10] },
  { id: 'site-spa', name: 'Site Spa', description: 'Realizzazione e manutenzione di grandi infrastrutture tecnologiche per TLC ed energia.', logo: PlaceHolderImages[11] },
  { id: 'alfasigma', name: 'Alfasigma', description: 'Principale azienda farmaceutica in Italia, con focus su aree gastrointestinale e vascolare.', logo: PlaceHolderImages[12] },
  { id: 'basf', name: 'BASF', description: 'Il più grande produttore chimico al mondo con una vasta gamma di prodotti.', logo: PlaceHolderImages[13] },
  { id: 'gvs', name: 'GVS Filter Technology', description: 'Filtri e componenti per applicazioni nei settori medicale, laboratorio, automotive e sicurezza.', logo: PlaceHolderImages[14] },
  { id: 'tetra-pak', name: 'Tetra Pak', description: 'Leader mondiale per le soluzioni di trattamento e confezionamento degli alimenti.', logo: PlaceHolderImages[15] },
  { id: 'bonfiglioli', name: 'Bonfiglioli', description: 'Progetta e produce una gamma completa di motoriduttori, motori elettrici e inverter.', logo: PlaceHolderImages[16] },
];

export const timeSlots: TimeSlot[] = [
  { id: 'slot-1', label: '09:00 - 09:40', capacity: 30 },
  { id: 'slot-2', label: '09:50 - 10:30', capacity: 30 },
  { id: 'slot-3', label: '10:40 - 11:20', capacity: 30 },
];

export const students: Student[] = [
  { id: 'student-1', name: 'Alice Johnson', schoolId: 'northwood', email: 'alice.j@example.com', status: 'pending' },
  { id: 'student-2', name: 'Bob Williams', schoolId: 'northwood', email: 'bob.w@example.com', status: 'pending' },
  { id: 'student-3', name: 'Charlie Brown', schoolId: 'riverdale', email: 'charlie.b@example.com', status: 'pending' },
  { id: 'student-4', name: 'Diana Miller', schoolId: 'summit', email: 'diana.m@example.com', status: 'pending' },
  { id: 'student-5', name: 'Ethan Davis', schoolId: 'northwood', email: 'ethan.d@example.com', status: 'pending' },
  { id: 'student-6', name: 'Fiona Garcia', schoolId: 'brookfield', email: 'fiona.g@example.com', status: 'pending' },
  { id: 'student-7', name: 'George Wilson', schoolId: 'riverdale', email: 'george.w@example.com', status: 'pending' },
  { id: 'student-8', name: 'Hannah Smith', schoolId: 'northwood', email: 'hannah.s@example.com', status: 'pending' },
];

// Mock bookings: each student books one slot.
export let bookings: Booking[] = [];
