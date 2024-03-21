import { fetchAnimeById } from "@/app/action";
import Image from "next/image";
import Link from "next/link";

async function Anime({ params }: any) {
  const { id } = params;
  const anime = await fetchAnimeById(id);

  return (
    <>
      <div className="grid grid-rows-1 grid-flow-col gap-4 p-10 mx-10 w-full">
        <div className="row-span-3 h-[10vh]">
          <div className="relative w-full">
            <Image
              src={`https://shikimori.one${anime.image.original}`}
              alt={anime.name}
              width={275}
              height={200}
            />
          </div>
        </div>
        <div className="col-span-2 mx-10">
          <Link href={`https://shikimori.one${anime.url}`} target="_blank">
            <h4 className="text-2xl">
              {anime.name}{" "}
              <small className="text-xs align-center">({anime.score})</small>
            </h4>
          </Link>

          <span className="">
            <div>
              <small>Released On: {anime.released_on}</small>
            </div>

            <div className="">
              <small>Genres: </small>
              {anime.genres.map((genre: any, index: number) => (
                <small key={index}>
                  {genre.name}
                  {index <= anime.genres.length - 2 ? ", " : null}
                </small>
              ))}
            </div>
            <div>
              <small>Episodes: {anime.episodes}</small>
            </div>
          </span>

          <p className="mt-10">{anime.description}</p>
        </div>
      </div>
      <br />
      <h4 className="font-bold text-2xl px-10">Videos</h4>
      <div className="grid grid-cols-3 gap-10 p-12">
        {anime.videos.map((video: any, index: number) => (
          <iframe
            src={video.player_url}
            allowFullScreen
            style={{ height: "315px", width: "400px" }}
            key={index}
          ></iframe>
        ))}
      </div>
      <h4 className="font-bold text-2xl px-10">Screenshots</h4>
      <div className="grid grid-cols-3 gap-10 p-12">
        {anime.screenshots.map((screenshot: any, index: number) => (
          <Image
            src={`https://shikimori.one${screenshot.preview}`}
            alt="img"
            width={1000}
            height={1000}
            key={index}
          ></Image>
        ))}
      </div>
    </>
  );
}

export default Anime;
