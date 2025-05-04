export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  dateTime: string;
  type: 'remote' | 'presential';
  reason: string;
  status: 'pending' | 'confirmed';
}

export interface Activity {
  id: string;
  type: 'created' | 'completed' | 'updated';
  message: string;
  time: string;
}

export interface Stats {
  appointments: number;
  patients: number;
  prescriptions: number;
}