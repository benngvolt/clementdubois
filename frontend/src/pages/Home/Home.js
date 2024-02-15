import './Home.scss'
import HomePage from '../../components/HomePage/HomePage'

function Home ({loaderDisplay}) {

    return (
        <div >
           <HomePage loaderDisplay={loaderDisplay}/>
        </div>
    )
}

export default Home