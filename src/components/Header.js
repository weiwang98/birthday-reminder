import PropTypes from 'prop-types'
import Button from './Button'
import { FaBirthdayCake } from "react-icons/fa";

const Header = ({title, onAdd, showAdd}) => {
  return (
    <header className="header">
        <h1>
          <FaBirthdayCake 
            style={{ color:'black'}}
          />
          {title}
        </h1>
        <Button text={showAdd? 'CLOSE' : 'ADD'} onClick={onAdd}/>
    </header>
  )
}

Header.defaultProps = {
    title: 'Birthday Reminder',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}


export default Header