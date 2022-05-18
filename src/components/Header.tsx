


const Header: React.FC<{ title: string }> = ({title}) => {
  return (<header className= "header">
    <h2>{title}</h2>
    <span>Last edit on</span>
    </header>
  )
}

export default Header