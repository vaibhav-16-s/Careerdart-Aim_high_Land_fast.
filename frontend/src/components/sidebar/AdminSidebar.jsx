import { Link } from "react-router-dom";


function AdminSidebar({open, setOpen}) {

  return (

    <div 
      className="bg-dark text-white vh-100 p-3 position-fixed"
      style={{ 
        width: open ? "260px" : "80px",
        transition:"0.3s"
      }}
    >

      <div 
        className="text-center mb-4"
        onClick={() => setOpen(!open)}
        style={{cursor:"pointer"}}
      >
        <h3 className="fw-bold">
          {open ? "CareerDart" : "CD"}
        </h3>
      </div>


      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/dashboard">
            <i className="bi bi-speedometer2 me-2"></i>
            {open && "Dashboard"}
          </Link>
        </li>


        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/users">
            <i className="bi bi-people me-2"></i>
            {open && "Users"}
          </Link>
        </li>


        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/employers">
            <i className="bi bi-building me-2"></i>
            {open && "Employers"}
          </Link>
        </li>


        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin/jobs">
            <i className="bi bi-briefcase me-2"></i>
            {open && "Manage Jobs"}
          </Link>
        </li>


      </ul>

    </div>

  );
}

export default AdminSidebar;