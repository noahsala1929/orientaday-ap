import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export interface School {
  id: string;
  name: string;
  pin: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logo: ImagePlaceholder;
  pin: string;
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
  { id: 'aldini-valeriani', name: 'Istituto Aldini Valeriani', pin: '1234' },
  { id: 'belluzzi-fioravanti', name: 'IIS Belluzzi-Fioravanti', pin: '2345' },
  { id: 'crescenzi-pacinotti-sirani', name: 'IIS Crescenzi-Pacinotti-Sirani', pin: '3456' },
  { id: 'rosa-luxemburg', name: 'ITCS Rosa Luxemburg', pin: '4567' },
];

export const companies: Company[] = [
  { id: 'lamborghini', name: 'Lamborghini', description: 'Automobili di lusso ad altissime prestazioni. Icona del design e dell\'ingegneria italiana.', logo: PlaceHolderImages[0], pin: '1111' },
  { id: 'ducati', name: 'Ducati', description: 'Moto sportive di fama mondiale, note per design, performance e suono del motore.', logo: PlaceHolderImages[1], pin: '2222' },
  { id: 'ferrari', name: 'Ferrari', description: 'Marchio leggendario di auto sportive e da corsa, simbolo di lusso, velocità ed esclusività.', logo: PlaceHolderImages[2], pin: '3333' },
  { id: 'marchesini-group', name: 'Marchesini Group', description: 'Leader mondiale nelle macchine per il confezionamento farmaceutico e cosmetico.', logo: PlaceHolderImages[3], pin: '4444' },
  { id: 'ima-group', name: 'IMA Group', description: 'Macchine automatiche per il confezionamento di prodotti farmaceutici, cosmetici e alimentari.', logo: PlaceHolderImages[4], pin: '5555' },
  { id: 'coesia', name: 'Coesia (GD)', description: 'Gruppo specializzato in soluzioni industriali e di packaging ad alta tecnologia.', logo: PlaceHolderImages[5], pin: '6666' },
  { id: 'sacmi', name: 'SACMI', description: 'Gruppo leader nei settori macchine per ceramica, packaging e food & beverage.', logo: PlaceHolderImages[6], pin: '7777' },
  { id: 'datalogic', name: 'Datalogic', description: 'Leader nell\'acquisizione automatica dei dati e automazione industriale (lettori barcode, mobile computer).', logo: PlaceHolderImages[7], pin: '8888' },
  { id: 'marposs', name: 'Marposs', description: 'Strumenti di precisione per la misura e il controllo in ambiente di produzione industriale.', logo: PlaceHolderImages[8], pin: '9999' },
  { id: 'faac', name: 'FAAC', description: 'Soluzioni per l\'automazione di accessi (cancelli, barriere, porte) e il controllo accessi.', logo: PlaceHolderImages[9], pin: '1010' },
  { id: 'gruppo-hera', name: 'Gruppo Hera', description: 'Grande multiutility italiana operante nei settori ambiente, idrico ed energia.', logo: PlaceHolderImages[10], pin: '1212' },
  { id: 'site-spa', name: 'Site Spa', description: 'Realizzazione e manutenzione di grandi infrastrutture tecnologiche per TLC ed energia.', logo: PlaceHolderImages[11], pin: '1313' },
  { id: 'alfasigma', name: 'Alfasigma', description: 'Principale azienda farmaceutica in Italia, con focus su aree gastrointestinale e vascolare.', logo: PlaceHolderImages[12], pin: '1414' },
  { id: 'basf', name: 'BASF', description: 'Il più grande produttore chimico al mondo con una vasta gamma di prodotti.', logo: PlaceHolderImages[13], pin: '1515' },
  { id: 'gvs', name: 'GVS Filter Technology', description: 'Filtri e componenti per applicazioni nei settori medicale, laboratorio, automotive e sicurezza.', logo: PlaceHolderImages[15], pin: '1616' },
  { id: 'tetra-pak', name: 'Tetra Pak', description: 'Leader mondiale per le soluzioni di trattamento e confezionamento degli alimenti.', logo: PlaceHolderImages[15], pin: '1717' },
  { id: 'bonfiglioli', name: 'Bonfiglioli', description: 'Progetta e produce una gamma completa di motoriduttori, motori elettrici e inverter.', logo: PlaceHolderImages[16], pin: '1818' },
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

// Mock bookings:
export let bookings: Booking[] = [
  // Slot 1: 09:00 - 09:40
  { studentId: 'student-1', companyId: 'ducati', timeSlotId: 'slot-1' },
  { studentId: 'student-3', companyId: 'ducati', timeSlotId: 'slot-1' },
  { studentId: 'student-2', companyId: 'ferrari', timeSlotId: 'slot-1' },

  // Slot 2: 09:50 - 10:30
  { studentId: 'student-4', companyId: 'lamborghini', timeSlotId: 'slot-2' },
  { studentId: 'student-5', companyId: 'ducati', timeSlotId: 'slot-2' },
  { studentId: 'student-1', companyId: 'marchesini-group', timeSlotId: 'slot-2' },

  // Slot 3: 10:40 - 11:20
  { studentId: 'student-6', companyId: 'ferrari', timeSlotId: 'slot-3' },
  { studentId: 'student-7', companyId: 'ferrari', timeSlotId: 'slot-3' },
  { studentId: 'student-8', companyId: 'ima-group', timeSlotId: 'slot-3' },
];
