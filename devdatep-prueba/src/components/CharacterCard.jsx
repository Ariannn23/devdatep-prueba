const CharacterCard = ({ character }) => {
  return (
    <div className="bg-light rounded-lg shadow-md p-4 border-2 border-primary hover:border-secondary transition-colors">
      <img src={character.image} alt={character.name} className="w-full h-48 object-contain rounded-lg" />
      <h2 className="text-lg font-bold mt-2 text-secondary">{character.name}</h2>
      <p className="text-accent">{character.race}</p>
    </div>
  )
}

export default CharacterCard