import Layout from "../components/layout/Layout";
import {useSelector} from "react-redux";
import PostFactory from "../components/postFactory/PostFactory";
import {useMemo, useState} from "react";
import {Button, Form} from "react-bootstrap";

function Home() {

    const posts = useSelector((state) => state.app.posts);
    const users = useSelector((state) => state.app.users);
    const comments = useSelector((state) => state.app.comments);
    const [postsFiltered, setPostsFiltered] = useState([]);

    const setupFilteredPosts = (e) => {
        const filteredPosts = posts.filter((post) => {
            return post.title.includes(e.toLowerCase());
        })
        setPostsFiltered(filteredPosts);
    }

    const PostFactoryMemoized = useMemo(() => {
        if (posts.length > 0 && comments.length > 0 && users.length > 0) {
            if (postsFiltered.length > 0) {
                return <PostFactory comments={comments} posts={postsFiltered} users={users}/>
            }
            return <PostFactory comments={comments} posts={posts} users={users}/>

        }
        return (<div>Loading...</div>);
    }, [posts, comments, users, postsFiltered])

    return (
        <Layout>
            <h1>Hello, World</h1>
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured
                content or information.</p>

            <Form onSubmit={(e)=> {
                e.preventDefault();
                const value = e.target.searchForTitle.value;
                console.log(value)
                setupFilteredPosts(value)
            }}>
                <Form.Label htmlFor="searchForTitle">Title search</Form.Label>
                <Form.Control
                    type="text"
                    id="searchForTitle"
                    aria-describedby="searchForTitleHelpBlock"

                />
                <Form.Text id="searchForTitle" muted>
                   Type the title of the post you want to search for :)
                </Form.Text>
                <Button variant="outline-success" className={'m-2'} type="submit">Submit</Button>
            </Form>

            <div className={'d-flex flex-column '}>
                {PostFactoryMemoized}
            </div>
        </Layout>

    );
}

export default Home;
