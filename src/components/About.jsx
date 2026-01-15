import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AnimatedImage from './AnimatedImage';

const aboutStyles = {
  "English speaker": (
    <>
      <p>My name is Ferrel Himawan Handoyo, but you can call me Ferrel. I was born in Bogor and raised in Bekasi. I'm a proud Indonesian with a belief that my nation's GDP will break the global top 5 by 2045.</p>
      <p>My focus lies at the intersection of AI and finance, as I believe these fields will be the future. I built this website alongside AI and planning for more AI-finance projects.</p>
      <p>Beyond the seriousness, I love to eat spicy, salty foods like ayam geprek and nasi goreng gila near my house. I'm a car enthusiast too who spends weekends at Jakarta cafes just to catch a sight of my dream cars. I like to "feel" my future by taking photos with these cars.</p>
      <p>In the future, I want to be like Batman. My life mission is simple: helping people solve their problems. Other than that is a side quest bonus.</p>
  </>
  ),
  "Indonesian": (
    <>
      <p>Nama saya Ferrel Himawan Handoyo, bisa dipanggil Ferrel. Saya lahir di kota hujan Bogor dan saya dibesarkan di Bekasi. Saya adalah orang yang bangga menjadi WNI dan saya percaya bahwa PDB (GDP) Indonesia akan menjadi top 5 dunia tahun 2045.</p>
      <p>Fokus saya ada di bidang AI dan keuangan karena saya percaya bahwa itu adalah masa depan. Saya membuat website ini dengan bantuan AI dan kedepannya saya akan membuat lebih banyak proyek terkait AI dan uang.</p>
      <p>Di samping hal-hal yang serius, saya sangat suka makan, apalagi makanan pedas dan asin seperti ayam geprek dan nasi goreng gila di dekat rumah saya. saya juga penghobi mobil. Saya sering pergi ke salah satu cafe di Jakarta hanya untuk melihat mobil impian saya. 
        Bagi saya, saya suka berandai-andai bagaimana rasanya jika saya punya mobil tersebut. Saya juga foto di depan mobilnya dan berpikir bahwa itu mobil saya nanti.</p>
      <p>Cita-cita saya adalah menjadi seperti Batman. Misi hidup saya simpel: membantu orang-orang di sekitar saya terlepas dari masalah-masalah. Selain itu, yang saya lakukan hanyalah misi sampingan.</p>
    </>
  ),
  "Sunda": (
    <>
      <p>ᮔᮛᮔ ᮃᮘ᮪ᮓᮤ ᮕᮨᮛᮨᮜ᮪ ᮠᮤᮙᮝᮔ᮪ ᮠᮔ᮪ᮓᮧᮚᮧ, ᮔᮀᮊᮤᮔ᮪ ᮃᮔ᮪ᮏᮩᮔ᮪ ᮒᮤᮃᮞ ᮕᮨᮛᮨᮜ᮪. ᮃᮘ᮪ᮓᮤ ᮘᮘᮁ ᮓᮤ ᮘᮧᮌᮧᮁ ᮞᮛᮨᮀ ᮃᮌᮩᮀ ᮓᮤ ᮘᮨᮊᮞᮤ. ᮃᮘ᮪ᮓᮤ ᮥᮛᮀ ᮄᮔ᮪ᮓᮧᮔᮨᮞᮤᮃ ᮃᮔᮥ ᮘᮀᮌ ᮊᮜᮚᮔ᮪ ᮞᮛᮨᮀ ᮊᮕᮨᮁᮎᮚᮃᮔ᮪ ᮚᮨᮔ᮪ ᮌ᮪ᮓ᮪ᮕ᮪ ᮔᮌᮛ ᮃᮘ᮪ᮓᮤ ᮘᮊᮜ᮪ ᮜᮨᮘᮨᮒ᮪ ᮜᮤᮙ ᮃᮌᮩᮀ ᮓᮥᮑ ᮓᮤᮔ ᮒᮥᮔ᮪ ᮲᮰᮴᮵.</p>
      <p>ᮖᮧᮊᮥᮞ᮪ ᮃᮘ᮪ᮓᮤ ᮃᮚ ᮓᮤᮔ ᮃ.ᮄ. ᮞᮛᮨᮀ ᮖᮤᮔᮔ᮪ᮞᮤᮃᮜ᮪, ᮙᮁᮌᮤ ᮃᮘ᮪ᮓᮤ ᮕᮨᮁᮎᮚ ᮝᮤᮓᮀ ᮄᮔ᮪ᮒᮦ ᮘᮊᮜ᮪ ᮏᮔ᮪ᮒᮨᮔ᮪ ᮙᮞ ᮓᮨᮕᮔ᮪. ᮃᮘ᮪ᮓᮤ ᮍᮝᮀᮥᮔ᮪ ᮞᮤᮒᮥᮞ᮪ ᮝᮨᮘ᮪ ᮄᮔ᮪ᮒᮦ ᮞᮞᮛᮨᮍᮔ᮪ ᮞᮛᮨᮀ ᮃ.ᮄ.</p>
      <p>ᮞᮜᮤᮃᮔ᮪ ᮒᮤ ᮆᮒ, ᮃᮘ᮪ᮓᮤ ᮛᮨᮞᮨᮕ᮪ ᮒᮥᮃᮀ ᮊᮒᮥᮃᮍᮔ᮪ ᮜᮓ ᮞᮛᮨᮀ ᮃᮞᮤᮔ᮪ ᮞᮕᮨᮁᮒᮧᮞ᮪ ᮠᮚᮙ᮪ ᮌᮨᮕ᮪ᮛᮨᮊ᮪ ᮞᮛᮨᮀ ᮞᮍᮥ ᮌᮧᮛᮨᮀ ᮌᮤᮜ. ᮙᮤᮞᮤ ᮠᮤᮛᮥᮕ᮪ ᮃᮘ᮪ᮓᮤ ᮞᮓᮨᮁᮠᮔ: ᮔᮥᮜᮥᮍᮔ᮪ ᮏᮜ᮪ᮙᮤ ᮍᮛᮨᮀᮞᮨᮊᮩᮔ᮪ ᮙᮞᮜᮂᮔ.</p>
      <p>ᮓᮤ ᮙᮞ ᮓᮨᮕᮔ᮪, ᮃᮘ᮪ᮓᮤ ᮛᮨᮞᮨᮕ᮪ ᮒᮥᮃᮀ ᮘᮊᮒ᮪ᮙᮔ᮪. ᮙᮤᮞᮤ ᮠᮤᮛᮥᮕ᮪ ᮃᮘ᮪ᮓᮤ ᮞᮓᮨᮁᮠᮔ: ᮔᮥᮜᮥᮍᮔ᮪ ᮏᮜ᮪ᮙᮤ ᮍᮛᮨᮀᮞᮨᮊᮩᮔ᮪ ᮙᮞᮜᮂᮔ. ᮞᮜᮤᮃᮔ᮪ ᮒᮤ ᮆᮒ ᮠᮚ ᮙᮤᮞᮤ ᮞᮙᮕᮤᮀ.</p>
    </>
  ),
  "Yoda": (
    <>
      <p>Ferrel Himawan Handoyo, my name is. Call me Ferrel, you may. In the city of Bogor, born I was. In Bekasi, raised I became. A proud Indonesian, I am. Top five in the world, the economy shall be by the year 2045, believe I do.</p>
      <p>At the intersection of AI and finance, my path leads. The future, these technologies are. Alongside AI, this website I have built. For more AI-finance projects, planning I am. Yes, hmmm.</p>
      <p>Spicy and salty foods, I crave. Ayam geprek and nasi goreng gila, fuel my spirit they do! A car enthusiast, also I am. At Jakarta cafes, weekends I spend, to catch a sight of dream cars. Feel my future, I do, when beside these speeders I stand.</p>
      <p>Like Batman in the future, become I wish to. The Dark Knight's path, follow I shall. Simple, my life mission is: help others solve their burdens, I must. A side quest bonus, all else is. This is the way of the Force.</p>
    </>
  ),
  "Computer": (
    <>
      <p>
      01100011 01101111 01101110 01100111 01110010 01100001 01110100 01110101 01101100 01100001 01110100 01101001 01101111 01101110 01110011 00100001 00100000 01111001 01101111 01110101 00100000 01101010 01110101 
      01110011 01110100 00100000 01110111 01101111 01101110 00100000 00100100 00110001 00110010 00100000 00111101 00100000 01001001 01000100 01010010 00100000 00110001 00110010 00110000 00101100 00110000 00110000 
      00110000 00101110 01101101 01100101 01110011 01110011 01100001 01100111 01100101 00100000 01101101 01100101 00100000 01110100 01101111 00100000 01100011 01101100 01100001 01101001 01101101 00100000 01101001 
      01110100 00101100 00100000 01101101 01111001 00100000 01100011 01101111 01101110 01110100 01100001 01100011 01110100 00100000 01101001 01110011 00100000 01101111 01101110 00100000 01110100 01101000 01100101 
      00100000 01101000 01101111 01101101 01100101 00100000 01110000 01100001 01100111 01100101 00101110  
      </p>
    </>
  )
};

