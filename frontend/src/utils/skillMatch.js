export const calculateScore = (jobSkills, resumeSkills) => {
  const matched = jobSkills.filter(skill =>
    resumeSkills.includes(skill)
  );
  return Math.round((matched.length / jobSkills.length) * 100);
};
