export default {
  name: 'socialProof',
  title: 'Social Proof',
  type: 'document',
  fields: [
    // Quooker case study
    { name: 'caseStudyStatNumber', title: 'Case Study Stat Number', type: 'number' },
    { name: 'caseStudyStatSuffix', title: 'Case Study Stat Suffix', type: 'string' },
    { name: 'caseStudyStatLabel', title: 'Case Study Stat Label', type: 'string' },
    { name: 'caseStudyQuote', title: 'Case Study Quote', type: 'text', rows: 3 },
    { name: 'caseStudyAuthor', title: 'Case Study Author', type: 'string' },
    { name: 'caseStudyRole', title: 'Case Study Role', type: 'string' },
    { name: 'caseStudyLogo', title: 'Case Study Logo', type: 'image' },
    { name: 'caseStudyVideoUrl', title: 'Case Study Background Video URL', type: 'string' },
    { name: 'caseStudyImage', title: 'Case Study Image', type: 'image' },
    // Joe's Doors
    { name: 'joesLabel', title: "Joe's Doors Label", type: 'string' },
    { name: 'joesStatNumber', title: "Joe's Stat Number", type: 'number' },
    { name: 'joesStatLabel', title: "Joe's Stat Label", type: 'string' },
    { name: 'joesAvgTicket', title: "Joe's Avg Ticket", type: 'string' },
    { name: 'joesChannel', title: "Joe's Channel", type: 'string' },
    { name: 'joesImage', title: "Joe's Image", type: 'image' },
    // Testimonial
    { name: 'testimonialQuote', title: 'Testimonial Quote', type: 'text', rows: 3 },
    { name: 'testimonialAuthor', title: 'Testimonial Author', type: 'string' },
    { name: 'testimonialRole', title: 'Testimonial Role', type: 'string' },
    { name: 'testimonialStars', title: 'Testimonial Stars (1-5)', type: 'number' },
  ],
};
