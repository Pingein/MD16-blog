import styles from './Navigation.module.scss'
import { Link } from "react-router-dom";


interface NavLink {
    to: string
    text: string
}

interface NavigationParams {
    links: NavLink[]
}


let links:NavLink[] = [{to:'../', text:'Home'},
                       {to:'../blog', text:'Blog'}]

const Navigation = ({links}:NavigationParams) => {
    return (
        <div className={styles.navBar}>
            <ul className={styles.nav}>
                {links.map(link => {
                    return (
                        <li key={link.text} className={styles.navItem}>
                            <Link className={styles.navText} 
                                to={link.to}>
                                {link.text}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <button className={styles.addPostBtn}>
                <Link to='../blog/write'>Add Post</Link> 
            </button>
        </div>
    )
}


export { links }

export default Navigation

