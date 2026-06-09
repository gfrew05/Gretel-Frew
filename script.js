// ── PAGE NAVIGATION ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active', 'fade-in');
  });

  const target = document.getElementById('page-' + id);
  if (!target) return;

  target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger fade in after display kicks in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.classList.add('fade-in');
    });
  });

  // Close mobile menu
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── MOBILE MENU ──
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── WORK FILTER ──
function filterWork(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.work-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// ── PROJECT MODAL ──
const projects = {
  tackroom: {
    cat: 'Interior Design · 2024',
    title: 'Fantail Farm Tackroom',
    body: `A full renovation of the working tackroom at Fantail Farm in Middletown, MD. The brief was functional first — proper storage for tack, equipment, and feed — while bringing a considered aesthetic to a space that is used every day.\n\nMaterial palette centred on raw wood shelving, matte black hardware, and sealed concrete floors. Every decision balanced durability with intention. Project managed independently from brief to completion.`
  },
  bath: {
    cat: 'Interior Design · 2024',
    title: 'Master Bathroom Renovation',
    body: `A full gut renovation of the master bathroom, managed end-to-end: client brief, spatial planning, material selection, and vendor coordination. The project prioritised light, materiality, and a quiet sense of permanence over trend.\n\nTimeline and budget maintained independently throughout. Portfolio documentation in preparation.`
  },
  powder: {
    cat: 'Interior Design · In Progress 2026',
    title: 'Powder Room',
    body: `Currently in progress. The powder room project is being documented in real time as a portfolio piece — from initial concept through material selection, demo, and installation.\n\nWarm limestone-effect porcelain, unlacquered brass fixtures, hand-plastered ceiling. Updates posted regularly in the Field Log. Completion expected late summer 2026.`
  },
  studio: {
    cat: 'Architecture · Spring 2025',
    title: 'Archimarathon Studio, Melbourne',
    body: `Selected for the Archimarathon Studio at the University of Melbourne, run alongside Austin Maynard Architecture. An intensive design studio format bringing together international students and working architects.\n\nStudio sessions, site visits, and professional talks included conversations with Tom Kundig (Olson Kundig), Winy Maas (MVRDV), Matt York (Ratio Consultants), Simon Knott, and Kevin Hui (Archimarathon). Portfolio work from this semester available on request.`
  },
  'arch-coursework': {
    cat: 'Architecture · 2023–2025',
    title: 'UMD Architecture Coursework',
    body: `Three introductory architecture courses completed at the University of Maryland with high marks. Coursework included spatial design fundamentals, digital modelling in Rhino 3D, and visual communication using the Affinity suite.\n\nSelected drawings and models available in the full portfolio — request via the contact page.`
  },
  sleep: {
    cat: 'Research · 2024',
    title: 'Sleep Deprivation & Resilience',
    body: `Published observational study examining the relationship between sleep deprivation and psychological resilience. The research found significant supporting evidence for the study's primary hypothesis, contributing to the growing literature on performance and wellbeing under reduced-sleep conditions.\n\nFindings were presented via academic poster. Full paper and poster available on request.`
  }
};

function openProject(id) {
  const p = projects[id];
  if (!p) return;

  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div class="modal-eyebrow">${p.cat}</div>
    <h2 class="modal-title">${p.title}</h2>
    <div class="modal-img"><span>Project images coming soon — portfolio in preparation</span></div>
    <div class="modal-body">${p.body.replace(/\n\n/g, '<br/><br/>')}</div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProject();
});

// ── FORM TABS ──
function switchForm(id, btn) {
  document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.contact-form').forEach(f => f.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('form-' + id).classList.add('active');
}

// ── FORM SUBMIT ──
async function submitForm(event, thanksId) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);

  try {
    const response = await fetch('https://formspree.io/f/mvznrror', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.style.display = 'none';
      document.getElementById(thanksId).style.display = 'block';
    } else {
      alert('Something went wrong — please email me directly at gfrew05@email.com');
    }
  } catch (err) {
    alert('Something went wrong — please email me directly at gfrew05@email.com');
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
});
