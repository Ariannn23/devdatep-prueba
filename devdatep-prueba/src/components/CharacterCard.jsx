const CharacterCard = ({ character }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <img src={character.image} alt={character.name} className="w-full h-48 object-cover rounded-lg"/>
            <h2 clh2sName="text-lg font-bold mt-2">{character.name}</h2>
            <p className="text-gray-500">{character.race}</p>
        </div>
    )
}
export default CharacterCard