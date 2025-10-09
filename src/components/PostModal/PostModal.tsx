// import React from "react";
// import { Post } from "../PostCard/PostCard";
// import styles from "./PostModal.module.css";

// interface PostModalProps {
//   post: Post | null;
//   onClose: () => void;
// }

// export default function PostModal({ post, onClose }: PostModalProps) {
//   if (!post) return null;

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <button className={styles.close} onClick={onClose}>
//           ✕
//         </button>

//         <img src="/images/bank.png" alt={post.title} className={styles.image} />
//         <h2 className={styles.title}>{post.title}</h2>
//         <p className={styles.desc}>{post.description}</p>
//       </div>
//     </div>
//   );
// };

