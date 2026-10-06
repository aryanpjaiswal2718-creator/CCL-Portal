require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const CCL = require('../models/Ccl');
const User = require('../models/User');

const ccls = [
  {
    name: 'Thane Solid Waste Management Community CoCreation Lab', shortName: 'Thane CCL', slug: 'thane-swm', location: 'Thane',
    description: 'Solid Waste Management community co-creation portal.',
    menu: ['About CCL','Team','Contact','Dashboard','Concerns','Success Stories','SWM Pledge','DIY Toolkit','Awareness','People · Places · Stories'].map(x => ({label:x,key:x.toLowerCase().replace(/[^a-z]+/g,'-')}))
  },
  {
    name: 'Juhu Moragaon Community Co-Creation Lab', shortName: 'Juhu Mora Gaon CCL', slug: 'juhu-mora-gaon', location: 'Juhu, Mumbai',
    description: 'Digital archive and community portal for Juhu Mora Gaon.',
    menu: ['Discover Mora Gaon','Life by the Sea','From Sea to Market','Culture','People','The Village','Sea & Environment','Mora Gaon Today','Gallery','Oral History Archive'].map(x => ({label:x,key:x.toLowerCase().replace(/[^a-z]+/g,'-')}))
  },
  {
    name: 'Nagaon Village, Murbad Community CoCreation Lab Initiative', shortName: 'Nagaon CCL', slug: 'nagaon-murbad', location: 'Nagaon, Murbad',
    description: 'Village knowledge, government schemes, geo-tagged products, archaeology and wildlife interventions.',
    menu: ['Survey Results','Government Schemes','Geo-tagged Uri Papad & Mirgund','Archeological Details','Animal/Wildlife Conflict','Interventions'].map(x => ({label:x,key:x.toLowerCase().replace(/[^a-z]+/g,'-')}))
  },
  {
    name: 'Mahim–Kelve Palghar Community Co-Creation Lab Initiative', shortName: 'Mahim–Kelve CCL', slug: 'mahim-kelve-palghar', location: 'Palghar',
    description: 'Biodiversity, heritage, petroglyphs, fishing and community-managed ecotourism.',
    menu: ['Survey Results','Biodiversity','Historically Important Site','Petroglyphes','Fishing & Ocean Plastic','Waste Management','Eco-tourism'].map(x => ({label:x,key:x.toLowerCase().replace(/[^a-z]+/g,'-')}))
  },
  {
    name: 'Ratnagiri / Raigad Community Co-Creation Lab', shortName: 'Ratnagiri / Raigad CCL', slug: 'ratnagiri-raigad', location: 'Ratnagiri / Raigad',
    description: 'People, biodiversity and traditional knowledge.',
    menu: ['PBR','Incense Sticks · Flowers','Medicinal Knowledge'].map(x => ({label:x,key:x.toLowerCase().replace(/[^a-z]+/g,'-')}))
  },
  {
    name: 'TBIA Community Co-Creation Lab', shortName: 'TBIA CCL', slug: 'tbia', location: 'TBIA',
    description: 'Industry–Academia collaboration for sustainability reporting and carbon accounting.',
    menu: ['GRI Sustainability Reporting','GRI Compliances','Carbon Emission Data','Compliance Dashboards'].map(x => ({label:x,key:x.toLowerCase().replace(/[^a-z]+/g,'-')}))
  }
];

(async () => {
  await connectDB();
  await CCL.deleteMany({});
  await CCL.insertMany(ccls);
  const email = 'admin@example.com';
  const passwordHash = await bcrypt.hash('ChangeMe123!', 12);
  await User.findOneAndUpdate({ email }, { name: 'Portal Admin', email, passwordHash, role: 'admin' }, { upsert: true, new: true });
  console.log('Seed complete. Admin:', email, 'password: ChangeMe123!');
  process.exit(0);
})();
