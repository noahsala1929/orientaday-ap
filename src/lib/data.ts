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
  { id: 'northwood', name: 'Northwood High School' },
  { id: 'riverdale', name: 'Riverdale Academy' },
  { id: 'summit', name: 'Summit Charter School' },
  { id: 'brookfield', name: 'Brookfield International' },
];

export const companies: Company[] = [
  { id: 'innovate-inc', name: 'Innovate Inc.', description: 'Pioneering the future of AI and machine learning.', logo: PlaceHolderImages[0] },
  { id: 'quantum-dynamics', name: 'Quantum Dynamics', description: 'Revolutionizing computing with quantum technology.', logo: PlaceHolderImages[1] },
  { id: 'eco-solutions', name: 'Eco Solutions', description: 'Building a sustainable future through green tech.', logo: PlaceHolderImages[2] },
  { id: 'health-forward', name: 'Health Forward', description: 'Advancing medical technology for better patient outcomes.', logo: PlaceHolderImages[3] },
  { id: 'nexus-robotics', name: 'Nexus Robotics', description: 'Creating autonomous systems for a connected world.', logo: PlaceHolderImages[4] },
  { id: 'stellar-aerospace', name: 'Stellar Aerospace', description: 'Exploring the cosmos and beyond.', logo: PlaceHolderImages[5] },
];

export const timeSlots: TimeSlot[] = [
  { id: 'slot-1', label: '9:00 AM - 10:00 AM', capacity: 20 },
  { id: 'slot-2', label: '10:00 AM - 11:00 AM', capacity: 20 },
  { id: 'slot-3', label: '11:00 AM - 12:00 PM', capacity: 20 },
  { id: 'slot-4', label: '1:00 PM - 2:00 PM', capacity: 25 },
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
export let bookings: Booking[] = [
  { studentId: 'student-1', companyId: 'innovate-inc', timeSlotId: 'slot-1' },
  { studentId: 'student-2', companyId: 'quantum-dynamics', timeSlotId: 'slot-1' },
  { studentId: 'student-3', companyId: 'eco-solutions', timeSlotId: 'slot-2' },
  { studentId: 'student-5', companyId: 'health-forward', timeSlotId: 'slot-2' },
];
