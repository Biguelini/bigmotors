import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Routes from './Routes'
export default function App(props) {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="app">
                <Header />
                <Routes />
            </div>
        </BrowserRouter>
    )
}
