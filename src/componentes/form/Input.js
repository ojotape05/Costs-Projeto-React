import PropTypes from 'prop-types'
import styles from './Input.module.css'

function Input({type,text,name,placeholder,handleOnChange,value,required}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                required={required}
            />
        </div>
    )
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
}

Input.defaultProps = {
    type: 'text',
    text: 'generic',
    name: 'generic',
    placeholder: 'generic'
}


export default Input