export default function FabButton({ onClick }) {
  return (
    <img src="./btn.png" style={styles} onClick={onClick} />
  );
}

const styles = {

  position: 'fixed',
  bottom: 30,
  right: 30,
  width: 70,
  height: 70,
  color: 'white',
  fontSize: 40,
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(0,0,0,0.4)'

};