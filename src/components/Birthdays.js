import Birthday from './Birthday'


const Birthdays = ({ birthdays, onDelete, onToggle }) => {
  return (
    <>
      {birthdays.map((birthday, index) => (
       <Birthday 
        key={index} 
        birthday={birthday} 
        onDelete={onDelete} 
        onToggle={onToggle} />
      ))}
    </>
  )
}

export default Birthdays