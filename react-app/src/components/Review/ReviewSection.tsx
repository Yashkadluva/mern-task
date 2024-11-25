import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "./ReviewSection.scss";
import WebService from "../../utility/WebService";

const ReviewSection = () => {
    const [reviewList, setReviewList] = useState<any[]>([]);
    useEffect(() => {
        getReviewList();
    }, []);

    const getReviewList = () => {
        WebService.getAPI({ action: 'get/review/list' })
            .then((res: any) => {
                if (res.list && res.list.length) {
                    let temp: any[] = group(res.list, 3);
                    setReviewList(temp);
                } else {
                    setReviewList([]);
                }
            }).catch(() => { console.log("Error"); });
    };

    const group = (array: any[], n: number) =>
        [...Array(Math.ceil(array.length / n))]
            .map((el, i) => array.slice(i * n, (i + 1) * n));



    return (
        <div className="tutorial-carousel">
            <h6 className="carousel-subtitle">Quality Features</h6>
            <h2 className="carousel-title">Tutorials that people love most</h2>
            <Carousel slide indicators controls interval={null}>
                {
                    reviewList && reviewList.length > 0 && reviewList.map((item: any[], index: number) => {
                        return (
                            <Carousel.Item>
                                <div className="carousel-item-content">
                                    {
                                        item && item.length > 0 && item.map((res: any, i: number) => {
                                            return (
                                                <div className="card">
                                                    <img src={res.image} className="card-img-top" alt="Prototype design" />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{res.title}</h5>
                                                        <p className="card-text">
                                                            ⭐ {res.ratting} ({res.total_review} reviews) <br />
                                                            📖 {res.student_watch} students watched
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </div>
    );
};

export default ReviewSection;
