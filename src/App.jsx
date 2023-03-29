import { useCallback, useMemo, useState } from "react";

// Assets
import logoIcon from "./assets/logo.png";

// Componenst
import {
  Home2,
  Message,
  Airdrop,
  Microphone2,
  Music,
  Folder,
  SearchNormal1,
  Eraser,
  More,
  MusicFilter,
} from "iconsax-react";
import { AlbumCard, AudioPlayer } from "./components";

// Hooks
import { useSearch } from "./hooks";

// API
const API = "https://deezerdevs-deezer.p.rapidapi.com";

function App() {
  // API Hooks
  const { data, value, handleChange } = useSearch(API + "/search");

  // States
  const [trackInfo, setTrackInfo] = useState();

  // Memos
  const ttIndex = useMemo(() => {
    if (data?.length && trackInfo) {
      return data.findIndex((i) => i?.id === trackInfo?.id);
    }
    return 0;
  }, [data, trackInfo]);

  const filtered = useMemo(() => {
    const albums = {};

    if (data?.length) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const { album } = element;
        const pre = albums[album.title] || [];

        if (pre.length) {
          albums[album.title] = [...pre, element];
        } else {
          albums[album.title] = [element];
        }
        console.log({ element, pre });
      }
    }
    return Object.values(albums);
  }, [data]);

  // Handlers
  const handleNext = useCallback(() => {
    if (ttIndex >= data?.length - 1) {
      setTrackInfo(data[0]);
    } else {
      setTrackInfo(data[ttIndex + 1]);
    }
  }, [data, ttIndex]);

  const handleBack = useCallback(() => {
    if (ttIndex <= 0) {
      setTrackInfo(data[0]);
    } else {
      setTrackInfo(data[ttIndex - 1]);
    }
  }, [data, ttIndex]);

  return (
    <div className="fixed inset-0 flex bg-primary">
      <aside className="w-16 h-full py-4 px-2 flex flex-col items-center bg-primary border-r-[1px] border-gray-800">
        <img src={logoIcon} className="w-16" alt="logo" />
        <nav className="text-white space-y-8 mt-6 w-16 flex flex-col items-center">
          <Home2 />
          <Airdrop />
          <Music />
          <Microphone2 />
          <Message />
          <Folder />
        </nav>
      </aside>
      <main className="flex flex-col viewport">
        <header className="w-full">
          <div className="border-b-[1px] border-gray-800 text-white flex items-center">
            <input
              className="bg-transparent px-4 py-6 w-full text-white flex"
              type="text"
              placeholder="Buscar"
              value={value}
              onChange={(event) => handleChange(event.target.value)}
            />
            <div className="flex items-center space-x-6 px-6">
              <div className="">
                {value.length ? (
                  <button className="mt-2" onClick={() => handleChange("")}>
                    <Eraser size={20} />
                  </button>
                ) : (
                  <SearchNormal1 size={20} />
                )}
              </div>
              <div className="">
                <More className="rotate-90" size={20} />
              </div>
            </div>
          </div>
        </header>

        {!value.length ? (
          <div className="text-white mt-24 flex flex-col items-center justify-center px-8">
            <div className="my-4">
              <MusicFilter size={80} />
            </div>
            <p className="text-center">
              Busca tu música favorita en Foxbel Music ahora mismo.
              <br /> <strong>¡Disfrútala al instante!</strong>
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto pb-24 pt-8 md:px-8">
            {filtered?.length &&
              filtered.map((group, x) => (
                <div className="mb-4">
                  <h2 className="text-white pl-4 md:pl-0 py-2 font-bold text-base overflow-hidden w-full">
                    {group[0].album.title}
                  </h2>
                  <div
                    key={x}
                    className="flex pr-2 box-border w-full overflow-x-auto px-4 scrollbar-hide lg:left-0 lg:w-full lg:px-0"
                  >
                    <div className="block whitespace-nowrap">
                      {group.map((track, y) => (
                        <AlbumCard
                          key={y}
                          onClick={() => {
                            setTrackInfo(track);
                          }}
                          img={track.album.cover_big}
                          title={track.title_short}
                          author={track.artist.name}
                          album={track.album.title}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
      {trackInfo && (
        <AudioPlayer
          trackInfo={trackInfo}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;
