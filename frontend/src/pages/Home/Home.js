import './Home.scss'
import HomePage from '../../components/HomePage/HomePage'

function Home ({loaderDisplay}) {

    return (
        <main>
           <HomePage loaderDisplay={loaderDisplay}/>
        </main>
    )
}

export default Home