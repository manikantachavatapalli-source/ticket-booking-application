import './index.css'
import Header from '../Header'
import EachItem from '../EachItem'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid"
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const initialTrainData = [
    {
        id: 0,
        from: 'Hyderabad',
        to: 'Banglore',
        arrival: '8:00 PM',
        departure: '6:00 AM 0',
        seats: 250,
        category: 'traindetails',
        operator: 'Indian Railways',
        rating: 4.5,
        status: false,
        contact: 1234567899,
        mail: 'abctravels@gmail.com'
    },
    {
        id: 1,
        from: 'Hyderabad',
        to: 'Narasapuram',
        arrival: '8:00 PM',
        departure: '6:00 AM 0',
        seats: 250,
        category: 'traindetails',
        operator: 'Indian Railways',
        rating: 4.5,
        status: false,
        contact: 1234567899,
        mail: 'abctravels@gmail.com'
    },
    {
        id: 2,
        from: 'Hyderabad',
        to: 'Vizag',
        arrival: '8:00 PM',
        departure: '6:00 AM 0',
        seats: 250,
        category: 'traindetails',
        operator: 'Indian Railways',
        rating: 4.5,
        status: false,
        contact: 1234567899,
        mail: 'abctravels@gmail.com'
    },
    {
        id: 3,
        from: 'Hyderabad',
        to: 'Guntur',
        arrival: '8:00 PM',
        departure: '6:00 AM 0',
        seats: 250,
        category: 'traindetails',
        operator: 'Indian Railways',
        rating: 4.5,
        status: false,
        contact: 1234567899,
        mail: 'abctravels@gmail.com'
    },
    {
        id: 4,
        from: 'Hyderabad',
        to: 'Chennai',
        arrival: '8:00 PM',
        departure: '6:00 AM 0',
        seats: 250,
        category: 'traindetails',
        operator: 'Indian Railways',
        rating: 4.5,
        status: false,
        contact: 1234567899,
        mail: 'abctravels@gmail.com'
    },
    {
        id: 5,
        from: 'Hyderabad',
        to: 'Rajamundry',
        arrival: '8:00 PM',
        departure: '6:00 AM 0',
        seats: 250,
        category: 'traindetails',
        operator: 'Indian Railways',
        rating: 4.5,
        status: false,
        contact: 1234567899,
        mail: 'abctravels@gmail.com'
    }
]
const TrainDetails = () => {
    const navigate = useNavigate()
    // localStorage.setItem('finalTrainData', JSON.stringify(initialTrainData))
    const [searchInput, setSearchInput] = useState('')
    const [trainNote, setTrainNote] = useState('')
    const [storedNotes, setstoredNotes] = useState(JSON.parse(
        localStorage.getItem('finalTrainNotes') || '[]'
    ))
    const [AddingTrainNotes, setAddingTrainNotes] = useState([])
    const trainData = JSON.parse(localStorage.getItem('finalTrainData'))
        useEffect(
            () => {       
                const l = AddingTrainNotes.filter(
                    (presentNote) => (
    
                        !storedNotes.some(
                            (eachStored) =>
                                eachStored.id === presentNote.id
                        )
                    )
                )
                const data = [...storedNotes, ...l]
                localStorage.setItem('finalTrainNotes', JSON.stringify(data))
                setstoredNotes(JSON.parse(localStorage.getItem('finalTrainNotes') || '[]'))
            }, [AddingTrainNotes]
        )
    const onchangesearch = (event) => {
        setSearchInput(event.target.value)
    }
    const onchangeTrainNote = (event) => {
        setTrainNote(event.target.value)
    }
    const onclickTrainAddNote = () => {
        const newNote = {
            id: uuidv4(),
            notes: trainNote
        }
        setAddingTrainNotes((prev) => [...prev, newNote])
        setTrainNote('')
    }
    const searchResults = trainData.filter((each) => (each.to.toLowerCase().includes(searchInput.toLocaleLowerCase()) || each.from.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())))
    const condition = (searchResults.length > 0)? true : false 
    const NoteItem = (props) => {
        const { data } = props
        const { notes } = data
        console.log('hello')
        return (
            <div className="noteCard">
                <p>{notes}</p>
            </div>
        )
    }
    const onclickleft = () => {
        navigate('/details', { replace: true })
    } 
    return (
    <>
        <Header />
        <div className="mainContainer">
            <div className="placesSection">
                    <div className='arrow-container' onClick={onclickleft}>
                        <FaArrowLeft className='arrow-icon' />
                    </div>
                <h1 className="sectionTitle">
                    Search Trains
                </h1>
                <div className="searchContainer">
                    <input
                        type="search"
                        placeholder="Search your favourite place..."
                        className="searchInput"
                        onChange={onchangesearch}
                    />
                </div>
                <div className="placesResults">
                        {(condition) ? (searchResults.map((each) => (<EachItem details={each} key={each.id} />))):(
                                <div className='empty-container'>
                                    <p>No Trains</p>
                                </div>
                        )}
                </div>
            </div>

            <div className="notesSection">
                <h1 className="sectionTitle">
                    Add Note
                </h1>
                <div className="notesInputContainer">
                    <input
                        type="text"
                        placeholder="Add your notes..."
                        className="notesInput"
                        onChange={onchangeTrainNote}
                        value={trainNote}
                    />
                    <button className="addBtn" onClick={onclickTrainAddNote}>
                        Add
                    </button>
                </div>
                <ul className="notesContainer">
                        {(storedNotes.length > 0) ? (storedNotes.map((note) => (<NoteItem data={note} key={note.id} />))) : (<div className='emptyNotes'>No Notes</div>)}
                </ul>
            </div>
        </div>
    </>
    )
}
export default TrainDetails