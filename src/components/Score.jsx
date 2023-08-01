function Score({numOfRolls, timer}) {
    return (
        <div className="score--container">
            <p>n.of Rolls: {numOfRolls}</p>
            <p>Time: {timer}</p>
        </div>
    )
}

export default Score