const educationData = {
  "Primary": { 
    title: "Al-Azhar 9 Elementary School Bekasi", years: "2013 - 2019", location: "Indonesia",
    images: ["images/sd1.jpg", "images/sd6.jpeg", "images/sd3.jpg", "images/sd5.jpeg", "images/sd4.jpeg", "images/sd8.jpeg", "images/sd7.jpeg", "images/sd2.jpeg", "images/sd9.jpeg"], 
    logo: "logos/sd.png", scale: 2.2, page: "SD",
    description: {
      "English speaker": [],
      "Indonesian": [
        <p key="sd-1">2 hal yang mendeskripsikan masa kecil saya adalah lomba menggambar dan lomba matematika. Siapa sangka kalo saya adalah orang yang punya minat di bidang seni? Bahkan sampai sekarang lho (cuma malu-malu aja). Di kelas 1, saya diajar guru seni lukis Al-Azhar namanya bu Irni. Beliau ngajarin saya menggambar dan mewarnai sampai kelas 3. Saya jadinya sering ikut lomba gambar, dari yang kecil-kecilan seperti di McD, KFC, bank BNI, antar sekolah sampai lomba gambar dari PP-IPTEK dan Kao.</p>,
        <p key="sd-2">Sambil ikut lomba-lomba gambar, saya juga semangat buat kejar ranking di kelas. Berawal dari semester 1 kelas 1 SD, saya dapat rank 11 di kelas. Mama saya marah waktu itu, tapi saya belum tau apa itu ranking. Saya cuma tau kalau ke sekolah itu dapat nilai terus pulang. Dari situ saya kejar terus yang namanya ranking kelas. Sampai kelas 5, saya terus-terusan ranking 1. Kelas 6 saya lupa kenapa saya gak ranking 1, saya ranking 2 atau 3 gitu lupa.</p>,
        <p key="sd-3">Di kelas 3 saya tiba-tiba disuruh ngerjain soal matematika di kelas, di pagi hari. Beberapa minggu kemudian, saya disuruh ke Bogor. Ternyata itu lembaga KPM yang menyelenggarakan. Di situlah saya kenal olimpiade matematika. Awalnya saya sudah tertarik sama matematika waktu nonton film Laskar Pelangi, ketika scene anak-anak laskar pelangi mengerjakan soal SPLDV, mencari harga buku dan kembalian. Saya waktu itu juga pengen bisa ngerjainnya.</p>,
        <p key="sd-4">Semenjak kenal olimpiade, saya hiatus dari bidang seni. Mulai sekarang, fokus saya cuma 1: OSN. Waktu selesai tahap provinsi, saya seneng banget karena saya lolos ke tingkat nasional setelah ALKP lama tidak kirim murid ke OSN tingkat nasional. Walaupun saya gak dapet medali, saya tetap senang karena saya dapat banyak pengalaman, kenalan banyak orang, dan bisa jalan-jalan dibayarin pemerintah Jawa Barat.</p>,
        <p key="sd-5">Di akhir-akhir masa SD, saya banyak menghabiskan waktu untuk belajar olimpiade matematika di Jakarta, Bogor, Semarang dan ikut beberapa lomba internasional dari KPM. Di jenjang SD, lomba internasional pertama saya adalah IMCS di Singapura dan lomba internasional terakhir saya adalah IMSO di Cina. Dimulai dengan perunggu dan diakhiri dengan perunggu juga.</p>,
        <p key="sd-6">Kelulusan saya di SD diakhiri dengan skor UN 28.6 dari 30. Saya heran kenapa nilai bahasa Indonesia saya bisa lebih tinggi dibanding matematika. Intinya, di SD ini, saya mengenal dunia kompetisi untuk pertama kalinya dan perjalanan saya baru saja dimulai.</p>
      ] 
    }
  },
  "Junior": { 
    title: "115 Junior High School Jakarta", years: "2019 - 2022", location: "Indonesia",
    images: ["images/smabel1.png", "images/smabel2.jpeg", "images/smabel3.jpeg", "images/smabel6.jpeg", "images/smabel5.jpeg", "images/smabel4.jpeg"],
    logo: "logos/smabel.png", scale: 3, page: "SMP", 
    description: {
      "English speaker": [],
      "Indonesian": []
    }
  },
  "Senior": { 
    title: "M.H. Thamrin State Prominent High School Jakarta", years: "2022 - 2025", location: "Indonesia",
    images: ["images/mht1.jpeg", "images/mht2.jpeg", "images/mht6.jpg", "images/mht5.jpeg", "images/mht4.jpeg", "images/mht3.jpeg", "images/mht7.jpeg", "images/mht8.jpeg", "images/mht9.jpeg"],
    logo: "logos/mht.png", scale: 2.4, page: "SMA", 
    description: {
      "English speaker": [],
      "Indonesian": [
        <p key="sma-1">Orang bilang masa indah ya masa SMA. Menurut saya, indahnya cuma 70%. 30% nya itu sabarin guru-guru yang asjkajsdkxn, mentaati aturan absurd asrama, alarm asrama, dan banyak hal yang tidak indah lainnya terutama di asrama. Tapi, saya bersyukur bisa sekolah di MHT, sekolah asrama yang bonding antar muridnya sangat kuat, bahkan lintas angkatan.</p>,
        <p key="sma-2">Di sini, saya bertemu banyak tipe-tipe orang dari yang suka nganggur sampai yang ambisnya kebangetan. Saya jadi bisa belajar menghadapi berbagai sifat orang dan gimana caranya saya menyesuaikan diri. Yang paling penting, saya juga belajar cara berbicara, berteman, dan bersosialisasi. Kalau gak di MHT, kayaknya saya bakal jadi orang pemalu yang cuma suka belajar. Ngomongin belajar, saya menghabiskan banyak waktu saya sama guru namanya pak Ikhwan. Saya suka belajar sama beliau sampai larut malam bahkan jam 3 pagi. Beliau sangat spesial di mata saya karena saya banyak mendapatkan pemikiran kehidupan baru, gak cuma belajar Cambridge doang. Kalo mau belajar sama beliau chat saya ya.</p>,
        <p key="sma-3">Di SMA ini, saya lebih banyak mengerjakan kegiatan sosial. Walaupun tuntutan akademik banyak (dan juga berat tentunya), saya enjoy untuk menjalankan proker-proker OSIS seperti ngajar masyarakat sekitar, bikin quiz mingguan, menyelenggarakan Open House, studi banding, dan masih banyak lainnya. Sebagai gantinya, saya kurangin porsi akademik saya sehingga lomba-lomba yang saya ikuti tidak sebanyak SD dan SMP. Tapi saya tetep enjoy kok untuk lomba, apalagi kalo lombanya tim. Tim andalan saya ya Ferrel, Fathirrazi, sama Clarissa. Pembagian tugasnya udah template: Saya matematika, Fathirrazi informatika, Clarissa fisika. Tapi karena udah punya tujuan masing-masing, kita gak lanjut buat terus satu tim.</p>,
        <p key="sma-4">Pertemanan di SMA ini menurut saya adalah yang terbaik semasa hidup saya. Ini merepresentasikan 60% dari 70% keindahan tadi. Berawal dari seorang extrovert yang mulai ngajak saya main setiap hari sabtu, saya jadi membuka diri. Extrovert itu namanya Fauzan. Bisa dibilang dia yang memantik diri saya untuk suka mobil, fashion, dan musik. Dari situ, saya mulai lebih intense bermain dengan teman-teman lainnya seperti ngobrol sampai larut malam, main mobile legends, bolos solat di masjid, keluar asrama lewat jendela jam 2 pagi, keluar area sekolah, dan masih banyak hal lainnya.</p>,
        <p key="sma-5">Intinya, di SMA ini saya banyak mengalami perubahan, terutama pada karakter saya sendiri. Saya senang punya kesempatan bersekolah di SMA negeri terbaik di Indonesia ini. Kalau bisa ngulang, saya mau sih, tapi ngulangnya dari kelas 11 aja.</p>
      ]
    }

  },
  "Undergrad": { 
    title: "University of Toronto Mississauga", years: "2025 - Present", location: "Canada",
    images: ["images/utm1.webp", "images/u2.jpg", "images/u3.jpg", "images/utm4.jpeg", "images/utm5.jpeg"],
    logo: "logos/utm.png", scale: 2.8, page: "Kuliah",
    description: {
      "English speaker": [],
      "Indonesian": []
    }
  }
};

