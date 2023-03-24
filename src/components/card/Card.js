import Card from 'react-bootstrap/Card';
import {useMemo, useState} from "react";

function PostCard({title, body, comments, user}) {
    const [showComments, setShowComments] = useState(false);
    const commentList = useMemo(() => {
        if (showComments) {
            return comments.map((comment) => {
                return (
                    <>
                        <Card.Subtitle key={comment.id}> {comment.email} </Card.Subtitle>
                        <Card.Text key={comment.id}>
                            {comment.body}
                        </Card.Text>
                    </>
                )
            })
        }
    }, [showComments])
    return (
        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {body}
                </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{user}</Card.Subtitle>
                <button onClick={() => setShowComments((e) => !e)}>Show Comments</button>
                {showComments && <>
                    {commentList}
                </>}

            </Card.Body>
        </Card>
    );
}

export default PostCard;