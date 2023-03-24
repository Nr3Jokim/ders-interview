import Layout from "../components/layout/Layout";
import {useSelector} from "react-redux";
import PostFactory from "../components/postFactory/PostFactory";
import {useMemo} from "react";

function Home() {

    const posts = useSelector((state) => state.app.posts);
    const users = useSelector((state) => state.app.users);
    const comments = useSelector((state) => state.app.comments);

    const PostFactoryMemoized = useMemo(() => {
        if (posts.length > 0 && comments.length > 0 && users.length > 0) {
            console.log('PostFactoryMemoized');
            return <PostFactory comments={comments} posts={posts} users={users}/>
        }
        console.log('Failed to load Memoized');
        return (<div>Loading...</div>);
    }, [posts, comments, users])

    return (
        <Layout>
            <h1>Hello, World</h1>
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured
                content or information.</p>
            <div className={'d-flex flex-column '}>
                {PostFactoryMemoized}
            </div>
        </Layout>

    );
}

export default Home;
