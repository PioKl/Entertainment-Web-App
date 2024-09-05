export const endpoints: {
  trendingMovies: string;
  popularMovies: string;
  genreMovies: string;
  genreMoviesCategory: string;
  trendingTv: string;
  popularTv: string;
  genreTv: string;
} = {
  trendingMovies: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  popularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  genreMovies: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  genreMoviesCategory: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&with_genres={id}&language=en-US&sort_by=popularity.desc`,
  trendingTv: `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  popularTv: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  genreTv: `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
};
