import { BiCalendar } from 'react-icons/bi';
import Search from './Components/Search';
import AddAppointment from './Components/AddAppointment';
import AppointmentInfo from './Components/AppointmentInfo';
import appointmentList from './data.json';

function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl">
        <BiCalendar className="inline-block text-red-400 align-top" />Your Appointment
      </h1>
      <AddAppointment />
      <Search />

      <ul className="divide-y divide-gray-200">
        {appointmentList
          .map(appointment => (
            <AppointmentInfo appointment={appointment} key={appointment.id} />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
