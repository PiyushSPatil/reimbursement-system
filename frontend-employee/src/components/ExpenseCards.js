import StatusBadge from "./StatusBadge";

export default function ExpenseCards({ data }) {
  return (
    <div style={styles.container}>
      {data.map((item, index) => (
        <div key={index} style={styles.card}>
          <h3>{item.description}</h3>
          <p><b>Amount:</b> ₹ {item.amount}</p>
          <p><b>Date:</b> {item.date}</p>
          <p><b>Category:</b> {item.category}</p>
          <p><b>Paid By:</b> {item.paidBy}</p>

          <StatusBadge status={item.status} />
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#020617",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #1e293b",
  },
};