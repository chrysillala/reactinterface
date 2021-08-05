import { useState, useEffect, useCallback } from 'react';
import { BiCalendar } from 'react-icons/bi';
import Search from './Components/Search';
import AddAppointment from './Components/AddAppointment';
import AppointmentInfo from './Components/AppointmentInfo';

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('petName');
  const [orderBy, setOrderBy] = useState('asc');

  const filteredAppointment = appointmentList.filter(item => {
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    )
  }).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
    );
  }
  )

  // here we use useCallback() to retrieve data
  // and monitor any changes that happen to the data
  const fetchData = useCallback(async () => {
    console.log('useCallback gets called');
    await fetch('./data.json')
      .then(response => response.json())
      .then(data => setAppointmentList(data));
  }, []);

  // to track the fetching of data
  // so if the data changes for some reason,
  // useEffect() will keep track of it and update our app automatically
  useEffect(() => {
    console.log('useEffect gets called');
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl">
        <BiCalendar className="inline-block text-red-400 align-top" />Your Appointment
      </h1>
      <AddAppointment />
      <Search query={query} onQueryChange={userQuery => setQuery(userQuery)} />

      <ul className="divide-y divide-gray-200">
        {filteredAppointment
          .map(appointment => (
            <AppointmentInfo
              key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={
                (appointmentId) =>
                  setAppointmentList(appointmentList.filter(appointment =>
                    appointment.id !== appointmentId
                  ))
              }
            />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
