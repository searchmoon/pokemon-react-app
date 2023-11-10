import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokeCard from "./components/PokeCard";
import { useDebounce } from "./hooks/useDebounce";

function Test() {
  const [pokemons, setPokemons] = useState([]); //1
  const [offset, setOffSet] = useState(0); // 어디부터 가져올지
  const [limit, setLimit] = useState(20); // 몇개씩 가져올지
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 이 url의 limit 과 offset:
  // limit 은 몇개씩 불러올건지, offset은 어디서부터 불러올건지

  useEffect(() => {
    fetchPokeData(true);
  }, []); //3

  useEffect(() => {
    handleSearchInput(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchPokeData = async (isFirstFetch) => {
    try {
      const offsetValue = isFirstFetch ? 0 : offset + limit;
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offsetValue}`;
      const response = await axios.get(url);
      console.log(response.data.results);
      setPokemons([...pokemons, ...response.data.results]);
      setOffSet(offsetValue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInput = async (searchTerm) => {
    if (searchTerm.length > 0) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
        console.log(response);
        const pokemonData = {
          url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
          name: searchTerm,
        };
        setPokemons([pokemonData]);
      } catch (error) {
        setPokemons([]);
        console.error(error);
      }
    } else {
      fetchPokeData(true);
    }
  };

  return (
    //2
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        <form
          // onSubmit={handleSubmit}
          className="relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs w-[20.5rem] h-6 px-2 py-1 bg-[hsl(214,13%,47%)] rounded-lg text-gray-300 text-center"
          />

          <button
            type="submit"
            className="text-xs bg-slate-900  text-slate-300 w-[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700"
          >
            검색
          </button>
        </form>
      </header>
      <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl ">
          {pokemons.length > 0 ? (
            pokemons.map(({ name, url }) => <PokeCard key={name} name={name} url={url} />)
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">포켓몬이 없습니다.</h2>
          )}
        </div>
      </section>
      <div className="text-center">
        <button
          onClick={() => fetchPokeData(false)}
          className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
        >
          더 보기
        </button>
      </div>
    </article>
  );
}

// useEffect 의 실행 시점:
// 우선 App component 가 마운트가 된 후
// 1번인, state(상태)가 초기화가 되면서 업데이트 되고,
// 그이후에 jsx구문(2번), 그다음에 useEffect(3번) 실행
// useEffect에서 어떤 동작이 일어난 후에 그 위의 state 값을 변경하게 되면,
// 컴포넌트가 다시 렌더링이된다.

export default Test;
