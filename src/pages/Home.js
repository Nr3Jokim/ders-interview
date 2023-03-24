import Layout from "../components/layout/Layout";
import {useSelector} from "react-redux";
import PostCard from "../components/card/Card";

function Home() {

    const posts = useSelector((state) => state.app.posts);
    const users = useSelector((state) => state.app.users);
    const comments = useSelector((state) => state.app.comments);

    console.log(posts, users, comments);


    return (
        <Layout>
            <h1>Hello, World</h1>
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>

            <div className={'d-flex flex-column '}>
                {posts.length > 0 && users.length > 0 && comments.length > 0 && <PostCard body={posts[1].body} title={posts[1].title} user={users[1]} comments={[comments[1], comments[2], comments[3]]} /> }
            </div>

        </Layout>

    );
}

export default Home;
