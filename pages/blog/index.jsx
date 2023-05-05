import Article from "@/components/Article";
import Layout from "@/components/Layout";
import { usePosts } from "@/hooks/usePosts";

const Blog = () => {
    const { data } = usePosts()
    return (
        <>
            <Layout>
                {
                    data?.map((datas, index) => {
                        return (
                            <Article key={index} datas={datas} />
                        )
                    })
                }
            </Layout>
        </>
    )
}

export default Blog