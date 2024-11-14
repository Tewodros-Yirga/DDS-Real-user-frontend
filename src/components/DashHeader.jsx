import { Link } from "react-router-dom";

const DashHeader = () => {
  const content = (
    <header>
      <div>
        <Link to="/dash">
          <h1>techNotes</h1>
        </Link>
        <nav>{/* add nav buttons later */}</nav>
      </div>
    </header>
  );

  return content;
};
export default DashHeader;
