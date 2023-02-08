import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import BlogPreview from '../../assets/BlogPreview/BlogPreview'
import { BlogData } from '../../assets/types'
import styles from './Blog.module.scss'


interface BlogParams {

}

const Blog = ({}:BlogParams) => {

    const blogQuery = useQuery({
        queryKey: ['blogs'],
        queryFn: () => axios.get('http://localhost:3000/blogs').then(({data}) => data as BlogData[]),
    })

    if (blogQuery.isLoading) {
        return <h1>Loading...</h1>
    }
    if (blogQuery.isError) {
        return <h1>Error <pre>{JSON.stringify(blogQuery.error)}</pre></h1>
    }

    return (

        <section className={styles.blogSection}>
            <Outlet/>
            <div className={styles.blogEntries}>

                {blogQuery.data.map(data => {
                    return <BlogPreview id={data.id}
                                        title={data.title}
                                        image={data.image_url}
                                        excerpt={data.excerpt}/>
                })}
            </div>
        </section>
    )
}


export default Blog