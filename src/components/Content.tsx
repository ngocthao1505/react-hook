
import { Card, Col, Row, Tooltip, Divider } from 'antd';
import { Link } from "react-router-dom";
import { Pagination } from 'antd';
import '../../src/content.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { KEYWORD } from '../assets/const.ts';
import { Input } from 'antd';
const { Search } = Input;
const { Meta } = Card;

function genDescription(value: string) {
    const strLength = 20;
    if (value && value.trim.length > strLength)
        return (value + '').slice(0, strLength - 3);
}

function Content() {
    const sizePage = 6;
    const [moviesList, setMoviesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);
    const [textSearch, setTextSearch] = useState("");

    useEffect(() => {
        fetch(KEYWORD.URL_PATH + '/4/list/1?page=1&api_key=' + KEYWORD.API_KEY)
            .then(response => response.json())
            .then(data => {
                const movieAll = (data['results'] as []).length;
                let result = data['results'];

                if (movieAll > sizePage) {
                    const firstItem = (currentPage - 1) * sizePage;
                    const lastItem = sizePage * currentPage;
                    result = (data['results'] as []).filter((e: any, index: number) => { return index >= firstItem && index < lastItem });
                }
                setMoviesList(result);
                setTotalMovies(movieAll);
                localStorage.setItem("listMovie", JSON.stringify(data['results']));
            });
    }, []);

    const onSearch = (value: any) => {
        let result = [];
        let filterMovie = [];
        const allMovies = JSON.parse(localStorage.getItem("listMovie")) || [];
        setCurrentPage(1);

        if (value && value.trim().length > 0 && allMovies && allMovies.length > 0) {
            setTextSearch(value.trim());
            //search for keyword
            result = allMovies.filter((e: any) => { return (e['title'] + '').toLowerCase().indexOf(value.trim().toLowerCase()) > -1 });
            if (result.length > sizePage) {
                //show with pagination
                const firstItem = (currentPage - 1) * sizePage;
                const lastItem = sizePage * currentPage;
                filterMovie = (result as []).filter((e: any, index: number) => { return index >= firstItem && index < lastItem });
            }
            else filterMovie = result;
        }

        setMoviesList(filterMovie);
        setTotalMovies(result.length);

    }

    const onChange = (value: any) => {
        let result = [];
        let filterMovie = [];
        const allMovies = JSON.parse(localStorage.getItem("listMovie")) || [];
        setCurrentPage(value);
        if (allMovies && allMovies.length > 0) {
            //search for keyword
            if (textSearch)
                result = allMovies.filter((e: any) => { return (e['title'] + '').toLowerCase().indexOf(textSearch.trim().toLowerCase()) > -1 });
            else result = allMovies;

            if (result.length > sizePage) {
                //show with pagination
                const firstItem = (value - 1) * sizePage;
                const lastItem = sizePage * value;
                filterMovie = (result as []).filter((e: any, index: number) => { return index >= firstItem && index < lastItem });
            }
            else filterMovie = result;
        }

        setMoviesList(filterMovie);
        setTotalMovies(result.length);
    }

    return (

        <>
            {/* <Carousel moviesList={hasData === true ? moviesList['results'] : []} /> */}
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
                        defaultValue={textSearch}
                        onSearch={onSearch}
                    />
                </div>
            </div>
            <div className="dataContent">
                <div className="site-card-wrapper">
                    <Row gutter={16}> <h1 className='typeMovie'>{moviesList && moviesList['name'] ? moviesList['name'] : ''}</h1> </Row>
                    <Row gutter={16}>
                        <Divider orientation="right" plain><h3>Có {totalMovies} kết quả tìm kiếm</h3></Divider>
                        {
                            (moviesList as []).map(e => (
                                <Col span={4}>
                                    <Link to={"/movie/" + e['id']}>
                                        <Card
                                            key={e['id']}
                                            hoverable
                                            style={{ width: 200 }}
                                            cover={<img alt="example" src={KEYWORD.URL_IMG + e['poster_path']} />}
                                        >
                                            <Tooltip placement="bottom" title={e['title']}>
                                                <Meta title={e['title']} description={genDescription(e['overview'])} />
                                            </Tooltip>

                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        }

                    </Row>
                    <Pagination defaultCurrent={1} total={totalMovies} pageSize={6} className="Pagination" disabled={moviesList && moviesList.length > 0 ? false : true} onChange={onChange} />
                    <div style={{ height: "50px" }}></div>
                </div>

            </div>
        </>
    );
}

export default Content;