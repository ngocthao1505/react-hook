import React, { useState, useEffect } from "react";
import { Row, Col, Badge, Progress, Card, Tag, Tabs, Rate } from "antd";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { KEYWORD } from "../assets/const.ts";
import facebook from "../assets/icon/facebook.png";
import instagram from "../assets/icon/instagram.jpg";
import twitter from "../assets/icon/twitter.png";
import youtube from "../assets/icon/youtube.png";
import "../../src/content.css";
const { Meta } = Card;
const { TabPane } = Tabs;

function Detail() {
  let typeFilm = "";
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const releaseDate = genReleaseDate(movieDetail["release_date"]);
  const suggestMovies = JSON.parse(localStorage.getItem("listMovie")) || [];
  const revenue = movieDetail["revenue"] ? movieDetail["revenue"].toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : "";
  useEffect(() => {
    fetch(
      KEYWORD.URL_PATH +
      "/3/movie/" +
      id +
      "?api_key=" +
      KEYWORD.API_KEY +
      "&language=en-US"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setMovieDetail(data);
      });
  }, []);

  if (movieDetail["genres"] && movieDetail["genres"].length > 0)
    movieDetail["genres"].map((item: any, index: number) => {
      if (index < movieDetail["genres"].length - 1)
        typeFilm = typeFilm + item.name + ", ";
      else typeFilm = typeFilm + item.name;
    }
    );

  return (
    <div className="divContent">
      <Row gutter={24}>
        <Col span={8}>
          <img src={KEYWORD.URL_IMG + movieDetail["backdrop_path"]} alt="" width="400" height="500" className="imgDetail"></img>
        </Col>
        <Col span={10} className="detailParent">
          <h1>{movieDetail["original_title"]}</h1>
          <div className="typeFilm">
            <label> {typeFilm} </label>
            <Badge status="success" className="runtime" />{movieDetail["runtime"]} m
          </div>
          <div>
            <Progress type="circle" percent={Math.round(movieDetail["popularity"])} width={50} />
            <img src={facebook} width={40} height={40} className="imgIcon" />
            <img src={twitter} width={40} height={40} className="imgIcon" />
            <img src={youtube} width={40} height={40} className="imgIcon" />
            <img src={instagram} width={40} height={40} className="imgIcon" />
          </div>
          <h3>Overview</h3>
          <div className="detailChild"> {movieDetail["overview"]}</div>

          <div className="detailChild"><b>Ngày phát hành: </b> {releaseDate}</div>
          <div className="detailChild"><b>Doanh thu: </b> {revenue}</div>

          <div className="detailChild"><b>Tag: </b> <Tag color="magenta">{movieDetail["tagline"]}</Tag> </div>
          <div className="detailChild"><b>Trạng thái: </b> {movieDetail["status"]}</div>
        </Col>
        <Col span={6} >
          <div>
            <h2 style={{ textAlign: "center" }}>Recommendations</h2>
            {suggestMovies && suggestMovies.length > 0 ?
              (suggestMovies as []).map((item: any, index: number) => (
                item && item["id"] !== id && index < 3 ?
                  <>
                    {/* <Link to={"/movie/" + item['id']}> */}
                    <a href={"/movie/" + item['id']}>
                      <Card
                        key={item['id']}
                        hoverable className="suggestItem"
                        style={{ width: 200 }}
                        cover={<img alt="example" src={KEYWORD.URL_IMG + item['backdrop_path']} />}
                      >
                        <Meta title={item['title']} />
                      </Card>
                    </a>
                    {/* </Link> */}
                  </>

                  : null
              ))
              : null
            }
          </div>
        </Col>
      </Row>
      <Row gutter={24} className="othersParent">
        <div className="othersContent">
          <Tabs defaultActiveKey="1" >
            <TabPane tab="Vote" key="1">
              <b>Average: </b> <Rate allowHalf value={movieDetail["vote_average"]} /> <br />
              <b>Vote: </b> {movieDetail["vote_count"]}
            </TabPane>
            <TabPane tab="Video" key="2">
              {null}
            </TabPane>
          </Tabs>
        </div>
      </Row>
    </div >
  );
}

function genReleaseDate(date: any) {
  let result = "";
  if (date) {
    const arrResult = (date + "").split("-");
    if (arrResult && arrResult.length === 3)
      result = arrResult[2] + "/" + arrResult[1] + "/" + arrResult[0];
  }
  return result;
}
export default Detail;
