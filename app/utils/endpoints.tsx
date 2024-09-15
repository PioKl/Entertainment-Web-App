export const endpoints: {
  trendingMovies: string;
  popularMovies: string;
  genreMovies: string;
  genreMoviesCategory: string;
  trendingTv: string;
  popularTv: string;
  genreTv: string;
  genreTvCategory: string;
} = {
  trendingMovies: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  popularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  genreMovies: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  genreMoviesCategory: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&with_genres={id}&language=en-US&sort_by=popularity.desc`,
  trendingTv: `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  popularTv: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  genreTv: `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  genreTvCategory: `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&with_genres={id}&language=en-US&sort_by=popularity.desc`,
};

//Search All (Movies, TV)
export function getSearchAll(query: string, page: string) {
  return `https://api.themoviedb.org/3/search/multi?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
  }&query=${encodeURIComponent(query)}&page=${page}`;
}

//Movies
export function getSearchMovies(query: string, page: string) {
  return `https://api.themoviedb.org/3/search/movie?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
  }&query=${encodeURIComponent(query)}&page=${page}`;
}

export function getGenreMoviesByCategoryWithPage(id: string, page: string) {
  return `https://api.themoviedb.org/3/discover/movie?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
  }&include_adult=false&with_genres=${encodeURIComponent(
    id
  )}}&language=en-US&sort_by=popularity.desc&page=${page}`;
}

export function getTrendingMovies(page: string) {
  return `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`;
}

export function getPopularMovies(page: string) {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;
}

export function getMovie(id: string) {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
}

export function getMovieCredits(id: string) {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
}

//TV

export function getSearchTv(query: string, page: string) {
  return `https://api.themoviedb.org/3/search/tv?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
  }&query=${encodeURIComponent(query)}&page=${page}`;
}

export function getGenreTvByCategoryWithPage(id: string, page: string) {
  return `https://api.themoviedb.org/3/discover/tv?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
  }&include_adult=false&with_genres=${encodeURIComponent(
    id
  )}&language=en-US&sort_by=popularity.desc&page=${page}`;
}

export function getTrendingTv(page: string) {
  return `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`;
}

export function getPopularTv(page: string) {
  return `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;
}

export function getTv(id: string) {
  return `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
}

export function getTvCredits(id: string) {
  return `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
}
