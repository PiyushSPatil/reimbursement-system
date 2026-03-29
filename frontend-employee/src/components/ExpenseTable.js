import StatusBadge from "./StatusBadge";

export default function ExpenseTable({ data }) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Category</th>
          <th>Paid By</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.description}</td>
            <td>{item.date}</td>
            <td>{item.category}</td>
            <td>{item.paidBy}</td>
            <td>₹ {item.amount}</td>
            <td><StatusBadge status={item.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#020617",
  },
};