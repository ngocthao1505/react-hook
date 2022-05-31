
import { Card, Col, Row } from 'antd';
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

function onChange(value: any) {
    console.log('onChange', value)
}

function Content() {
    const [moviesList, setMoviesList] = useState([]);
    useEffect(() => {
        fetch(KEYWORD.URL_PATH + '/4/list/1?page=1&api_key=' + KEYWORD.API_KEY)
            .then(response => response.json())
            .then(data => {
                setMoviesList(data['results']);
                localStorage.setItem("listMovie", JSON.stringify(data['results']));
            });
    }, []);

    const hasData = moviesList && moviesList.length ? true : false;
    const total = moviesList && moviesList.length ? moviesList.length : 0;

    const onSearch = (value: any,) => {
        let result = [];
        if (value && value.trim().length > 0 && hasData === true) {
            moviesList.map((e) => {
                if ((e['title'] + '').toLowerCase().indexOf(value.trim().toLowerCase()) > -1)
                    result.push(e);
            });

        }
        setMoviesList(result)

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
                        onSearch={onSearch}
                    />
                </div>
            </div>
            <div className="dataContent">
                <div className="site-card-wrapper">
                    <Row gutter={16}> <h1 className='typeMovie'>{moviesList && moviesList['name'] ? moviesList['name'] : ''}</h1> </Row>
                    <Row gutter={16}>
                        {
                            hasData === true ?
                                (moviesList as []).map(e => (
                                    <Col span={4}>
                                        <Link to={"/movie/" + e['id']}>
                                            <Card
                                                key={e['id']}
                                                hoverable
                                                style={{ width: 200 }}
                                                cover={<img alt="example" src={KEYWORD.URL_IMG + e['poster_path']} />}
                                            >
                                                <Meta title={e['title']} description={genDescription(e['overview'])} />
                                            </Card>
                                        </Link>
                                    </Col>
                                )
                                ) : null
                        }

                    </Row>
                    <Pagination defaultCurrent={1} total={total} pageSize={10} className="Pagination" disabled={hasData === true ? false : true} onChange={onChange} />
                    <div style={{ height: "50px" }}></div>
                </div>

            </div>
        </>
    );
}

export default Content;