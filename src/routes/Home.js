import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css'

class Home extends React.Component{
    state = {
      isLoading: true,
      movies: [],
    };

    getMovies = async () =>{ // async는 함수가 비동기라고 자바스크립트에게 전달하는 것
      const {
        data: {
          data: { movies },
        },
      } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating'); //axios.get()의 실행 완료를 기다렸다가 끝나면 계속 진행
      this.setState({ movies , isLoading:false});
    }

    componentDidMount(){
      // 영화 데이터 로딩!
      this.getMovies();
    }

    render(){
      const {isLoading, movies} = this.state;
      return (
        <section className="container">
              { isLoading  ? ( 
                <div className="loader">
                    <span className="loader__text">Loading...</span>
                </div> 
                ) : (
                  <div className="movies">
                    {
                      movies.map((movie) => {
                        return (
                          <Movie
                            key={movie.id}
                            id={movie.id}
                            year={movie.year}
                            title={movie.title}
                            summary={movie.summary}
                            poster={movie.medium_cover_image}
                            genres={movie.genres}
                          />
                        )
                      })
                    }
                  </div>
                )}             
        </section>
      );
    }
}

export default Home;
