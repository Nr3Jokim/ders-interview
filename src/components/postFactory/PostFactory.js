import PostCard from "../card/Card";

const PostFactory = ({posts, comments, users}) => {
    if (!posts || !comments || !users) {
        return (<div>Loading...</div>);
    }
    return posts.map((post) => {
        const userFind = users.find((user) => user.id.toString() === post.userId.toString());
        const commentsFind = comments.filter((comment) => comment.postId === post.id);
        return (
            <PostCard key={post.id} body={post.body} title={post.title} userEmail={userFind.email} userName={userFind.name}
                      comments={commentsFind}/>
        );
    })
}
export default PostFactory;
