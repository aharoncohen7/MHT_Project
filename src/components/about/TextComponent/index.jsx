import styles from './styles.module.css';

// as - > You can enter h1 h2 h3 h4 h5 span and p - by trial and error
// fontStyle - > Default is HEBBO unless you want BONA then enter 'b'
// newClass - > You need to create your own class and send PROP example: 'styles.blabla'

const Text = ({ as: Component = 'p', newClass = '', fontStyle, textColor, children, ...props }) => {
  const classFont = fontStyle === 'b' ? styles.bona : fontStyle === 'h' ? styles.heebo : ''
  const className = `${styles[Component]} ${newClass} ${classFont} ${textColor ? styles[textColor] : ''}`
  return (
    <Component className={className} {...props}    >
      {children}
    </Component>
  );
};

export default Text;