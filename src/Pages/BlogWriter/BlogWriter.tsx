import React, { useState } from 'react'
import styles from './BlogWriter.module.scss'


interface BlogWriterParams {

}

const BlogWriter = ({}:BlogWriterParams) => {

    const [blogImage, setBlogImage] = useState('')

    return (
        <section className={styles.fullscreenBlog}>
            <div className={styles.blog}>
                <div className={styles.imageContainer}>
                    {blogImage 
                    ? <img src={blogImage}></img> 
                    : <form onSubmit={(e) => {
                        e.preventDefault()
                        let link = (e.currentTarget.childNodes[0] as HTMLInputElement).value
                        if (link.match(RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/))) {
                            setBlogImage(link)
                        } else {
                            alert('please enter valid url')
                        }
                      }}>
                        <input type='text' 
                               placeholder='Paste image link'/>
                        <button>submit</button>
                      </form>}
                </div>
                <div className={styles.blogContent}>
                    <h1 className={styles.blogTitle}>blog_title</h1>
                    <p className={styles.blogText}>blog_text</p>
                </div>
            </div>
            
        </section>
    )
}


export default BlogWriter