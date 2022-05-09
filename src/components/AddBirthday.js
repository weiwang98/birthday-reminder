import { useState } from 'react'

const AddBirthday = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
      e.preventDefault()

      if(!name) {
          alert('Please add a name.')
          return
      }
      onAdd({ name, dob, reminder })

      setName('')
      setDob('')
      setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Name</label>
            <input 
                type="text" 
                placeholder='First name, Last name' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="form-control">
            <label>Date of Birth</label>
            <input 
                type="text" 
                placeholder='yyyy-mm-dd'
                value={dob} 
                onChange={(e) => setDob(e.target.value)}
            />
        </div>
        <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input 
                type="checkbox" 
                checked={reminder}
                value= {reminder}
                onChange={(e) => setReminder(e.currentTarget.checked)}
            />
        </div>

        <input type="submit" value='Save' className="btn btn-block"/>
    </form>
  )
}

export default AddBirthday