import { useState } from "react";
import useCharacters from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import Skeleton from "../components/ui/Skeleton";

const MainPage = () => {
    const [search, setSearch] = useState("");
    const { data, isLoading } = useCharacters();

    const filteredCharacters = data?.items?.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-accent">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-6 text-secondary">Personajes Dragon Ball</h1>
                <input
                    type="text"
                    placeholder="Buscar personaje"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full text-secondary placeholder-secondary bg-light border-2 border-primary rounded-lg p-2 mb-6 focus:outline-none focus:border-secondary"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {isLoading
                        ? Array(8).fill(0).map((_, index) => <Skeleton key={index} />)
                        : filteredCharacters?.map((character) => (
                            <CharacterCard key={character.id} character={character} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default MainPage;