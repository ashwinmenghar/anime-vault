"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import page from "./page";
import Link from "next/link";

export const fetchAnime = async (page: number) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  );
  const data = await response.json();
  return data.map((item: AnimeProp, index: number) => (
    <div key={index}>
      <Link href={`/${convertToSlug(item.name)}/${item.id}`}>
        <AnimeCard key={item.id} anime={item} index={index} />
      </Link>
    </div>
  ));
};

export const fetchAnimeById = async (id: number) => {
  const response = await fetch(`https://shikimori.one/api/animes/${id}`);
  const data = await response.json();
  return data;
};

function convertToSlug(Text: string) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
