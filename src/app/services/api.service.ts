import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  // Mock data for healthcare system
  private mockAppointments = [
    { 
      id: '1', 
      patientName: 'Juan Pérez',
      specialty: 'Medicina General',
      date: '2024-04-15',
      time: '09:00',
      type: 'presential',
      status: 'pending'
    },
    { 
      id: '2', 
      patientName: 'María García',
      specialty: 'Cardiología',
      date: '2024-04-16',
      time: '10:30',
      type: 'remote',
      status: 'confirmed'
    }
  ];

  private mockDoctors = [
    {
      id: '1',
      name: 'Dr. Carlos Rodríguez',
      specialty: 'Medicina General',
      schedule: ['09:00', '10:00', '11:00', '15:00', '16:00']
    },
    {
      id: '2',
      name: 'Dra. Ana Martínez',
      specialty: 'Cardiología',
      schedule: ['08:00', '09:00', '14:00', '15:00', '16:00']
    }
  ];

  private mockStats = {
    appointments: 25,
    patients: 150,
    prescriptions: 45
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Appointments
  getAppointments(): Observable<any[]> {
    return of(this.mockAppointments);
  }

  createAppointment(appointment: any): Observable<any> {
    const newAppointment = {
      id: (this.mockAppointments.length + 1).toString(),
      status: 'pending',
      ...appointment
    };
    this.mockAppointments.push(newAppointment);
    return of(newAppointment);
  }

  // Doctors
  getDoctors(): Observable<any[]> {
    return of(this.mockDoctors);
  }

  getDoctorsBySpecialty(specialty: string): Observable<any[]> {
    return of(this.mockDoctors.filter(d => d.specialty === specialty));
  }

  // Available time slots
  getAvailableTimeSlots(doctorId: string, date: string): Observable<string[]> {
    const doctor = this.mockDoctors.find(d => d.id === doctorId);
    return of(doctor ? doctor.schedule : []);
  }

  // Stats
  getHealthcareStats(): Observable<any> {
    return of(this.mockStats);
  }

  // Helper methods remain the same
  private getHttpOptions() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        })
      };
    }
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(() => error);
  }
}