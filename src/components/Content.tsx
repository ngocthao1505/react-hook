
import { Card, Col, Row } from 'antd';
import { Pagination } from 'antd';
import '../../src/content.css';
import React, { useState } from 'react';
import { useEffect } from 'react';

const { Meta } = Card;


function Content() {
const [count, setCount] = useState(0);
useEffect(  () =>{
    //fetch('https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US')
    fetch('http://example.com/movies.json')
    .then(response => response.json())
    .then(data => console.log(data));
});

    
    return (
        <div className="dataContent">
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={4}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                </Row>
            </div>

            <Pagination defaultCurrent={1} total={50}  className="Pagination"/>
        </div>
    );
}

export default Content;