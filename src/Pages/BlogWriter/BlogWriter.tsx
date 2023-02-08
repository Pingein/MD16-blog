import React, { useRef, useState } from 'react'
import styles from './BlogWriter.module.scss'


interface BlogWriterParams {

}

const BlogWriter = ({}:BlogWriterParams) => {

    const [blogImage, setBlogImage] = useState('')

    const titleRef = useRef<HTMLInputElement>(null)
    const excerptRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)

    return (
        <section className={styles.fullscreenBlog}>
            <div className={styles.blog}>
                <div className={styles.imageContainer}>
                    {blogImage 
                    ? <img src={blogImage} className={styles.image}></img> 
                    : <form className={styles.blogContent} 
                            onSubmit={(e) => {
                                e.preventDefault()
                                let link = (e.currentTarget.childNodes[0] as HTMLInputElement).value
                                if (link.match(RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/))) {
                                    setBlogImage(link)
                                } else {
                                    alert('please enter valid url')
                                }
                            }}>
                        <input type='text' 
                               placeholder='Paste image link'
                               className={styles.input}/>
                        <button className={styles.btn}>
                            submit
                        </button>
                      </form>}
                </div>
                <form className={styles.blogContent}
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (titleRef && excerptRef && contentRef) {
                            
                        }
                      }}>
                    <input type="text" 
                           placeholder='Enter blog title'
                           className={styles.input}
                           ref={titleRef}/>
                    <input type="text" 
                           placeholder='Enter blog excerpt'
                           className={styles.input}
                           ref={excerptRef}/>      
                    <textarea placeholder='Enter blog text'
                              className={styles.input}
                              ref={contentRef}>
                    </textarea>

                    <button className={styles.btn}>
                        Post
                    </button>
                </form>
            </div>
            
        </section>
    )
}


export default BlogWriter