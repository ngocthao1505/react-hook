import { Input } from 'antd';
const { Search } = Input;

function onSearch(value: any) {
    if (value && value.trim().length > 0)
    return value;
}

function CarouselSlide() {
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
                    onSearch={onSearch}
                />
            </div>
        </div>
    );
}

export default CarouselSlide;