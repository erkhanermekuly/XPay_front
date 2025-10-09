// import React, { useState } from "react";
// import PostCard, { Post } from "../PostCard/PostCard";
// import PostModal from "../PostModal/PostModal";
// import styles from "./PostsList.module.css";

// export default function PostsList() {
//   const [selectedPost, setSelectedPost] = useState<Post | null>(null);

//   const posts: Post[] = [
//     {
//       id: 1,
//       title: "New Product Launch",
//       description: "We are excited to announce our new perfume collection...",
//       image: "/images/post1.jpg",
//     },
//     {
//       id: 2,
//       title: "Behind the Scenes",
//       description: "A look inside our creative process and inspiration.",
//       image: "/images/post2.jpg",
//     },
//   ];

//   return (
//     <div className={styles.grid}>
//       {posts.map((post) => (
//         <PostCard key={post.id} post={post} onClick={setSelectedPost} />
//       ))}

//       <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
//     </div>
//   );
// };

