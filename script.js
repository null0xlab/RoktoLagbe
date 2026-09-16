document.addEventListener('DOMContentLoaded', async function () {

  // donors ডেটা লোড
  let donors = [];
  try {
    const res = await fetch('data.json');
    donors = await res.json();
  } catch (error) {
    console.error('data.json লোড করতে সমস্যা:', error);
  }

  // স্ট্যাটাস চেক ফাংশন
  function getDonationStatus(lastDate) {
    if (!lastDate) return '<span class="bg-gray-300 text-gray-800 px-2 py-1 rounded">অজানা</span>';
    const last = new Date(lastDate);
    const now = new Date();
    const diffDays = (now - last) / (1000 * 60 * 60 * 24);
    if (diffDays >= 90) {
        return '<span class="bg-green-200 text-green-800 px-2 py-1 rounded">প্রস্তুত</span>';
    } else {
        return '<span class="bg-red-200 text-red-800 px-2 py-1 rounded">প্রস্তুত নন</span>';
    }
  }

  // DataTable তৈরি
  const table = $('#donorsTable').DataTable({
    data: donors,
    deferRender: true,
    pageLength: 5,
    lengthChange: false,
    dom: 'rtip',
    columns: [
  { data: 'name' },
  { data: 'bloodGroup' },
  { data: 'age' },
  {
    data: 'mobile',
    render: function(data) {
      return `<a href="tel:${data}" style="color:inherit; text-decoration:none; font-weight: normal;">
                ${data}
              </a>`;
    }
  },
  { data: 'district' },
  { data: 'occupation' },
  { data: 'address' },
  {
    data: 'lastDonationDate',
    render: getDonationStatus
  },
],
      
    
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/bengali.json'
    }
  });

  // Regex ফাংশন
  function escapeRegEx(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ইনপুট সার্চ
  document.getElementById('globalSearch').addEventListener('input', function () {
    const v = this.value.trim();
    table.columns().search('');
    table.search('');

    const bg   = document.getElementById('bgSelect').value;
    const dist = document.getElementById('distSelect').value;
    if (bg)   table.column(1).search('^' + escapeRegEx(bg) + '$', true, false);
    if (dist) table.column(4).search('^' + escapeRegEx(dist) + '$', true, false);

    if (/^\d+$/.test(v)) {
      table
        .column(2)  
        .search('^' + escapeRegEx(v) + '$', true, false)
        .draw();
    } else {
      table.search(v).draw();
    }
  });

  // বাটন সার্চ
  document.getElementById('searchBtn').addEventListener('click', () => {
    const bg   = document.getElementById('bgSelect').value;
    const dist = document.getElementById('distSelect').value;
    document.getElementById('tableWrapper').classList.remove('hidden');

    table
      .column(1).search(bg   ? '^' + escapeRegEx(bg)   + '$' : '', true, false)
      .column(4).search(dist ? '^' + escapeRegEx(dist) + '$' : '', true, false)
      .draw();
  });

});

    const districtMap = {
  dhaka: [
    { bn: 'ঢাকা',        en: 'dhaka' },
    { bn: 'ফরিদপুর',     en: 'faridpur' },
    { bn: 'গাজীপুর',     en: 'gazipur' },
    { bn: 'গোপালগঞ্জ',   en: 'gopalganj' },
    { bn: 'জামালপুর',    en: 'jamalpur' },
    { bn: 'কিশোরগঞ্জ',   en: 'kishoreganj' },
    { bn: 'মাদারীপুর',   en: 'madaripur' },
    { bn: 'মানিকগঞ্জ',   en: 'manikganj' },
    { bn: 'মুন্সীগঞ্জ',  en: 'munshiganj' },
    { bn: 'ময়মনসিংহ',  en: 'mymensingh' },
    { bn: 'নারায়ণগঞ্জ', en: 'narayanganj' },
    { bn: 'নরসিংদী',    en: 'narsingdi' },
    { bn: 'নেত্রকোণা',   en: 'netrokona' },
    { bn: 'রাজবাড়ী',    en: 'rajbari' },
    { bn: 'শরীয়তপুর',   en: 'shariatpur' },
    { bn: 'শেরপুর',     en: 'sherpur' },
    { bn: 'টাঙ্গাইল',    en: 'tangail' }
  ],
  rajshahi: [
    { bn: 'বগুড়া',        en: 'bogura' },
    { bn: 'জয়পুরহাট',     en: 'joypurhat' },
    { bn: 'নওগাঁ',        en: 'naogaon' },
    { bn: 'নাটোর',        en: 'natore' },
    { bn: 'চাঁপাইনবাবগঞ্জ', en: 'chapainawabganj' },
    { bn: 'পাবনা',        en: 'pabna' },
    { bn: 'রাজশাহী',      en: 'rajshahi' },
    { bn: 'সিরাজগঞ্জ',    en: 'sirajgonj' }
  ],
  rangpur: [
    { bn: 'দিনাজপুর',   en: 'dinajpur' },
    { bn: 'গাইবান্ধা',  en: 'gaibandha' },
    { bn: 'কুড়িগ্রাম',  en: 'kurigram' },
    { bn: 'লালমনিরহাট', en: 'lalmonirhat' },
    { bn: 'নীলফামারী',  en: 'nilphamari' },
    { bn: 'পঞ্চগড়',    en: 'panchagarh' },
    { bn: 'রংপুর',      en: 'rangpur' },
    { bn: 'ঠাকুরগাঁও',  en: 'thakurgaon' }
  ],
  khulna: [
    { bn: 'বাগেরহাট',   en: 'bagerhat' },
    { bn: 'চুয়াডাঙ্গা',  en: 'chuadanga' },
    { bn: 'যশোর',      en: 'jashore' },
    { bn: 'ঝিনাইদহ',   en: 'jhenaidah' },
    { bn: 'খুলনা',     en: 'khulna' },
    { bn: 'কুষ্টিয়া',   en: 'kushtia' },
    { bn: 'মাগুরা',    en: 'magura' },
    { bn: 'মেহেরপুর',   en: 'meherpur' },
    { bn: 'নড়াইল',    en: 'narail' },
    { bn: 'সাতক্ষীরা',  en: 'satkhira' }
  ],
  barisal: [
    { bn: 'বরগুনা',   en: 'barguna' },
    { bn: 'বরিশাল',   en: 'barishal' },
    { bn: 'ভোলা',     en: 'bhola' },
    { bn: 'ঝালকাঠি',  en: 'jhalokati' },
    { bn: 'পটুয়াখালী', en: 'patuakhali' },
    { bn: 'পিরোজপুর',  en: 'pirojpur' }
  ],
  chittagong: [
    { bn: 'বান্দরবান',  en: 'bandarban' },
    { bn: 'ব্রাহ্মণবাড়িয়া', en: 'brahmanbaria' },
    { bn: 'চাঁদপুর',    en: 'chandpur' },
    { bn: 'চট্টগ্রাম',  en: 'chattogram' },
    { bn: 'কুমিল্লা',   en: 'cumilla' },
    { bn: 'কক্সবাজার',  en: 'coxs_bazar' },
    { bn: 'ফেনী',      en: 'feni' },
    { bn: 'খাগড়াছড়ি', en: 'khagrachari' },
    { bn: 'লক্ষ্মীপুর', en: 'lakshmipur' },
    { bn: 'নোয়াখালী',  en: 'noakhali' },
    { bn: 'রাঙ্গামাটি',  en: 'rangamati' }
  ],
  sylhet: [
    { bn: 'হবিগঞ্জ',      en: 'habiganj' },
    { bn: 'মৌলভীবাজার',  en: 'maulvibazar' },
    { bn: 'সুনামগঞ্জ',    en: 'sunamganj' },
    { bn: 'সিলেট',       en: 'sylhet' }
  ],
  mymensingh: [
    { bn: 'ময়মনসিংহ', en: 'mymensingh' },
    { bn: 'জামালপুর',  en: 'jamalpur' },
    { bn: 'শেরপুর',    en: 'sherpur' },
    { bn: 'নেত্রকোণা',  en: 'netrokona' }
  ]
};

