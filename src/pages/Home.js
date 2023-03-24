import Layout from "../components/layout/Layout";
import {useSelector} from "react-redux";


function Home() {

    const posts = useSelector((state) => state.app.posts);
    const users = useSelector((state) => state.app.users);
    const comments = useSelector((state) => state.app.comments);

    console.log(posts, users, comments);


    return (
        <Layout>
            <h1>Hello, World</h1>
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        </Layout>

    );
}

export default Home;
