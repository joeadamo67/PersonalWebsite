import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc,
    query,
    orderBy,
    where,
    limit,
    serverTimestamp
  } from 'firebase/firestore';
  import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
  import { db, storage } from './firebase';
  
  // Blog posts API
  export const blogApi = {
    // Get all posts
    getAllPosts: async (publishedOnly = false) => {
      try {
        let postsQuery;
        
        if (publishedOnly) {
          postsQuery = query(
            collection(db, 'posts'),
            where('published', '==', true),
            orderBy('createdAt', 'desc')
          );
        } else {
          postsQuery = query(
            collection(db, 'posts'),
            orderBy('createdAt', 'desc')
          );
        }
        
        const querySnapshot = await getDocs(postsQuery);
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));
      } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
      }
    },
    
    // Get a single post by ID
    getPostById: async (postId) => {
      try {
        const postDoc = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postDoc);
        
        if (!postSnapshot.exists()) {
          throw new Error('Post not found');
        }
        
        return {
          id: postSnapshot.id,
          ...postSnapshot.data(),
          createdAt: postSnapshot.data().createdAt?.toDate()
        };
      } catch (error) {
        console.error('Error getting post:', error);
        throw error;
      }
    },
    
    // Create a new post
    createPost: async (postData, featuredImage = null) => {
      try {
        // Upload image if provided
        let imageUrl = null;
        if (featuredImage) {
          const storageRef = ref(storage, `blog/${Date.now()}_${featuredImage.name}`);
          await uploadBytes(storageRef, featuredImage);
          imageUrl = await getDownloadURL(storageRef);
        }
        
        // Create post with image URL if available
        const newPostData = {
          ...postData,
          featuredImage: imageUrl,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        
        const docRef = await addDoc(collection(db, 'posts'), newPostData);
        return docRef.id;
      } catch (error) {
        console.error('Error creating post:', error);
        throw error;
      }
    },
    
    // Update an existing post
    updatePost: async (postId, postData, featuredImage = null) => {
      try {
        const postRef = doc(db, 'posts', postId);
        
        // Upload new image if provided
        if (featuredImage) {
          const storageRef = ref(storage, `blog/${Date.now()}_${featuredImage.name}`);
          await uploadBytes(storageRef, featuredImage);
          const imageUrl = await getDownloadURL(storageRef);
          postData.featuredImage = imageUrl;
        }
        
        // Update with the new data
        postData.updatedAt = serverTimestamp();
        await updateDoc(postRef, postData);
        
        return postId;
      } catch (error) {
        console.error('Error updating post:', error);
        throw error;
      }
    },
    
    // Delete a post
    deletePost: async (postId) => {
      try {
        // Get the post to check if it has an image
        const postDoc = doc(db, 'posts', postId);
        const postSnapshot = await getDoc(postDoc);
        
        if (postSnapshot.exists()) {
          // Delete the associated image if it exists
          const postData = postSnapshot.data();
          if (postData.featuredImage) {
            try {
              const imageRef = ref(storage, postData.featuredImage);
              await deleteObject(imageRef);
            } catch (imgError) {
              console.error('Error deleting image:', imgError);
              // Continue with post deletion even if image deletion fails
            }
          }
        }
        
        // Delete the post document
        await deleteDoc(postDoc);
        return true;
      } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
      }
    }
  };
  
  // Helper functions
  export const helpers = {
    // Format date for display
    formatDate: (date) => {
      if (!date) return '';
      
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    
    // Create excerpt from content
    createExcerpt: (content, maxLength = 150) => {
      if (!content) return '';
      if (content.length <= maxLength) return content;
      
      return content.substring(0, maxLength) + '...';
    }
  };
  
  export default { blogApi, helpers };