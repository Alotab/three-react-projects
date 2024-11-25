import { useState } from "react"
import { coffeeOptions } from "../utils"

const CoffeeForm = () => {
  const [selectedCoffee, setSelectedCoffee] = useState(null)
  const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
  const [coffeeCost, setCoffeeCost] = useState(0)
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)
  
  function handleSubmitForm() {
    console.log(selectedCoffee, coffeeCost, hour, min)
  }


  return (
    <>
      <div className='section-header'>
        <i className='fa-solid fa-pencil'/>
        <h2>Start Tracking Today</h2>
      </div>
      <h4>Select coffee type</h4>
      <div className='coffee-grid'>
        {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
            return (
              <button onClick={() => {
                setSelectedCoffee(option.name)
                setShowCoffeeTypes(false)
               
              }}  className={"button-card " + 
              (option.name === selectedCoffee ? ' coffee-button-selected' : '')} key={optionIndex}>
                <h4>{option.name}</h4>
                <p>{option.caffeine} mg</p>
              </button>
            )
        })}
        <button onClick={() => {
                setShowCoffeeTypes(true)
                setSelectedCoffee(null)
              }}  className={"button-card " + 
              (showCoffeeTypes ? ' coffee-button-selected' : '')}>
          <h4>Other</h4>
          <p>n/a</p>
        </button>
      </div>
      {showCoffeeTypes && ( 
          <select onChange={(e) => {
              setSelectedCoffee(e.target.value)
          }} name="coffee-list" id="coffee-list">
            <option value={null}>Select type</option>
            {coffeeOptions.map((option, optIndex) => {
              return (
                <option value={option.name} key={optIndex}>
                  {option.name } {option.caffeine}mg
                </option>
              )
            })}
          </select>
      )}
      <h4>Add the cost ($)</h4>
      <input className="w-full" type="number" value={coffeeCost}
      onChange={(e) => setCoffeeCost(e.target.value)} 
      placeholder="4.50" />
      <h4>Time since consumption</h4>
      <div className="time-entry">
        <div>
          <h6>Hours</h6>
          <select onChange={(e) => {setHour(e.target.value)}} name="" id="hours-select">
            {[0, 1, 2, 3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23].map((hour, hourIndex) => {
              return (
                <option key={hourIndex} value={hour}>{hour}</option>
              )
            })}
          </select>
        </div>
        <div>
          <h6>Mins</h6>
          <select onChange={(e) => {setMin(e.target.value)}} name="" id="mins-select">
            {[0, 5,10,15,30,45].map((min, minIndex) => {
              return (
                <option key={minIndex} value={min}>{min}</option>
              )
            })}
          </select>
        </div>
      </div>
      <button onClick={handleSubmitForm}>
        Add Entry
      </button>
    </>
  )
}

export default CoffeeForm