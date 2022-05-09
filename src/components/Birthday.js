import { FiTrash2 } from 'react-icons/fi'

const Birthday = ({ birthday, onDelete, onToggle}) => {
  return (
    <div 
      className={`birthday ${birthday.reminder ? 'reminder' : ''}`} 
      onDoubleClick={()=> onToggle(birthday.celebId)}
    >
      <h3>
        {birthday.name} 
        <FiTrash2 
          style={{ color: 'black', cursor: 'pointer'}} 
          onClick={() => onDelete(birthday.celebId)}
        />
      </h3>
      <p>{birthday.dob}</p>
    </div>
  )
}

export default Birthday