import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const generateHTML = (data) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { font-size: 24px; margin-bottom: 5px; }
          .contact { color: #555; margin-bottom: 15px; }
          .section { margin-top: 15px; }
          .section-title { font-size: 18px; font-weight: bold; border-bottom: 1px solid #ccc; margin-bottom: 5px; }
          .job { margin-top: 10px; }
          .job-title { font-weight: bold; }
          .date { color: #777; font-size: 0.9em; }
          .skills { margin-top: 5px; }
        </style>
      </head>
      <body>
        <h1>${data.fullName || 'Your Name'}</h1>
        <div class="contact">${data.email || ''} | ${data.phone || ''}</div>

        ${data.summary ? `<div class="section"><div class="section-title">Summary</div><p>${data.summary.replace(/\n/g, '<br/>')}</p></div>` : ''}

        ${data.experience.filter(e => e.jobTitle || e.company).map(exp => `
          <div class="section">
            <div class="section-title">Work Experience</div>
            <div class="job">
              <div class="job-title">${exp.jobTitle} at ${exp.company}</div>
              <div class="date">${exp.startDate} - ${exp.endDate}</div>
              <p>${exp.description.replace(/\n/g, '<br/>')}</p>
            </div>
          </div>
        `).join('')}

        ${data.education.filter(e => e.degree || e.institution).map(edu => `
          <div class="section">
            <div class="section-title">Education</div>
            <div class="job">
              <div class="job-title">${edu.degree}, ${edu.institution}</div>
              <div class="date">${edu.year}</div>
            </div>
          </div>
        `).join('')}

        ${data.skills.length ? `
          <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills">${data.skills.join(', ')}</div>
          </div>
        ` : ''}
      </body>
    </html>
  `;
};

export const generateAndSharePDF = async (cvData) => {
  const html = generateHTML(cvData);
  try {
    const { uri } = await Print.printToFileAsync({ html });
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      alert('Sharing not available on this device');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};