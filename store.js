import { create } from 'zustand';

const useStore = create((set) => ({
  cvData: {
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    experience: [{ jobTitle: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', institution: '', year: '' }],
    skills: [],
  },
  setCvData: (newData) => set((state) => ({ cvData: { ...state.cvData, ...newData } })),
  addExperience: () => set((state) => ({
    cvData: {
      ...state.cvData,
      experience: [...state.cvData.experience, { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }]
    }
  })),
  removeExperience: (index) => set((state) => ({
    cvData: {
      ...state.cvData,
      experience: state.cvData.experience.filter((_, i) => i !== index)
    }
  })),
  addEducation: () => set((state) => ({
    cvData: {
      ...state.cvData,
      education: [...state.cvData.education, { degree: '', institution: '', year: '' }]
    }
  })),
  removeEducation: (index) => set((state) => ({
    cvData: {
      ...state.cvData,
      education: state.cvData.education.filter((_, i) => i !== index)
    }
  })),
  setSkills: (skills) => set((state) => ({ cvData: { ...state.cvData, skills } })),
}));

export default useStore;