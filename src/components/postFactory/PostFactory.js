import PostCard from "../card/Card";
import {Spinner} from "react-bootstrap";

const PostFactory = ({posts, comments, users}) => {
    if (!posts || !comments || !users) {
        return (<Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>);
    }
    return posts.map((post) => {
        const userFind = users.find((user) => user.id.toString() === post.userId.toString());
        const commentsFind = comments.filter((comment) => comment.postId === post.id);
        return (
            <PostCard key={post.id} body={post.body} title={post.title} userEmail={userFind.email}
                      userName={userFind.name}
                      comments={commentsFind}/>
        );
    })
}
export default PostFactory;
