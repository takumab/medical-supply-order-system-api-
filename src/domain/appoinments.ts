// Defining the structure of what I'm modeling
// Data Models
interface Appointment {
  id: string;
  dateTime: Date;
  customerId: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface CustomerAppointment {
  name: string;
  email: string;
  dateTime: Date;
}

// Inside Right side
interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  get(appointmentId: string): Promise<Appointment>;
}

interface CustomerRepository {
  save(customer: Customer): Promise<void>;
  get(customerId: string): Promise<Customer>;
}


// Inside Center/Business Logic
class BookAppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async schedule(anAppointment: Appointment): Promise<void> {
    await this.appointmentRepository.save(anAppointment);
    console.log('Appointment booked!');
  }

}

class QueryCustomerAppointmentService {
  constructor(private appointmentRepository: AppointmentRepository, private customerRepository: CustomerRepository) {}

  async findOne(id: string): Promise<CustomerAppointment> {
    const { customerId, dateTime } = await this.appointmentRepository.get(id);
    const { name, email } = await this.customerRepository.get(customerId);

    return {
      name,
      email,
      dateTime
    };
  }
}

// Outside Right Side
class InMemoryAppointmentRepository implements AppointmentRepository {
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

class InMemoryCustomerRepository implements CustomerRepository {
  private customerList: Customer[] = [];

  async get(customerId: string): Promise<Customer> {
    const found = this.customerList
      .filter(element => element.id === customerId);
    const [customer] = found;
    return customer;
  }

  async save(customer: Customer): Promise<void> {
    this.customerList.push(customer);
    console.log('Customer saved');
    console.log(`Customers: ${this.customerList}`)
  }
}


// Outside Left side
const run = async () => {
  const customer = {
    id: '234',
    name: "Ade",
    email: 'ade@example.com'
  };

  const appointment: Appointment = {
    id: '123',
    dateTime: new Date(),
    customerId: customer.id,
  };

  //Book appointment service needs repo
  const inMemoryAppointmentRepository = new InMemoryAppointmentRepository();
  const inMemoryCustomerRepository = new InMemoryCustomerRepository();

  // We assume customer exist
  await inMemoryCustomerRepository.save(customer);

  //Set up to schedule an appointment
  const bookAppointmentService = new BookAppointmentService(inMemoryAppointmentRepository);

  const queryAppointmentService = new QueryCustomerAppointmentService(inMemoryAppointmentRepository, inMemoryCustomerRepository);

  // Schedule an appointment
  await bookAppointmentService.schedule(appointment)
  const retrievedCustomerAppointment = await queryAppointmentService.findOne(appointment.id)
  console.log("Here's the appointment you asked for: ", retrievedCustomerAppointment);
}

run()