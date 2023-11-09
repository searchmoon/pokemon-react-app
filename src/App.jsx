import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokeCard from "./components/PokeCard";

function App() {
  const [pokeData, setPokeData] = useState([]); //1

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0`;

  useEffect(() => {
    fetchPokeData();
  }, []); //3

  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response.data.results);
      setPokeData(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    //2
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50"></header>
      <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl ">
          {pokeData.length > 0 ? (
            pokeData.map(({ name, url }) => <PokeCard key={name} name={name} url={url} />)
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">포켓몬이 없습니다.</h2>
          )}
        </div>
      </section>
    </article>
  );
}

// useEffect 의 실행 시점:
// 우선 App component 가 마운트가 된 후
// 1번인, state(상태)가 초기화가 되면서 업데이트 되고,
// 그이후에 jsx구문(2번), 그다음에 useEffect(3번) 실행
// useEffect에서 어떤 동작이 일어난 후에 그 위의 state 값을 변경하게 되면,
// 컴포넌트가 다시 렌더링이된다.

export default App;
