
import { Card, Col, Row } from 'antd';
import { Pagination } from 'antd';
import '../../src/content.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { KEYWORD } from '../assets/const.ts';

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
                console.log('data', data)
                setMoviesList(data)
            });
    }, [moviesList]);

    const hasData = moviesList && moviesList['results'] && moviesList['results'].length ? true : false;
    const total = moviesList && moviesList['results'] && moviesList['results'].length ? moviesList['results'].length : 0;
    return (
        <div className="dataContent">
            <div className="site-card-wrapper">
                <Row gutter={16}> <h1 className='typeMovie'>{moviesList && moviesList['name'] ? moviesList['name'] : ''}</h1> </Row>
                <Row gutter={16}>
                    {
                        hasData === true ?
                            (moviesList['results'] as []).map(e => (
                                <Col span={4}>
                                    <a href={KEYWORD.URL_PATH + '/3/movie/' + e['id'] + '?api_key=' + KEYWORD.API_KEY + '&language=en-US'}>
                                        <Card
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={KEYWORD.URL_IMG + e['poster_path']} />}
                                        >
                                            <Meta title={e['title']} description={genDescription(e['overview'])} />
                                        </Card>
                                    </a>
                                </Col>
                            )
                            ) : null
                    }

                </Row>
                <Pagination defaultCurrent={1} total={total} className="Pagination" disabled={hasData === true ? false : true} onChange={onChange} />
                <div style={{ height: "50px" }}></div>
            </div>

        </div>
    );
}

export default Content;