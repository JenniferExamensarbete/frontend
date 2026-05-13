import "./Badges.css";

function Badges({ children, variant = "normal" }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

export default Badges;