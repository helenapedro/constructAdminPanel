const Project = {
     id: '',
     organization: '',
     images: [],
     timestamp: {
          _seconds: 0,
          _nanoseconds: 0,
     },
     projectOutcome: '',
     categoryId: '',
     endYear: 0,
     startYear: 0,
     projectPlace: {
          address: '',
          country: '',
     },
     title: '',
     summaryHeader: '',
     activities: [
          {
               header: '',
               items: [],
          },
     ],
     isDeleted: false,
};

// User type
const User = {
     id: '',
     email: '',
     role: '',
};

// CustomUser type
const CustomUser = {
     id: '',
     email: null,
     role: '',
};

// Category type
const Category = {
     id: '',
     name: '',
};

// Collection type
const Collection = {
     biograph: null,
     category: Category,
     certificates: null,
     courses: null,
     education: null,
     home: null,
     projects: Project,
     skills: null,
     training: null,
     users: User,
};

// OwnerData type
const OwnerData = {
     id: '', 
     mainImage: '', 
     name: '',
     experienceDescription: '', 
     experienceYears: '', 
     qhseExperienceYears: 0, 
     motaEngilLink: '', 
     oeaCardLink: '', 
     showcaseDescription: '', 
     timestamp: null, // Timestamp object (Firestore stores as a specific type)
     title: '', 
 };
 