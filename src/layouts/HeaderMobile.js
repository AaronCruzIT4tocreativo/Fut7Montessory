import React from "react"
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import userAvatar from "../assets/img/img1.jpg";
import notification from "../data/Notification";

const sidebarShow = (e) => {
  document.querySelector("body").classList.toggle("sidebar-show");
}

export default function HeaderMobile({onSkin}) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="dropdown-link"
    >
      {children}
    </Link>
  ));

  const toggleSidebar = (e) => {
    e.preventDefault();
    let isOffset = document.body.classList.contains("sidebar-offset");
    if (isOffset) {
      document.body.classList.toggle("sidebar-show");
    } else {
      if (window.matchMedia("(max-width: 991px)").matches) {
        document.body.classList.toggle("sidebar-show");
      } else {
        document.body.classList.toggle("sidebar-hide");
      }
    }
  }

  function NotificationList() {
    const notiList = notification.map((item, key) => {
      return (
        <li className="list-group-item" key={key}>
          <div className={(item.status === "online") ? "avatar online" : "avatar"}>{item.avatar}</div>
          <div className="list-group-body">
            <p>{item.text}</p>
            <span>{item.date}</span>
          </div>
        </li>
      )
    });

    return (
      <ul className="list-group">
        {notiList}
      </ul>
    );
  }

  const skinMode = (e) => {
    e.preventDefault();
    e.target.classList.add("active");

    let node = e.target.parentNode.firstChild;
    while (node) {
      if (node !== e.target && node.nodeType === Node.ELEMENT_NODE)
        node.classList.remove("active");
      node = node.nextElementSibling || node.nextSibling;
    }

    let skin = e.target.textContent.toLowerCase();
    let HTMLTag = document.querySelector("html");

    if (skin === "dark") {
      HTMLTag.setAttribute("data-skin", skin);
      localStorage.setItem('skin-mode', skin);

      onSkin(skin);

    } else {
      HTMLTag.removeAttribute("data-skin");
      localStorage.removeItem('skin-mode');

      onSkin('');
    }

  };

  const sidebarSkin = (e) => {
    e.preventDefault();
    e.target.classList.add("active");

    let node = e.target.parentNode.firstChild;
    while (node) {
      if (node !== e.target && node.nodeType === Node.ELEMENT_NODE)
        node.classList.remove("active");
      node = node.nextElementSibling || node.nextSibling;
    }

    let skin = e.target.textContent.toLowerCase();
    let HTMLTag = document.querySelector("html");

    HTMLTag.removeAttribute("data-sidebar");

    if (skin !== "default") {
      HTMLTag.setAttribute("data-sidebar", skin);
      localStorage.setItem("sidebar-skin", skin);
    } else {
      localStorage.removeItem("sidebar-skin", skin);
    }
  };

  return (
    <div className="header-main px-3 px-lg-4">
      <Link onClick={toggleSidebar} className="menu-link me-3 me-lg-4"><i className="ri-menu-2-fill"></i></Link>

      <div className=" me-auto">
      </div>

      <Dropdown className="dropdown-skin" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          <i className="ri-settings-3-line"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f">
          <label>Tema</label>
          <nav className="nav nav-skin">
            <Link onClick={skinMode} className={localStorage.getItem("skin-mode") ? "nav-link" : "nav-link active"}>Light</Link>
            <Link onClick={skinMode} className={localStorage.getItem("skin-mode") ? "nav-link active" : "nav-link"}>Dark</Link>
          </nav>


          {/*<label>Sidebar Skin</label>
          <nav id="sidebarSkin" className="nav nav-skin">
            <Link onClick={sidebarSkin} className={!(localStorage.getItem("sidebar-skin")) ? "nav-link active" : "nav-link"}>Default</Link>
            <Link onClick={sidebarSkin} className={(localStorage.getItem("sidebar-skin") === "prime") ? "nav-link active" : "nav-link"}>Prime</Link>
            <Link onClick={sidebarSkin} className={(localStorage.getItem("sidebar-skin") === "dark") ? "nav-link active" : "nav-link"}>Dark</Link>
          </nav> */}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="dropdown-notification ms-3 ms-xl-4" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          <small>3</small><i className="ri-notification-3-line"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f me--10-f">
          <div className="dropdown-menu-header">
            <h6 className="dropdown-menu-title">Notificaciones</h6>
          </div>
          {NotificationList()}
          <div className="dropdown-menu-footer"><Link to="/apps/Email">Mostrar todas</Link></div>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="dropdown-profile ms-3 ms-xl-4" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          <div className="avatar online">
            <img src={userAvatar} alt="" />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f">
          <div className="dropdown-menu-body">
            <div className="avatar avatar-xl online mb-3"><img src={userAvatar} alt="" /></div>
            <h5 className="mb-1 text-dark fw-semibold">Usuario</h5>
            <p className="fs-sm text-secondary"></p>

            <nav className="nav">
              {/*<Link to=""><i className="ri-edit-2-line"></i> Editar perfil</Link>*/}
              <Link to="/pages/profile"><i className="ri-profile-line"></i> Perfil</Link>
            </nav>
            <hr />
            <nav className="nav">
              {/* <Link to=""><i className="ri-lock-line"></i> Ajustes de p</Link> 
              <Link to=""><i className="ri-user-settings-line"></i> Ajustes</Link>*/}
              <Link to="/pages/signin"><i className="ri-logout-box-r-line"></i> Cerrar sesión</Link>
            </nav>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}