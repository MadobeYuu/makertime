export default function FabButton({ onClick }) {
  return (
    <img src="./btn.png" style={styles} onClick={onClick} alt="Додати трек" />
  );
}

const styles = {
  position: 'fixed',
  bottom: 30,
  right: 30,
  width: 60,  /* Немного уменьшил, чтобы выглядело аккуратнее */
  height: 60,
  cursor: 'pointer',
  borderRadius: '50%', /* Делаем тень круглой, чтобы не было черного квадрата */
  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
  transition: 'transform 0.2s ease'
};