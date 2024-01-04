import Navbar from "../Components/Navbar"
import DreamContainer from "../Components/DreamContainer"
import { TestData } from "../constants/test"

function Home() {
    return (
        <div className='bg-background'>
            <Navbar/>
            <div className=" px-10 py-10 mt-28 grid grid-cols-3 gap-5 ">
                {TestData.map((t)=>(
                    <DreamContainer
                        dreamName={t.dreamName}
                        dreamDate={t.dreamDate}
                        dreamDescription={t.dreamDescription}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home