// ২. বিভাগ পরিবর্তন হলে জেলা লোড
const divisionSelect = document.getElementById('divisionSelect');
const distSelect      = document.getElementById('distSelect');

divisionSelect.addEventListener('change', () => {
  const division = divisionSelect.value;
  distSelect.innerHTML = '<option value="">জেলা নির্বাচন করুন</option>';
  if (!division) {
    distSelect.disabled = true;
    return;
  }
  distSelect.disabled = false;
  districtMap[division].forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.en;   // ইংরেজি value
    opt.textContent = d.bn; // বাংলা টেক্সট
    distSelect.appendChild(opt);
  });
});

// ৩. DataTable ফিল্টার (শুধু জেলা দিয়ে)
function escapeRegEx(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

document.getElementById('searchBtn').addEventListener('click', () => {
  const distValue = distSelect.value;
  document.getElementById('tableWrapper').classList.remove('hidden');
  table
    .column(4).search(distValue ? '^' + escapeRegEx(distValue) + '$' : '', true, false)
    .draw();
});

    	window.addEventListener('load', () =>
  document.getElementById('modalOverlay').classList.add('show')
);

document.getElementById('closeBtn').addEventListener('click', () =>
  document.getElementById('modalOverlay').classList.remove('show')
);

const registerBtn = document.getElementById('registerBtn');
const registrationPopup = document.getElementById('registrationPopup');
const closePopup = document.getElementById('closePopup');
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

registerBtn.addEventListener('click', () => {
  registrationPopup.style.display = 'block';
});

closePopup.addEventListener('click', () => {
  registrationPopup.style.display = 'none';
  successMessage.style.display = 'none';
  registrationForm.reset();
});

window.addEventListener('click', (e) => {
  if (e.target === registrationPopup) {
    registrationPopup.style.display = 'none';
    successMessage.style.display = 'none';
    registrationForm.reset();
  }
});

// রেজিস্ট্রেশন ফরমে বিভাগ-জেলা ডাইনামিক লোড
const regDivisionSelect = document.getElementById('regDivision');
const regDistrictSelect = document.getElementById('regDistrict');

regDivisionSelect.addEventListener('change', () => {
  const division = regDivisionSelect.value;
  regDistrictSelect.innerHTML = '<option value="">জেলা নির্বাচন করুন</option>';
  regDistrictSelect.disabled = !division;
  if (!division) return;

  districtMap[division].forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.en;       // ইংরেজি value
    opt.textContent = d.bn; // বাংলা লেবেল
    regDistrictSelect.appendChild(opt);
  });
});

