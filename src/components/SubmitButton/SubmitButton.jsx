
import { Button } from '../Button';
import Text from '../TextComponent';
import styles from './style.module.css'
// import { useFormStatus } from 'react-dom'

export function SubmitButton({ text, onPendingText = null, width, disabled , pending}) {
  // const { pending } = useFormStatus();
  return (
      <Button type="submit"  disabled={pending || disabled} style={{ width: width, background: pending? "var(--light-blue)": "var(--blue-gradient)", color: "black" }} >     
        {pending && !onPendingText ?
         <div className={styles.loading}><div className={styles.spinner}></div></div>
          :
          <Text as="h4" textColor="black" fontStyle="b">{pending ? onPendingText : text}</Text>
          }
      </Button>
  )
}