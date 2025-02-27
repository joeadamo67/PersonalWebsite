import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  collection, 
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../utils/firebase';
import '../assets/styles/edit-blog-form.css';

const EditBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [published, setPublished] = useState(true);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Fetch existing post data if in edit mode
  useEffect(() => {
    const fetchPost = async () => {
      if (!isEditMode) return;
      
      setLoading(true);
      try {
        const postDoc = doc(db, 'posts', id);
        const postSnapshot = await getDoc(postDoc);
        
        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();
          setTitle(postData.title || '');
          setContent(postData.content || '');
          setFeaturedImageUrl(postData.featuredImage || '');
          setTags(postData.tags || []);
          setPublished(postData.published || false);
        } else {
          setError('Post not found');
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id, isEditMode, navigate]);
  
  // Handle image file selection
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
      // Create a preview URL
      setFeaturedImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  
  // Handle tag input
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };
  
  // Add a tag
  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };
  
  // Handle Enter key in tag input
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  // Remove a tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Upload the featured image to Firebase Storage
  const uploadImage = async () => {
    if (!featuredImage) return featuredImageUrl;
    
    const storageRef = ref(storage, `blog/${Date.now()}_${featuredImage.name}`);
    await uploadBytes(storageRef, featuredImage);
    return await getDownloadURL(storageRef);
  };
  
  // Save the post
  const savePost = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      // Validate
      if (!title.trim()) {
        throw new Error('Title is required');
      }
      
      if (!content.trim()) {
        throw new Error('Content is required');
      }
      
      // Upload image if selected
      let imageUrl = featuredImageUrl;
      if (featuredImage) {
        imageUrl = await uploadImage();
      }
      
      // Prepare post data
      const postData = {
        title: title.trim(),
        content: content.trim(),
        tags,
        published,
        updatedAt: serverTimestamp(),
        featuredImage: imageUrl || null
      };
      
      if (isEditMode) {
        // Update existing post
        const postRef = doc(db, 'posts', id);
        await setDoc(postRef, postData, { merge: true });
        setSuccessMessage('Post updated successfully!');
      } else {
        // Create new post
        postData.createdAt = serverTimestamp();
        postData.authorName = 'Your Name'; // Replace with actual user name
        
        await addDoc(collection(db, 'posts'), postData);
        setSuccessMessage('Post created successfully!');
        
        // Clear form for new posts
        setTitle('');
        setContent('');
        setFeaturedImage(null);
        setFeaturedImageUrl('');
        setTags([]);
        setPublished(true);
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err.message || 'Failed to save post. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return <div className="loading">Loading post data...</div>;
  }
  
  return (
    <div className="edit-blog-form">
      <div className="form-header">
        <h2>{isEditMode ? 'Edit Post' : 'Create New Post'}</h2>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <form onSubmit={savePost}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows="15"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="featuredImage">Featured Image</label>
          <input
            type="file"
            id="featuredImage"
            onChange={handleImageChange}
            accept="image/*"
          />
          
          {featuredImageUrl && (
            <div className="image-preview">
              <img src={featuredImageUrl} alt="Preview" />
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <div className="tags-input-container">
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tags and press Enter"
            />
            <button 
              type="button" 
              onClick={addTag}
              className="btn btn-sm add-tag-btn"
            >
              Add
            </button>
          </div>
          
          <div className="tags-container">
            {tags.map((tag, index) => (
              <div key={index} className="tag">
                <span>{tag}</span>
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="remove-tag-btn"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <label htmlFor="published">Publish this post</label>
          </div>
        </div>
        
        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn btn-secondary"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogForm;