import Card from 'react-bootstrap/Card';
import {useMemo, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import * as Types from "../../reducer/Types";
import {useDispatch} from "react-redux";
import {
    controlLikesAndDislikes,
} from "../../reducer/appSlice";
import store from "../../reducer/store";


const DownArrow = () => {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-chevron-down" viewBox="0 0 16 16">
        <path fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>)
}

const CommentCard = (comment) => {
    return (<Card className={'my-4 mx-2'}>
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
    </Card>)
}

const PostCard = ({comments, userName, userEmail, postId}) => {
    const dispatch = useDispatch()
    const postStore = store.getState().app.posts[postId - 1]
    const [showComments, setShowComments] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [likesState, setLikesState] = useState(postStore.likes);
    const [dislikesState, setDislikesState] = useState(postStore.dislikes);



    const likePost = () => {
        if (!isLiked && !isDisliked) {
            dispatch(controlLikesAndDislikes(postStore, Types.LIKE_INCREASE))
            setLikesState((likesState) => parseInt(likesState) + 1)
            setIsLiked(true);
        } else if (isLiked && !isDisliked) {
            dispatch(controlLikesAndDislikes(postStore, Types.LIKE_DECREASE))
            setLikesState((likesState) => parseInt(likesState) - 1)
            setIsLiked(false);
        }
    }

    const dislikePost = () => {
        if (!isLiked && !isDisliked) {
            dispatch(controlLikesAndDislikes(postStore, Types.DISLIKE_INCREASE))
            setDislikesState((dislikesState) => parseInt(dislikesState) + 1)
            setIsDisliked(true);
        } else if (!isLiked && isDisliked) {
            dispatch(controlLikesAndDislikes(postStore, Types.DISLIKE_DECREASE))
            setDislikesState((dislikesState) => parseInt(dislikesState) - 1)
            setIsDisliked(false);
        }
    }

    const commentList = useMemo(() => {
        if (showComments) {
            return comments.map((comment) => {
                return (<CommentCard key={comment.id} {...comment}/>)
            })
        }
    }, [showComments])
    return (<Card style={{
        maxWidth: '1200px'
    }} className={'m-2'}>
        <Card.Body>
            <Card.Title className={'text-uppercase fs-4 fw-semibold text-center m-4'}> {postStore.title} </Card.Title>
            <Card.Text className={'text-center fs-5 m-4'}> {postStore.body} </Card.Text>
            <div className={'d-flex flex-row justify-content-center align-items-center'}>
                <div className={'border border-success bg-success-subtle p-2 m-2 rounded-pill'}>
                    +{likesState}
                </div>
                <div className={'border border-danger bg-danger-subtle p-2 m-2 rounded-pill'}>
                    -{dislikesState}
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
                <Col xs={12} lg={6}
                     className={'d-none d-md-flex flex-column justify-content-center align-items-center'}>
                    <Button variant={"link"} onClick={() => setShowComments((e) => !e)}>
                        See ({comments.length}) Comments <DownArrow/>
                    </Button>
                </Col>
                <Col xs={12} lg={3} className={'sm:d-flex flex-column justify-content-center align-items-center'}>
                    <div>
                        <Button variant={"outline-success"} className={'m-2 flex-fill'}
                                style={{minWidth: '46px', minHeight: '46px'}} onClick={() => {
                            likePost()
                        }}
                                disabled={isDisliked} active={isLiked}> Like </Button>
                        <Button variant={"outline-danger"} className={'m-2 flex-fill'}
                                style={{minWidth: '46px', minHeight: '46px'}} onClick={() => dislikePost()}
                                disabled={isLiked} active={isDisliked}> Dislike </Button>
                    </div>
                </Col>
                <Col xs={12} lg={6}
                     className={'d-md-none d-sm-flex flex-column justify-content-center align-items-center'}>
                    <Button variant={"link"} onClick={() => setShowComments((e) => !e)}>
                        See ({comments.length}) Comments <DownArrow/>
                    </Button>
                </Col>
            </Row>

            <>
                {showComments && (
                    <div className={`AnimationCommentsWrapper ${showComments ? 'show' : ''}`}>
                        {commentList}
                    </div>
                )}
            </>

        </Card.Body>
    </Card>);
}

export default PostCard;