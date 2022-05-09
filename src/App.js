import Header from "./components/Header";
import Birthdays from "./components/Birthdays";
import AddBirthday from "./components/AddBirthday";
import { useState, useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  const [showAddBirthday, setShowAddBirthday] = useState(false)
  const [birthdays, setBirthdays] = useState([])

  useEffect(() => {
    const getBirthdays = async () => {
      const birthdaysFromServer = await fetchBirthdays()
      setBirthdays(birthdaysFromServer)
    }

    getBirthdays()
  }, [])

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'celebrity-bucks.p.rapidapi.com',
      'X-RapidAPI-Key': '7ccb68e773mshf595b9bf039e4bfp161c49jsnd7f230c230d3'
    }
  };

  const fetchBirthdays = async() => {
    const res = await fetch('https://celebrity-bucks.p.rapidapi.com/birthdays/JSON', options)
    
    
    const data = await res.json()
    console.log(data)

    return data
  }

  const fetchBirthday = async (celebId) => {
    const res = await fetch(`https://celebrity-bucks.p.rapidapi.com/birthdays/JSON/${celebId}`, options)
    const data = await res.json()

    return data 
  }



  const addBirthday = async (birthday) => {
    const res = await fetch('https://celebrity-bucks.p.rapidapi.com/birthdays/JSON', options, {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(birthday),
    })

    const data = await res.json()
    console.log(data)

    setBirthdays([...birthdays.Birthdays, data])
  }


  const deleteBirthday = async (celebId) => {
    await fetch(`https://celebrity-bucks.p.rapidapi.com/birthdays/JSON/${celebId}`, {
      method: 'DELETE',
    })

    setBirthdays(birthdays.filter((birthday) => birthday.celebId !== celebId))
  }

 

  const toggleReminder = async (celebId) => {
    const birthdayToToggle = await fetchBirthday(celebId)
    const updBirthday = { ...birthdayToToggle, reminder: !birthdayToToggle.reminder }

    const res = await fetch(`https://celebrity-bucks.p.rapidapi.com/birthdays/JSON/${celebId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updBirthday),
    })

    const data = await res.json()

    setBirthdays(
      birthdays.map((birthday)=> 
        birthday.celebId === celebId ? {...birthday, reminder: !birthday.reminder} : birthday
      )
    )
  }

  return (
    <Router>
      <div className="container">
        <Header 
          onAdd={() => setShowAddBirthday(!showAddBirthday)} 
          showAdd={showAddBirthday}
        />
        <Routes>
          <Route 
            path = '/'
            element = {
              <>
                {showAddBirthday && <AddBirthday onAdd={addBirthday} />}
                {birthdays.length > 0 ? (
                  <Birthdays 
                    birthdays={birthdays} 
                    onDelete={deleteBirthday} 
                    onToggle={toggleReminder}
                  /> 
                ) : (
                  'No Birthdays To Show'
                )}
              </>
            }
          />
          <Route path='/about' component={About}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
