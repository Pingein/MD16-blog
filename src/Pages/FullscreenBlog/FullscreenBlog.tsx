import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentField, { AddCommentField } from '../../assets/CommentField/CommentField'
import { generateId, randInt } from '../../assets/helper'
import { Comment, BlogData } from '../../assets/types'
import { queryClient } from '../../main'
import styles from './FullscreenBlog.module.scss'


const FullscreenBlog = () => {
    const {blogId} = useParams()

    const blogQuery = useQuery({
        queryKey: [`blog${blogId}`],
        queryFn: () => axios.get(`http://localhost:3000/blogs/${blogId}`)
                            .then(({data}) => data as BlogData),
    })

    const blogMutation = useMutation({
        mutationFn: (updatedBlog:BlogData) => axios.patch(`http://localhost:3000/blogs/${blogId}`, updatedBlog),
        onSuccess: () => queryClient.invalidateQueries([`blog${blogId}`])
    })


    if (blogQuery.isLoading) {
        return <h1>Loading...</h1>
    }
    if (blogQuery.isError) {
        return <h1>Error</h1>
    }


    const {image_url, title, excerpt, content, comments} = blogQuery.data


    const pfp = `https://picsum.photos/id/${randInt(0,500)}/200`


    return (
        <section className={styles.fullscreenBlog}>
            <div className={styles.blog}>
                <div className={styles.imageContainer}>
                    <img src={image_url} className={styles.image} />
                </div>
                <div className={styles.blogContent}>
                    <h1 className={styles.blogTitle}>{title}</h1>
                    <p className={styles.blogText}>{content}</p>
                </div>
            </div>


            <div className={styles.comments}>
                <AddCommentField commentator_name={''}
                                 commentator_image_url={pfp}
                                 onSubmit={(e) => {
                                    e.preventDefault()
                                    let newCommentEl = (e.currentTarget.childNodes[1].childNodes[1].childNodes[0] as HTMLInputElement)
                                    let newCommentNameEl = (e.currentTarget.childNodes[1].childNodes[0].childNodes[0] as HTMLInputElement)

                                    if (newCommentEl.value && newCommentNameEl.value) {
                                        blogMutation.mutate({
                                            ...blogQuery.data,
                                            comments: [...comments, {
                                                id: generateId(),
                                                comment: newCommentEl.value,
                                                commentator_image_url: pfp,
                                                commentator_name: newCommentNameEl.value
                                            }]
                                        })
                                        newCommentEl.value = ''
                                    }
                                 }}/>

                <span>Comments ({comments.length})</span>
                {comments.map(comment => {
                    return <CommentField commentator_image_url={comment.commentator_image_url}
                                         commentator_name={comment.commentator_name}
                                         comment={comment.comment}

                                         deleteHandler={() => {
                                            if (confirm(`this will delete comment '${comment.comment}' by '${comment.commentator_name}'`)) {
                                                blogMutation.mutate({
                                                    ...blogQuery.data,
                                                    comments: comments.filter(existingComment => existingComment.id != comment.id)
                                                })
                                            }
                                         }}

                                         editHandler={() => {
                                            let editedComment = prompt('enter new comment', comment.comment)
                                            if (editedComment) {
                                                blogMutation.mutate({
                                                    ...blogQuery.data,
                                                    comments: comments.map(existingComment => {
                                                        return (existingComment.id == comment.id 
                                                                ? {...existingComment, comment:editedComment+''} 
                                                                : existingComment)
                                                    })
                                                })
                                            }
                                         }}/>
                })}
            </div>
        </section>
    )
}


export default FullscreenBlog