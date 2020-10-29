// Defining the structure of what I'm modeling
// Data Models
interface Appointment {
  id: string;
  dateTime: Date;
  customer: Customer;
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

// Inside Right side
interface BookAppointmentServiceRepository {
  save(appointment: Appointment): Promise<void>;
  get(appointmentId: string): Promise<Appointment>;
}

// Missing Inside Left side

// Inside Center/Business Logic
class BookAppointmentService {
  constructor(private bookAppointmentServiceRepository: BookAppointmentServiceRepository) {}

  async schedule(anAppointment: Appointment): Promise<void> {
    await this.bookAppointmentServiceRepository.save(anAppointment);
    console.log('Appointment booked!');
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = this.bookAppointmentServiceRepository.get(id);
    return appointment;
  }
}

// Outside Right Side
class InMemoryBookAppointmentRepository implements BookAppointmentServiceRepository {
  private appointmentList: Appointment[] = [];

  async save(appointment: Appointment): Promise<void> {
    await this.appointmentList.push(appointment);
    console.log('Appointment saved');
    console.log(`Appointments: ${this.appointmentList}`)
  }

  async get(appointmentId: string): Promise<Appointment> {
    const found = this.appointmentList
                      .filter(element => element.id === appointmentId);
    const [appointment] = found;
    return appointment;
  }
}


// Outside Left side
const run = async () => {
  const appointment: Appointment = {
    id: '123',
    dateTime: new Date(),
    customer: {
      id: '234',
      name: "Ade",
      email: 'ade@example.com'
    }
  };

  //Book appointment service needs repo
  const mySQLBookAppointmentRepository = new InMemoryBookAppointmentRepository();

  //Set up to schedule an appointment
  const bookAppointmentService = new BookAppointmentService(mySQLBookAppointmentRepository);

  // Schedule an appointment
  await bookAppointmentService.schedule(appointment)
  const retreivedAppointment = await bookAppointmentService.findOne(appointment.id)
  console.log("Here's the appointment you asked for: ", retreivedAppointment);
}

run()