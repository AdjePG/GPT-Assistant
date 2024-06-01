import { faLanguage, faUtensils } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { HeaderRouteType } from "../../types"
import { NavLink } from "react-router-dom"
import './Header.css'

export default function Header() {
  const headerRoutes: HeaderRouteType[] = [
    {
      path: "/translator",
      icon: faLanguage,
      text: "Translator"
    }, {
      path: "/recipes",
      icon: faUtensils,
      text: "Recipes"
    }
  ]

  return (
    <nav className="navigator">
      <ul className="list">
        {
          headerRoutes.map((route, index) => (
            <li key={index}>
              <NavLink className="link" to={route.path}>
                <FontAwesomeIcon className="icon" icon={route.icon} />
                <p className="text">{route.text}</p>
              </NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}