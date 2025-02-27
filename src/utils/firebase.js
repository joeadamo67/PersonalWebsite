// Mock Firebase services for development
console.log("Using mock Firebase services for development");

// Mock data
const mockData = {
  'post1': {
    title: "Getting Started with React",
    content: "React is a popular JavaScript library for building user interfaces.",
    createdAt: { toDate: () => new Date('2025-02-15') },
    tags: ["React", "JavaScript"],
    featuredImage: "https://placehold.co/600x400",
    authorName: "Developer"
  },
  'post2': {
    title: "Firebase Authentication Guide",
    content: "Firebase Authentication provides backend services for authentication.",
    createdAt: { toDate: () => new Date('2025-02-10') },
    tags: ["Firebase", "Authentication"],
    featuredImage: "https://placehold.co/600x400",
    authorName: "Developer"
  }
};

// Mock Firestore
const db = {
  collection: () => ({
    doc: (id) => ({
      get: () => Promise.resolve({
        exists: () => mockData[id] ? true : false,
        id: id,
        data: () => mockData[id] || {}
      }),
      set: () => Promise.resolve()
    }),
    add: () => Promise.resolve({ id: 'new-doc-id' }),
    where: () => ({
      get: () => Promise.resolve({
        docs: Object.entries(mockData).map(([id, data]) => ({
          id,
          data: () => data
        }))
      })
    }),
    orderBy: () => ({
      get: () => Promise.resolve({
        docs: Object.entries(mockData).map(([id, data]) => ({
          id,
          data: () => data
        }))
      })
    })
  })
};

// Mock Auth
const auth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    callback(null);
    return () => {};
  },
  signInWithEmailAndPassword: () => Promise.resolve({ user: { uid: 'mock-user-id' } }),
  signOut: () => Promise.resolve()
};

// Mock Storage
const storage = {
  ref: () => ({
    put: () => Promise.resolve(),
    getDownloadURL: () => Promise.resolve('https://placehold.co/600x400')
  })
};

// Export mock services
export { db, auth, storage };