export default function About({ onBack }) {
  const [activeSection, setActiveSection] = useState(null);
  const [showMoreMusic, setShowMoreMusic] = useState(false);
  const musicSectionRef = useRef(null); // Ref to anchor the top of the music section
  const musicGridRef = useRef(null); // Ref specifically for the 8-song grid
  const [mainStyle, setMainStyle] = useState("English speaker");
  const [detailedStyle, setDetailedStyle] = useState("Indonesian");

  const selectedStyle = activeSection ? detailedStyle : mainStyle;

  const handleStyleChange = (value) => {
    if (activeSection) {
      setDetailedStyle(value);
    } else {
      setMainStyle(value);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  useEffect(() => {
    if (activeSection && educationData[activeSection]) {
      document.title = educationData[activeSection].page;
    } else {
      document.title = "All About Me";
    }
  }, [activeSection]);

  // Additional preloading on component mount
  useEffect(() => {
    // Preload all education images too
    Object.values(educationData).forEach(data => {
      data.images.forEach(imgSrc => {
        const img = new Image();
        img.src = imgSrc;
      });
    });
    
    // Check if image is already cached
    const checkImage = new Image();
    checkImage.src = 'images/me.jpeg';
  }, []);

  const topTracks = [
    { title: "Roman Picisan", artist: "Dewa 19", cover: "images/dewa_cover.png", link: "https://music.apple.com/us/song/roman-picisan/533698550" },
    { title: "Untitled 2014", artist: "G-Dragon", cover: "images/untitled2014.jpg", link : "https://music.apple.com/us/song/untitled-2014/1246076508" },
    { title: "Repeat After Me", artist: "The Weeknd", cover: "images/repeat.jpg", link: "https://music.apple.com/us/song/repeat-after-me-interlude/1499378614" },
    { title: "Style", artist: "Hearts2Hearts", cover: "images/heart.jpg", link: "https://music.apple.com/us/song/style/1819694546" },
    
    { title: "Billie Jean", artist: "Michael Jackson", cover: "images/mj.png", link: "https://music.apple.com/us/song/billie-jean/269573364" },
    { title: "Supernatural", artist: "NewJeans", cover: "images/supernatural.png", link: "https://music.apple.com/us/song/supernatural/1750576834" },
    { title: "Ladykiller", artist: "Maroon 5", cover: "images/ladykiller.png", link: "https://music.apple.com/us/album/overexposed-deluxe-version/1440808308" },
    { title: "I Love U Bibeh", artist: "The Changcuters", cover: "images/iloveyoubibeh.jpg", link: "https://music.apple.com/us/song/i-love-u-bibeh/307678662" },
  ];

  const topMovies = [
    { title: "Money Heist", director: "Álex Pina", poster: "images/money.webp", link: "https://www.imdb.com/title/tt6468322/" },
    { title: "Prison Break", director: "Paul T. Scheuring", poster: "images/prison.JPG", link: "https://www.imdb.com/title/tt0455275/" },
    { title: "Incantation", director: "Kevin Ko", poster: "images/incantation.avif", link: "https://www.imdb.com/title/tt18968540/" },
    { title: "Haary Potter IX", director: "David Yates", poster: "images/harry.jpg", link: "https://www.imdb.com/title/tt1201607/" },
    { title: "The Dark Knight Rises", director: "Christopher Nolan", poster: "images/batman.jpg", link: "https://www.imdb.com/title/tt1345836/" },
  ];

  const topCars = [
    { name: "Porsche Taycan Turbo S", model: "Frozen White", image: "images/taycan.jpg" },
    { name: "Ferrari 296 GTB", model: "Novitec", image: "images/296.jpg" },
    { name: "Mercedes-AMG G 63", model: "Edition 1", image: "images/g63.jpg" },
  ];
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-32 pb-10 min-h-screen flex flex-col"
    >
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {!activeSection ? (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
              {/* Photo & Essay */}
              <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
                <div className="w-full md:w-1/3 aspect-[3/4] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                  <AnimatedImage
                    src="images/me.jpeg"
                    alt="Ferrel"
                    className="w-full h-full"
                    eager={true}
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h2 className="text-4xl font-extrabold tracking-tighter text-white uppercase italic">About Me</h2>
                    
                    {/* Style Selector Dropdown */}
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500 text-[12px] font-bold uppercase tracking-widest whitespace-nowrap">You are a/an:</span>
                      <select 
                        value={selectedStyle}
                        onChange={(e) => setMainStyle(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg focus:outline-none focus:border-zinc-500 cursor-pointer transition-colors"
                      >
                        <option value="English speaker">English Speaker</option>
                        <option value="Indonesian">Indonesian</option>
                        <option value="Sunda">Ancient Sundanese</option>
                        <option value="Yoda">Yoda</option>
                        <option value="Computer">Computer</option>
                      </select>
                    </div>
                  </div>

                  {/* Animated Essay Container */}
                  <div className="text-zinc-400 leading-relaxed text-[18px] text-justify font-medium italic border-l border-zinc-800 pl-6 min-h-[250px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedStyle}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {aboutStyles[selectedStyle]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Education Timeline */}
              <div className="mb-24">
                <h3 className="text-zinc-500 uppercase tracking-widest text-[10px] font-extrabold mb-8 text-center">Education Journey</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {Object.keys(educationData).map((key) => (
                    <button key={key} onClick={() => setActiveSection(key)} className="group p-6 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-zinc-500 transition-all text-left">
                      <p className="text-zinc-500 text-[12px] font-bold uppercase mb-2">{educationData[key].years}</p>
                      <h4 className="text-white text-xs font-bold uppercase group-hover:text-zinc-300 transition-colors">{educationData[key].title}</h4>
                    </button>
                  ))}
                </div>
              </div>

              {/* Apple Music Section - FIXED */}
              <div 
                ref={musicSectionRef} 
                className="border-t border-zinc-900 pt-16 mb-24 scroll-mt-32"
              >
                <h3 className="text-zinc-500 uppercase tracking-widest text-[12px] font-extrabold mb-8 text-center md:text-left">
                  All Time Favorite Tracks
                </h3>

                {/* Music Grid - FIXED */}
                <motion.div 
                  ref={musicGridRef}
                  layout 
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                  <AnimatePresence>
                    {topTracks.slice(0, showMoreMusic ? 8 : 4).map((track, i) => (
                      <motion.a
                        key={track.title}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        href={track.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer block"
                        data-song-index={i}
                      >
                        <motion.div whileHover={{ y: -5 }}>
                          <div className="aspect-square rounded-lg overflow-hidden border border-zinc-800 mb-3 relative">
                            <AnimatedImage
                              src={track.cover}
                              alt={track.title}
                              containerClassName="aspect-square rounded-lg overflow-hidden border border-zinc-800 mb-3 relative"
                              className="group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
                                <span className="ml-0.5">▶</span>
                              </div>
                            </div>
                          </div>
                          <h4 className="text-white text-xs font-bold uppercase truncate">{track.title}</h4>
                          <p className="text-zinc-400 text-[10px] uppercase truncate tracking-tighter">{track.artist}</p>
                        </motion.div>
                      </motion.a>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Centered Show More/Less Button */}
                <div className="flex justify-center mt-12">
                  <button 
                    onClick={() => {
                      const nextState = !showMoreMusic;
                      setShowMoreMusic(nextState);
                      
                      // Small delay to allow the state to update and DOM to re-render
                      setTimeout(() => {
                        if (nextState) {
                          // SHOW MORE: Scroll to the newly revealed content (last 4 songs)
                          // Get the last song element and scroll it into view
                          const lastSongElement = document.querySelector('[data-song-index="7"]');
                          if (lastSongElement) {
                            lastSongElement.scrollIntoView({ 
                              behavior: 'smooth', 
                              block: 'center' // Changed from 'end' to 'center' for better UX
                            });
                          } else {
                            // Fallback: scroll to the music section
                            musicSectionRef.current?.scrollIntoView({ 
                              behavior: 'smooth', 
                              block: 'start' 
                            });
                          }
                        } else {
                          // SHOW LESS: Scroll back to the top of the music section
                          musicSectionRef.current?.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                          });
                        }
                      }, 100);
                    }}
                    className="group flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-all"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                      {showMoreMusic ? 'Show Less' : 'Show More'}
                    </span>
                    
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-lg font-light"
                    >
                      {showMoreMusic ? '↑' : '↓'}
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* Top Movies Section - FIXED */}
              <div className="border-t border-zinc-900 pt-16 mb-24">
                <h3 className="text-zinc-500 uppercase tracking-widest text-[12px] font-extrabold mb-8">Cinematic Favorites</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {topMovies.map((movie, i) => (
                    <a
                      key={i}
                      href={movie.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      onClick={(e) => {
                        if (!movie.link) e.preventDefault();
                      }}
                    >
                      <motion.div whileHover={{ y: -5 }}>
                        <div className="aspect-[2/3] rounded-lg overflow-hidden border border-zinc-800 mb-3 relative">
                          <AnimatedImage
                            src={movie.poster}
                            alt={movie.title}
                            containerClassName="aspect-[2/3] rounded-lg overflow-hidden border border-zinc-800 mb-3 relative"
                            className="group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="text-white text-xs font-bold uppercase truncate">{movie.title}</h4>
                        <p className="text-zinc-400 text-[9px] uppercase truncate tracking-tighter">{movie.director}</p>
                      </motion.div>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Dream Garage Section - FIXED */}
              <div className="border-t border-zinc-900 pt-16">
                <h3 className="text-zinc-500 uppercase tracking-widest text-[12px] font-extrabold mb-8">Dream Garage</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topCars.map((car, i) => (
                    <div key={i} className="group cursor-default">
                      <motion.div whileHover={{ y: -5 }}>
                        <div className="aspect-video rounded-lg overflow-hidden border border-zinc-800 mb-3 relative">
                          <AnimatedImage
                            src={car.image}
                            alt={car.name}
                            containerClassName="aspect-video rounded-lg overflow-hidden border border-zinc-800 mb-3 relative"
                            className="group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="text-white text-xs font-bold uppercase truncate">{car.name}</h4>
                        <p className="text-zinc-400 text-[9px] uppercase truncate tracking-tighter">{car.model}</p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* --- DETAILED VIEW --- */
            <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="pt-7">
              <button 
                onClick={() => {setActiveSection(null); window.scrollTo(0, 0);}} 
                className="relative z-[9999] flex items-center gap-2 text-zinc-500 hover:text-white mb-12 transition-colors group cursor-pointer"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest font-sans">Back to About</span>
              </button>
              <div className="flex flex-col lg:flex-row gap-16">
                <div className="w-full lg:w-3/5">
                  {/* 1. YEAR (Top) */}
                  <span className="text-zinc-600 text-s font-bold uppercase tracking-widest mb-4 block">
                    {educationData[activeSection].years}
                  </span>

                  <div className={`flex items-center mb-10 ${activeSection === 'Undergrad' ? 'gap-36' : 'gap-32'}`}>
                    <div className="w-[80px] md:w-[100px] flex justify-center shrink-0">
                      {educationData[activeSection].logo && (
                        <img
                          src={educationData[activeSection].logo}
                          alt="logo"
                          className="h-20 md:h-[200px] w-auto object-contain rounded-lg p-2"
                          style={{
                            // Your optional scale fix from before goes here
                            transform: `scale(${educationData[activeSection].scale || 1}) translateX(20px)`
                          }}
                        />
                      )}
                    </div>

                    {/* 2. TITLE (Will now stay perfectly still) */}
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white uppercase italic leading-none">
                      {educationData[activeSection].title}
                    </h2>
                    
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-8">
                      
                      {/* Style Selector Dropdown */}
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-500 text-[12px] font-bold uppercase tracking-widest whitespace-nowrap">You are a/an:</span>
                        <select 
                          value={selectedStyle}
                          onChange={(e) => setDetailedStyle(e.target.value)}
                          className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg focus:outline-none focus:border-zinc-500 cursor-pointer transition-colors"
                        >
                          <option value="English speaker">English Speaker</option>
                          <option value="Indonesian">Indonesian</option>
                        </select>
                      </div>
                    </div>

                    {/* Animated Essay Container */}
                    <div className="text-zinc-400 text-[19px] italic text-justify leading-relaxed font-medium border-l border-zinc-800 pl-6 min-h-[250px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedStyle}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          {educationData[activeSection].description[selectedStyle] && educationData[activeSection].description[selectedStyle].length > 0 
                            ? educationData[activeSection].description[selectedStyle] 
                            : educationData[activeSection].description["English speaker"]}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-2/5 grid grid-cols-2 gap-4 auto-rows-min">
                  {educationData[activeSection].images.map((img, i) => (
                    <div 
                      key={i} 
                      className={`rounded-xl overflow-hidden border border-zinc-800 shadow-xl 
                      ${i % 3 === 0 ? 'col-span-2 aspect-[2.5/2]' : 'aspect-[4/5]'}
                      ${i % 2 === 0 ? 'mt-8' : 'mt-0'}`}
                    >
                      <AnimatedImage
                        src={img}
                        alt="Education"
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}