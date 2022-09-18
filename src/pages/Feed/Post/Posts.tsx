import '../../../styles/Posts.css'
import '../../../styles/utilities.css'

import type { CollectionReference } from 'firebase/firestore'

import { query, orderBy, onSnapshot, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { firebaseDb } from '../../../library/firebase'
import { Post } from './Post'

type Post = {
  image: string
  postId: string
  caption: string
  username: string
  userImage: string
  postUserId: string
}

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const postsCollectionReference = collection(
    firebaseDb,
    'posts'
  ) as CollectionReference<Post>

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(postsCollectionReference, orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
        )
      }
    )

    return () => {
      unsubscribe()
    }
  }, [firebaseDb])

  return (
    <div className="posts">
      {posts.map(
        ({ username, userImage, caption, image, postId, postUserId }) => {
          return (
            <Post
              key={postId}
              image={image}
              postId={postId}
              caption={caption}
              username={username}
              userImage={userImage}
              postUserId={postUserId}
            />
          )
        }
      )}
    </div>
  )
}
