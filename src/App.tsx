import Navbar from "./components/Navbar/Navbar"
import StepsComponent from "./components/StepsComponent/StepsComponent"
import TrendsSectionComponent from "./components/TrendsSectionComponent/TrendsSectionComponent"

const App = () => {
  return (
    <div className=' bg-black06'>
      <Navbar />
      <TrendsSectionComponent />
      <StepsComponent />
    </div>
  )
}

export default App
