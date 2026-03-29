export default function StatusBadge({ status }) {
  const colors = {
    Draft: "#777",
    Submitted: "#f39c12",
    Approved: "#2ecc71",
  };

  return (
    <span
      style={{
        background: colors[status] || "#555",
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "10px",
      }}
    >
      {status}
    </span>
  );
}