export const endpoints: {
  trendingMovies: string;
  popularMovies: string;
  trendingTv: string;
  popularTv: string;
} = {
  trendingMovies: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  popularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  trendingTv: `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  popularTv: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
};
