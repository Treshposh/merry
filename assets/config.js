/* =====================================================================
   MAKE MERRY EVENTS — SITE CONFIG
   This is the only file the owner needs to edit.
   Leave a field empty ('') if it isn't confirmed: the site hides it.
   ===================================================================== */
window.CONFIG = {
  business: {
    name: 'Make Merry Events',
    city: 'Port Harcourt',
    country: 'Nigeria',
    whatsapp: '',   // digits with country code, no + or spaces. Format example: 2348012345678
    phone: '',      // shown as text, e.g. '+234 801 234 5678'
    email: '',
    address: '',    // only if there is a real office or studio
    hours: '',      // e.g. 'Mon – Sat, 9am – 6pm'
    about: '',      // the owner's own short story; replaces the default About text
    social: { instagram: '', facebook: '', tiktok: '' } // full URLs
  },

  // Enquiries are POSTed here as JSON (Formspree, Getform, your own API...).
  // A thank-you message appears ONLY when this endpoint confirms success.
  formEndpoint: '',

  // true = small "Illustration" labels on the generated artwork. Set false once real photos are in.
  conceptMode: true,

  // Words that scroll across the home page.
  marquee: ['Weddings', 'Traditional marriages', 'Birthdays', 'Engagements', 'Corporate evenings', 'Intimate dinners', 'Anniversaries'],

  // PROPOSED services: confirm with the owner, then edit or delete freely.
  categories: [
    { id:'wedding', title:'Weddings & Engagements', short:'Weddings', scene:'arch', style:'romantic', seed:11,
      line:'From the first look to the last dance, a day that feels entirely like the two of you.',
      body:'White weddings, traditional marriages and engagements each have their own rhythm. Planning brings the families, the vendors, the colours and the timeline together so the day can simply unfold.',
      includes:['White weddings','Traditional marriages','Engagements & proposals','Ceremony & reception styling'],
      builderType:'wedding', cta:'Plan a wedding' },
    { id:'birthday', title:'Birthdays & Private Celebrations', short:'Birthdays', scene:'confetti', style:'vibrant', seed:22,
      line:'Milestones marked with colour, music and the people you love most.',
      body:'A first birthday, a fortieth, a surprise for someone special. Whatever the number, the right theme, setting and flow turn a party into a memory.',
      includes:['Milestone birthdays','Surprise parties','Anniversaries','Bridal & baby showers'],
      builderType:'birthday', cta:'Plan a birthday' },
    { id:'corporate', title:'Corporate Events', short:'Corporate', scene:'stage', style:'modern', seed:33,
      line:'Launches, dinners and conferences that look the way your brand wants to be seen.',
      body:'Brand moments need polish and precision: the right room, a clear run of show, and details that represent your organisation well.',
      includes:['Product launches','End-of-year dinners','Award nights','Conferences & seminars'],
      builderType:'corporate', cta:'Plan a corporate event' },
    { id:'intimate', title:'Intimate Gatherings', short:'Intimate', scene:'candles', style:'elegant', seed:44,
      line:'A small table, warm light and room for real conversation.',
      body:'Some of the best celebrations are the smallest. A considered table, soft light and thoughtful touches make a few guests feel like the guests of honour.',
      includes:['Private dinners','Family celebrations','Proposals','Small receptions'],
      builderType:'intimate', cta:'Plan a gathering' },
    { id:'decor', title:'Decoration & Styling', short:'Décor', scene:'florals', style:'traditional', seed:55,
      line:'Florals, fabric and light shaped around your colours and your story.',
      body:'Styling is where an idea becomes a room. Colour, florals, fabric, lighting and tablescapes are chosen to suit your occasion and your taste.',
      includes:['Floral design','Stage & backdrop styling','Tablescapes','Lighting'],
      service:'decor', cta:'Ask about styling' },
    { id:'rentals', title:'Event Rentals', short:'Rentals', scene:'rentals', style:'elegant', seed:66,
      line:'Chairs, tables, linens and finishing pieces, if you need them.',
      body:'If rentals are part of what you need, ask what is available for your date and guest count.',
      includes:['Chairs & tables','Linens','Décor pieces'],
      service:'rentals', cta:'Ask about rentals' }
  ],

  eventTypes: [
    { id:'wedding', label:'Wedding', scene:'arch' },
    { id:'traditional', label:'Traditional marriage / Engagement', scene:'florals' },
    { id:'birthday', label:'Birthday', scene:'confetti' },
    { id:'corporate', label:'Corporate event', scene:'stage' },
    { id:'intimate', label:'Intimate gathering', scene:'candles' },
    { id:'other', label:'Something else', scene:'hall' }
  ],
  timeframes: ['Within 3 months', '3 – 6 months', '6 – 12 months', 'More than a year', 'Not decided yet'],
  guestRanges: ['Up to 50', '50 – 150', '150 – 300', '300 – 500', '500+', 'Not sure yet'],
  budgets: ['Under ₦1 million', '₦1m – ₦3m', '₦3m – ₦7m', '₦7m – ₦15m', 'Above ₦15m', 'Not sure yet'],
  styles: {
    elegant:     { label:'Elegant',     mood:'Candlelight, ivory linens, gold accents and a calm, refined room.' },
    romantic:    { label:'Romantic',    mood:'Soft blush florals, draped fabric and warm, low light.' },
    traditional: { label:'Traditional', mood:'Rich fabrics, cultural colours and details that honour family and heritage.' },
    vibrant:     { label:'Vibrant',     mood:'Bold colour, playful details and a room full of energy.' },
    modern:      { label:'Modern',      mood:'Clean lines, sculptural lighting and a confident, uncluttered room.' },
    minimalist:  { label:'Minimalist',  mood:'A restrained palette, open space and a few beautiful pieces.' }
  },
  services: [
    { id:'full', label:'Full planning', note:'From first idea to the last guest leaving' },
    { id:'partial', label:'Partial planning', note:'Help with the parts you choose' },
    { id:'dayof', label:'On-the-day coordination', note:'Someone running the day for you' },
    { id:'decor', label:'Décor & styling', note:'Florals, fabric, lighting, tablescapes' },
    { id:'venue', label:'Venue search', note:'Finding and checking suitable venues' },
    { id:'vendors', label:'Vendor coordination', note:'Catering, photography, music and more' },
    { id:'rentals', label:'Rentals', note:'Chairs, tables, linens, props' },
    { id:'advise', label:'Not sure, advise me', note:"We'll talk it through" }
  ],
  contactMethods: ['WhatsApp', 'Phone call', 'Email'],

  // Gallery. Add image:'photos/name.webp' and alt:'...' to show a real photo.
  // Only use photos of events Make Merry Events actually delivered, with permission.
  portfolio: [
    { cat:'wedding', title:'Ceremony arch', scene:'arch', style:'romantic', ar:'4/5', seed:101 },
    { cat:'corporate', title:'Launch stage', scene:'stage', style:'modern', ar:'3/2', seed:102 },
    { cat:'birthday', title:'Birthday celebration', scene:'confetti', style:'vibrant', ar:'1/1', seed:103 },
    { cat:'decor', title:'Traditional engagement décor', scene:'florals', style:'traditional', ar:'3/4', seed:104 },
    { cat:'wedding', title:'Reception hall', scene:'hall', style:'elegant', ar:'3/2', seed:105 },
    { cat:'decor', title:'Candlelit tablescape', scene:'candles', style:'romantic', ar:'4/5', seed:106 },
    { cat:'birthday', title:'Milestone dinner', scene:'candles', style:'minimalist', ar:'3/2', seed:107 },
    { cat:'wedding', title:'White wedding florals', scene:'florals', style:'minimalist', ar:'1/1', seed:108 },
    { cat:'corporate', title:'Awards night seating', scene:'rentals', style:'elegant', ar:'4/5', seed:109 }
  ],
  portfolioFilters: [['all','All'], ['wedding','Weddings'], ['birthday','Birthdays'], ['corporate','Corporate'], ['decor','Décor']],

  faq: [
    ['What kinds of events do you plan?', "The events on this site are a guide. Send us your idea, whatever its size, and we'll tell you honestly whether it's something we can take on."],
    ['How much does planning cost?', "Every event is different, so there are no fixed prices here. Guest numbers, date, location and the help you need all shape the cost. Your brief helps us give you a realistic picture once we've spoken."],
    ['Do I need to know my budget first?', 'No. Choose "Not sure yet" and we can work it out together. A rough range just helps us suggest ideas that fit.'],
    ['Do you plan events outside Port Harcourt?', "Ask us. Put your location in your message and we'll confirm what's possible."],
    ["I live abroad. Can I still plan with you?", "Tell us where you are and when your event is, and we'll talk through how we can work together."],
    ['How far ahead should I get in touch?', "As early as you can, especially for weekend dates in busy seasons. If your date is close, still reach out and we'll tell you what can be done."],
    ['What happens after I send my details?', 'We read them and reply using the contact method you chose, so we can talk through your plans.']
  ]
};
