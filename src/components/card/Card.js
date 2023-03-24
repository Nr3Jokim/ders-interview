import Card from 'react-bootstrap/Card';
import {useMemo, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const DownArrow = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
    )
}

const CommentCard = (comment) => {
    return (
        <Card className={'my-4 mx-2'}>
            <Card.Header>{comment.name}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p className={'fs-5'}>
                        {comment.body}
                    </p>
                    <footer className="blockquote-footer">
                        <p className={'fs-6'}> {comment.email}</p>
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
    )
}

const PostCard = ({title, body, comments, userName, userEmail}) => {
    const [showComments, setShowComments] = useState(false);
    const [likes, setLikes] = useState(getRandomArbitrary(0, 20).toFixed(0));
    const [dislikes, setDislikes] = useState(getRandomArbitrary(0, 20).toFixed(0));
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const likePost = () => {
        if (!isLiked && !isDisliked) {
            setLikes((e) => parseInt(e) + 1);
            setIsLiked(true);
        } else if (isLiked && !isDisliked) {
            setLikes((e) => parseInt(e) - 1);
            setIsLiked(false);
        }
    }

    const dislikePost = () => {
        if (!isLiked && !isDisliked) {
            setDislikes((e) => parseInt(e) + 1);
            setIsDisliked(true);
        } else if (!isLiked && isDisliked) {
            setDislikes((e) => parseInt(e) - 1);
            setIsDisliked(false);
        }
    }

    const commentList = useMemo(() => {
        if (showComments) {
            return comments.map((comment) => {
                return (
                    <CommentCard key={comment.id} {...comment}/>
                )
            })
        }
    }, [showComments])
    return (
        <Card style={{
            maxWidth: '1200px'
        }}>
            <Card.Body classname='d-flex text-center'>
                <Card.Title className={'text-uppercase fs-4 fw-semibold text-center'}> {title} </Card.Title>
                <Card.Text className={'text-center fs-5 mx-4'}> {body} </Card.Text>
                <div className={'d-flex flex-row justify-content-center align-items-center'}>
                    <div className={'border border-success bg-success-subtle p-2 m-2 rounded-pill'}>
                        +{likes}
                    </div>
                    <div className={'border border-danger bg-danger-subtle p-2 m-2 rounded-pill'}>
                        -{dislikes}
                    </div>
                </div>
                <Row className={'text-center'}>
                    <Col xs={12} lg={3} className={'d-flex flex-column justify-content-center align-items-center'}>
                        <figure className={'p-0 m-0'}>
                            <blockquote className="blockquote">
                                <p>{userName}</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                @{userEmail}
                            </figcaption>
                        </figure>
                    </Col>
                    <Col xs={12} lg={6} className={'d-flex flex-column justify-content-center align-items-center'}>
                        <Button variant={"link"} onClick={() => setShowComments((e) => !e)}>
                            See ({comments.length}) Comments <DownArrow/>
                        </Button>
                    </Col>
                    <Col xs={12} lg={3} className={'d-flex flex-column justify-content-center align-items-center'}>
                        <div>
                            <Button variant={"outline-success"} className={'m-2'} onClick={()=>likePost()} disabled={isDisliked} active={isLiked}> Like </Button>
                            <Button variant={"outline-danger"} className={'m-2'} onClick={()=>dislikePost()} disabled={isLiked} active={isDisliked}> Dislike </Button>
                        </div>
                    </Col>
                </Row>

                {showComments && <>
                    {commentList}
                </>}

            </Card.Body>
        </Card>
    );
}

export default PostCard;