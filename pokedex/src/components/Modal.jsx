import ReactDom from 'react-dom'

//we create a new id in the index.html to create the overlay on the id=root
// passing all the div elements into the id=portal below
// handleClassModal is a function that will close the modal when user clicks outside of the modal
// children is the content of the modal
// children is the information/content that is contained in any component within the open and closing tags
const Modal = (props) => {
    const { children, handleClassModal } = props
  return ReactDom.createPortal(
    <div className='modal-container'>
        <button onClick={handleClassModal} className='modal-underlay'/>
        <div className='modal-container'>
            {children}
        </div>
    </div>,
    document.getElementById('portal')
  )
}

export default Modal;