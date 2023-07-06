import Moon from '../../assets/icons/icon-moon.svg'
import Sun from '../../assets/icons/icon-sun.svg'
import './header.css'

const Header = ({ theme, setTheme }) => {
    const changeTheme = () => {
        setTheme(value => {
            return !value;
        })
    }
    return (
        <header className={`header ${theme ? 'dark' : 'light'}`}>
            <section className="header-section flex flex-column">
                <section className="header-title flex w-100">
                    <h1 className='uppercase'>todo</h1>
                    <section className='toggle-theme' onClick={changeTheme}>
                        <img src={theme ? Sun : Moon}
                            alt={theme ? 'Sun' : 'Moon'}
                            title={theme ? 'Switch to light mode' : 'Switch to dark mode'} />
                    </section>
                </section>
            </section>
        </header>
    )
}

export default Header