import Header from "./components/Header/Header"
import './App.css'

type Props = {
  children: React.ReactElement
}

export default function App({ children }: Props) {
  return (
    <div className="app">
      <Header />
      {children}
    </div>
  )
}