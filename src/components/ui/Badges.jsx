import "./Badges.css";

function Badge({ children, variant = "normal" }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

export default Badge;