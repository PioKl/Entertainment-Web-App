export const endpoints: {
  popularMovies: string;
  trendingMovies: string;
} = {
  trendingMovies: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  popularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
};
