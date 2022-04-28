import { Input } from 'antd';
const { Search } = Input;

function onSearch(value: any, moviesList: any) {
    let result = [];
    if (value && value.trim().length > 0 && moviesList && moviesList.length > 0) {
        moviesList.map((e) => {
            if ((e['title'] + '').indexOf(value.trim()) > -1)
                result.push(e);
        });
    }
    return result;
}

function CarouselSlide({ moviesList }) {

    return (
        <div
            style={{
                height: '360px',
                lineHeight: '360px',
                textAlign: 'center',
                background: '#364d79',
            }}>
            <div>
                <h1 style={{ color: 'white', fontWeight: 'bold' }}>Welcome. Millions of movies, TV shows and people to discover. Explore now.</h1>
                <Search
                    style={{ marginTop: "-150px", width: "1400px", borderRadius: "5px" }}
                    placeholder="Search for a movie"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={(value) => onSearch(value, moviesList)}
                />
            </div>
        </div>
    );
}

export default CarouselSlide;