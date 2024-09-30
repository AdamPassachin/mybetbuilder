function BetBuilder({ game }) {
    return (
        <div>
            <h1>{game.homeTeam.name} vs {game.awayTeam.name}</h1>
        </div>
    )
}

export default BetBuilder;