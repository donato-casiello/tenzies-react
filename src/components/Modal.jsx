function Modal({resetGame}) {
    return (
        <div className="modal">
            <h1 className="modal--text">New Record 🎉</h1>
            <button 
                className="roll--button"
                onClick={resetGame}
                >New Game
            </button>
        </div>
    )
}

export default Modal