async function sendToTelegram(data) {
  const botToken = '7715640022:AAEZ67OQjW28O8oG_xIM50jqGigJqKhXYjY';
  const chatId = '1641664147';

  const jsonData = JSON.stringify(data, null, 2);
  const message = `নতুন রক্তদাতা নিবন্ধন:\n\`\`\`\n${jsonData}\n\`\`\``;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(registrationForm);
  const data = Object.fromEntries(formData.entries());

  if (!data.occupation || data.occupation.trim() === '') {
    data.occupation = 'অজানা';
  }

  // নতুন ফিল্ড: শেষ রক্তদানের তারিখ
  if (!data.lastDonationDate || data.lastDonationDate.trim() === '') {
    data.lastDonationDate = null;
  }

  data.id = Date.now();
  data.registrationDate = new Date().toISOString();

  const donors = JSON.parse(localStorage.getItem('donors') || '[]');
  donors.push(data);
  localStorage.setItem('donors', JSON.stringify(donors));

  const submitBtn = registrationForm.querySelector('button[type="submit"]');
  const success = await sendToTelegram(data);

  if (success) {
    submitBtn.innerHTML = '<i class="bx bx-check-circle mr-2"></i> তথ্য সফলভাবে জমা হয়েছে, আপনাকে কল দিয়ে ভেরিফাই করার পর তথ্য ওয়েবসাইটে এড করা হবে।';
    submitBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
    submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');

    registrationForm.reset();

    setTimeout(() => {
      registrationPopup.style.display = 'none';
      submitBtn.innerHTML = '<i class="bx bx-check-circle mr-2"></i> নিবন্ধন সম্পন্ন করুন';
      submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
      submitBtn.classList.add('bg-red-600', 'hover:bg-red-700');
    }, 3500);
  } else {
    alert('তথ্য টেলিগ্রামে পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।');
  }
});