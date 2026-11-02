/********************************************************************
 * FELLA'S GARDEN - ANIMAL COMPANIONS (js/animals.js)
 * Includes Cats, Dogs, Rabbits, Fluttering Butterflies,
 * with 3 Distinct Adorable Variants for each species,
 * and Custom Player-Drawn Animals!
 ********************************************************************/

var animalVariants = {
    cat: [
        { id: 'ginger', name: 'Oyen', fullName: 'Kucing Oyen', emoji: '🐱', dot: '#FBBF24', desc: 'Hangat, ceria & suka berjemur' },
        { id: 'black', name: 'Kuro', fullName: 'Kucing Kuro', emoji: '🐈‍⬛', dot: '#2D3142', desc: 'Misterius anggun bermata zamrud' },
        { id: 'calico', name: 'Calico', fullName: 'Kucing Calico', emoji: '🐾', dot: '#FFFFFF', desc: 'Belang tiga warna pembawa hoki' },
        { id: 'sakura', name: 'Sakura', fullName: 'Kucing Sakura Langka 🌸', emoji: '🌸', dot: '#F472B6', desc: 'Bulu merah muda lembut dengan aroma kelopak sakura (varian telur)' }
    ],
    dog: [
        { id: 'golden', name: 'Golden', fullName: 'Anjing Golden', emoji: '🐕', dot: '#E6933A', desc: 'Ramah, setia & ekor bergoyang' },
        { id: 'choco', name: 'Choco', fullName: 'Anjing Choco', emoji: '🐶', dot: '#78350F', desc: 'Manis seperti cokelat hangat' },
        { id: 'dalmatian', name: 'Bintik', fullName: 'Anjing Bintik', emoji: '🐾', dot: '#27272A', desc: 'Bintik hitam lucu & lincah' },
        { id: 'starry', name: 'Bintang', fullName: 'Anjing Bintang Emas ⭐', emoji: '⭐', dot: '#FBBF24', desc: 'Bulu emas lembut bertabur kilau bintang (varian telur)' }
    ],
    rabbit: [
        { id: 'white', name: 'Salju', fullName: 'Kelinci Salju', emoji: '🐰', dot: '#FFFFFF', desc: 'Bulu putih selembut kapas' },
        { id: 'caramel', name: 'Karamel', fullName: 'Kelinci Karamel', emoji: '🐇', dot: '#C27838', desc: 'Dutch bunny manis berkaus kaki' },
        { id: 'grey', name: 'Abu', fullName: 'Kelinci Abu', emoji: '🐰', dot: '#9CA3AF', desc: 'Abu-abu silver lembut & pemalu' },
        { id: 'sakura_rabbit', name: 'Momo', fullName: 'Kelinci Kelopak Bunga 🌸', emoji: '🐰', dot: '#FBCFE8', desc: 'Telinga merah muda manis pembawa keberuntungan (varian telur)' }
    ],
    butterfly: [
        { id: 'violet', name: 'Ungu', fullName: 'Kupu Ungu', emoji: '🦋', dot: '#A855F7', desc: 'Sayap magenta anggun memesona' },
        { id: 'blue', name: 'Biru', fullName: 'Kupu Biru', emoji: '🦋', dot: '#0284C7', desc: 'Biru langit berkilau lembut' },
        { id: 'golden', name: 'Emas', fullName: 'Kupu Emas', emoji: '🦋', dot: '#F59E0B', desc: 'Sayap kuning keemasan bercahaya' },
        { id: 'aurora', name: 'Aurora', fullName: 'Kupu-Kupu Aurora Langka ✨', emoji: '✨', dot: '#38BDF8', desc: 'Sayap berkilau gradasi pelangi aurora borealis (varian telur)' }
    ],
    fish: [
        { id: 'koi', name: 'Koi', fullName: 'Ikan Koi Kohaku', emoji: '🎏', dot: '#F97316', desc: 'Koi anggun dengan corak oranye & putih' },
        { id: 'goldfish', name: 'Koki', fullName: 'Ikan Mas Koki', emoji: '🐟', dot: '#EF4444', desc: 'Perut bulat lucu dengan ekor berkibar' },
        { id: 'betta', name: 'Cupang', fullName: 'Ikan Cupang Biru', emoji: '🐠', dot: '#3B82F6', desc: 'Sirip megah melambai biru safir & ungu' },
        { id: 'golden_dragon', name: 'Ryu', fullName: 'Ikan Mas Mahkota Emas 👑', emoji: '👑', dot: '#F59E0B', desc: 'Sisik keemasan menyala dengan sirip panjang gemulai (varian telur)' }
    ]
};

var selectedAnimalVariants = {
    cat: 'ginger',
    dog: 'golden',
    rabbit: 'white',
    butterfly: 'violet',
    fish: 'koi'
};

function selectAnimalVariant(species, variantId, btnEl) {
    selectedAnimalVariants[species] = variantId;
    if (btnEl && btnEl.parentElement) {
        btnEl.parentElement.querySelectorAll('button').forEach(b => {
            b.classList.remove('active', 'scale-105', 'ring-2', 'ring-[#2B5B35]', 'font-bold', 'shadow-xs', 'bg-white');
            b.classList.add('opacity-60');
        });
        btnEl.classList.add('active', 'scale-105', 'ring-2', 'ring-[#2B5B35]', 'font-bold', 'shadow-xs', 'bg-white');
        btnEl.classList.remove('opacity-60');
    }
    const descEl = document.getElementById(species + 'VariantDesc');
    const vInfo = (animalVariants[species] || []).find(v => v.id === variantId);
    if (descEl && vInfo) {
        descEl.textContent = vInfo.desc;
    }
}
window.selectAnimalVariant = selectAnimalVariant;

var animalDefaultNames = {
    cat: {
        ginger: ['Mimi', 'Oyen', 'Milo', 'Sunny', 'Leo'],
        black: ['Kuro', 'Luna', 'Shadow', 'Midnight', 'Kiki'],
        calico: ['Belang', 'Mochi', 'Patch', 'Ciki', 'Daisy']
    },
    dog: {
        golden: ['Bobi', 'Lucky', 'Sunny', 'Goldie', 'Cupi'],
        choco: ['Choco', 'Brownie', 'Milo', 'Koko', 'Buster'],
        dalmatian: ['Dotty', 'Pongo', 'Oreo', 'Spot', 'Domino']
    },
    rabbit: {
        white: ['Bunbun', 'Snowy', 'Cimol', 'Fluffy', 'Mimi'],
        caramel: ['Mocha', 'Ciki', 'Caramel', 'Peanut', 'Toffee'],
        grey: ['Misty', 'Smoke', 'Lala', 'Silver', 'Pompom']
    },
    butterfly: {
        violet: ['Belle', 'Flora', 'Pipit', 'Violet'],
        blue: ['Morpho', 'Sky', 'Kiki', 'Azure'],
        golden: ['Sunny', 'Amber', 'Momo', 'Goldie']
    },
    fish: {
        koi: ['Kohaku', 'Taisho', 'Chibi', 'Nami', 'Ryuki'],
        goldfish: ['Bulu', 'Pompom', 'Gelembung', 'Koko', 'Mimi'],
        betta: ['Aura', 'Sapphire', 'Fluffy', 'Nemo', 'Finny']
    }
};

function updateAnimalsBadge() {
    const badge = document.getElementById('animalsCountBadge');
    if (badge) {
        badge.textContent = animals.length;
    }
    const pill = document.getElementById('modalAnimalCounterPill');
    if (pill) {
        pill.textContent = `${animals.length} Hewan`;
    }
}

function openAnimalModal() {
    const modal = document.getElementById('animalModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        renderActiveAnimalsList();
        updateAnimalsBadge();
    }
}

function closeAnimalModal() {
    const modal = document.getElementById('animalModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function renderActiveAnimalsList() {
    const container = document.getElementById('activeAnimalsContainer');
    if (!container) return;

    if (animals.length === 0) {
        container.innerHTML = `
            <div class="p-6 text-center bg-[#fdfbf7] rounded-xl border border-dashed border-[#d2e0cb]">
                <p class="text-sm font-hand text-gray-500">Belum ada hewan di kebun ini.</p>
                <p class="text-xs text-gray-400 mt-1">Pilih kucing, anjing, kelinci, kupu-kupu, atau gambar hewan custom di atas untuk meramaikan kebunmu!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = animals.map(a => {
        let label = 'Hewan Kebun';
        let emoji = '🐾';
        if (a.type === 'custom') {
            label = 'Hewan Ciptaanmu';
            emoji = '✨';
        } else if (a.type === 'exclusive' || (typeof isExclusivePetType === 'function' && isExclusivePetType(a.variant || a.type))) {
            const exInfo = (typeof getExclusivePetDef === 'function') ? getExclusivePetDef(a.variant || a.type) : null;
            if (exInfo) {
                label = `${exInfo.tierEmoji} ${exInfo.fullName}`;
                emoji = exInfo.emoji;
            } else {
                label = 'Pet Misterius Eksklusif';
                emoji = '🥚';
            }
        } else if (animalVariants[a.type]) {
            const vInfo = animalVariants[a.type].find(v => v.id === a.variant) || animalVariants[a.type][0];
            label = vInfo.fullName || vInfo.name;
            emoji = vInfo.emoji;
        }

        const isCurrentlyFollowed = followedAnimal && followedAnimal.id === a.id;
        const isFav = (typeof isAnimalFavorited === 'function') ? isAnimalFavorited(a) : false;
        const friendTier = (typeof getAnimalFriendshipTier === 'function') ? getAnimalFriendshipTier(a) : { label: 'Kenal 🌱', pct: 20 };
        const persInfo = (typeof getAnimalPersonalityInfo === 'function') ? getAnimalPersonalityInfo(a) : { label: 'Ceria ⚡' };
        const accList = (typeof ANIMAL_ACCESSORIES !== 'undefined') ? ANIMAL_ACCESSORIES : [{ id: 'none', icon: '✖️', name: 'Polos' }];
        const curAcc = accList.find(ac => ac.id === (a.accessory || 'none')) || accList[0];

        return `
            <div class="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#fdfbf7] hover:bg-white rounded-xl border border-[#e2d5bc] transition shadow-xs ${isCurrentlyFollowed ? 'ring-2 ring-emerald-500 bg-emerald-50/40' : ''}">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-lg overflow-hidden shrink-0">
                        ${a.customImg ? `<img src="${a.spriteDataUrl}" class="w-full h-full object-contain">` : emoji}
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <h4 onclick="promptRenameAnimal('${a.id}')" class="font-hand font-bold text-sm text-[#2B5B35] leading-tight cursor-pointer hover:underline" title="Klik untuk mengubah nama">${a.name}</h4>
                            <button onclick="promptRenameAnimal('${a.id}')" class="p-0.5 rounded hover:bg-emerald-100 text-emerald-700 transition" title="Beri Nama / Ubah Nama">
                                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                            </button>
                            <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold" title="Level Kedekatan (Elus atau beri Teh Bunga untuk menaikkan)">${friendTier.label} (${friendTier.pct}%)</span>
                            <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">${persInfo.label}</span>
                        </div>
                        <span class="text-[11px] text-gray-400">${label}</span>
                    </div>
                </div>
                <div class="flex items-center gap-1.5">
                    <!-- Costume / Accessory Cycle Button -->
                    <button onclick="cycleAnimalAccessory('${a.id}')" class="px-2 py-1 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-[11px] font-hand font-bold flex items-center gap-1 transition active:scale-95" title="Ganti Kostum / Aksesori (${curAcc.name})">
                        <span>${curAcc.id === 'none' ? '🎩' : curAcc.icon}</span>
                        <span class="hidden sm:inline">${curAcc.name}</span>
                    </button>
                    <!-- Favorite Toggle Button -->
                    <button onclick="toggleFavoriteAnimalById('${a.id}')" class="w-7 h-7 rounded-full ${isFav ? 'bg-amber-50 border-amber-300 text-amber-500' : 'bg-white hover:bg-amber-50 border-gray-200 text-gray-400 hover:text-amber-500'} border flex items-center justify-center transition active:scale-95 shadow-xs" title="${isFav ? 'Hapus dari Hewan Favorit' : 'Simpan ke Hewan Favorit'}">
                        <svg class="w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-500' : 'fill-none'}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </button>
                    <!-- Follow Button -->
                    <button onclick="startFollowingAnimalById('${a.id}'); closeAnimalModal();" class="px-2.5 py-1 rounded-full ${isCurrentlyFollowed ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'} text-xs font-hand font-bold flex items-center gap-1 transition active:scale-95 shadow-sm" title="Perhatikan dan ikuti hewan ini">
                        <span>${isCurrentlyFollowed ? '👁️ Diperhatikan' : '👁️ Perhatikan'}</span>
                    </button>
                    <!-- Dismiss Button -->
                    <button onclick="dismissAnimal('${a.id}')" class="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 flex items-center justify-center transition active:scale-95" title="Lepaskan hewan kembali ke alam">
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Reaksi teks kaomoji saat hewan ditekan (murni ekspresi emoji teks tanpa kalimat)
var animalKaomojiReactions = [
    '(˶˃ ᵕ ˂˶)',
    '𐔌՞ ܸ.ˬ.ܸ՞𐦯',
    '(˶˃𐃷˂˶)',
    '(˶ˆᗜˆ˵)',
    '(˶˃ᆺ˂˶)',
    '.·°՞(っ-ᯅ-ς)՞°·.',
    '(๑•᎑•๑)',
    'ᕙ(  •̀ ᗜ •́  )ᕗ',
    '( ˶˘ ³˘)♡',
    '(⸝⸝๑﹏๑⸝⸝)'
];

function getRandomAnimalKaomoji() {
    return animalKaomojiReactions[Math.floor(Math.random() * animalKaomojiReactions.length)];
}

/**
 * Memulai mode perhatikan: kamera terzoom in dan mengikuti gerak langkah hewan
 */
function startFollowingAnimal(a) {
    if (!a) return;
    followedAnimal = a;
    updateFollowBanner();

    a.petAnim = 0.9;
    a.state = 'happy';
    a.stateTimer = 3.5;

    // Bunyikan suara khas hewan yang ditekan / diperhatikan
    playAnimalSoundEffect(a);

    a.bubbleText = getRandomAnimalKaomoji();
    a.bubbleTimer = 3.2;

    for (let i = 0; i < 5; i++) {
        particles.push({
            type: 'heart',
            x: a.x + (Math.random() - 0.5) * 24,
            y: a.y - 18 - Math.random() * 16,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -1.2 - Math.random() * 1.0,
            size: 15 + Math.random() * 8,
            alpha: 1.0
        });
    }

    if (typeof showGardenNotice === 'function') {
        showGardenNotice(`Memperhatikan ${a.name}! Kamera mengikuti gerakannya.`);
    }
}

function startFollowingAnimalById(id) {
    const a = animals.find(item => item.id === id);
    if (a) {
        startFollowingAnimal(a);
    }
}

function stopFollowingAnimal() {
    if (!followedAnimal) return;
    followedAnimal = null;
    updateFollowBanner();
}

function updateFollowBanner() {
    const banner = document.getElementById('animalFollowBanner');
    if (!banner) return;
    if (!followedAnimal) {
        banner.classList.add('hidden');
        banner.classList.remove('flex');
    } else {
        banner.classList.remove('hidden');
        banner.classList.add('flex');
        const emojiEl = document.getElementById('followAnimalEmoji');
        const nameEl = document.getElementById('followAnimalNameText');
        const favBtn = document.getElementById('followAnimalFavBtn');
        if (emojiEl) {
            const emojis = { cat: '🐱', dog: '🐶', rabbit: '🐰', butterfly: '🦋', fish: '🐟', turtle: '🐢', custom: ((a.id && a.id.startsWith('turtle')) || (a.name && a.name.includes('Kura-kura')) ? '🐢' : '✨') };
            emojiEl.textContent = emojis[followedAnimal.type] || '🐾';
        }
        if (nameEl) {
            nameEl.textContent = followedAnimal.name;
        }
        if (favBtn) {
            const isFav = (typeof isAnimalFavorited === 'function') ? isAnimalFavorited(followedAnimal) : false;
            favBtn.innerHTML = isFav 
                ? `<svg class="w-3 h-3 text-amber-500 fill-amber-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>Favorit</span>`
                : `<svg class="w-3 h-3 text-gray-400 group-hover:text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>+ Favorit</span>`;
            favBtn.className = isFav
                ? 'group px-2 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 text-[11px] font-bold font-hand flex items-center gap-1 transition active:scale-95 shadow-2xs'
                : 'group px-2 py-0.5 rounded-full bg-white hover:bg-amber-50 border border-gray-300 text-gray-600 text-[11px] font-bold font-hand flex items-center gap-1 transition active:scale-95';
        }
    }
}

async function promptRenameAnimal(id) {
    const a = animals.find(item => item.id === id);
    if (!a) return;
    const speciesName = a.type === 'cat' ? 'kucing' : (a.type === 'dog' ? 'anjing' : (a.type === 'rabbit' ? 'kelinci' : (a.type === 'butterfly' ? 'kupu-kupu' : (a.type === 'fish' ? 'ikan' : 'hewan'))));
    
    let newName;
    if (typeof cutePrompt === 'function') {
        newName = await cutePrompt(`Beri nama baru untuk ${speciesName} ini:`, a.name, 'Ganti Nama Hewan', 'Nama panggilan...', '🐾');
    } else {
        newName = prompt(`Beri nama baru untuk ${speciesName} ini:`, a.name);
    }

    if (newName !== null && newName !== undefined) {
        const trimmed = newName.trim();
        if (trimmed.length > 0 && trimmed !== a.name) {
            a.name = trimmed;
            updateAnimalsBadge();
            renderActiveAnimalsList();
            updateFollowBanner();
            if (typeof scheduleAutoSave === 'function') scheduleAutoSave();
            if (typeof showGardenNotice === 'function') showGardenNotice(`Nama diubah menjadi "${a.name}"!`);
        }
    }
}

async function promptRenameCurrentFollowedAnimal() {
    if (!followedAnimal) return;
    await promptRenameAnimal(followedAnimal.id);
}

function playAnimalSoundEffect(a) {
    if (!a) return;
    if (a.type === 'cat' && typeof playCatMeowSound === 'function') playCatMeowSound();
    else if (a.type === 'dog' && typeof playDogBarkSound === 'function') playDogBarkSound();
    else if (a.type === 'rabbit' && typeof playRabbitSound === 'function') playRabbitSound();
    else if (a.type === 'butterfly' && typeof playButterflySound === 'function') playButterflySound();
    else if (a.type === 'fish' && typeof playFishSound === 'function') playFishSound();
    else if (a.type === 'exclusive' || (typeof isExclusivePetType === 'function' && isExclusivePetType(a.variant || a.type))) {
        if (typeof playChimeSound === 'function') playChimeSound();
    }
    else if (a.type === 'custom') {
        if (a.sound === 'cat' && typeof playCatMeowSound === 'function') playCatMeowSound();
        else if (a.sound === 'dog' && typeof playDogBarkSound === 'function') playDogBarkSound();
        else if (a.sound === 'rabbit' && typeof playRabbitSound === 'function') playRabbitSound();
        else if (a.sound === 'butterfly' && typeof playButterflySound === 'function') playButterflySound();
        else if (a.sound === 'fish' && typeof playFishSound === 'function') playFishSound();
        else if (typeof playChimeSound === 'function') playChimeSound();
    }
}

function spawnAnimal(species, customName, variantId) {
    const cx = WORLD_W * 0.5;
    const cy = WORLD_H * 0.52;
    let sx = cx;
    let sy = cy;

    let habitat = 'land';
    if (species === 'fish') habitat = 'water';
    else if (species === 'butterfly') habitat = 'flying';

    if (species === 'fish') {
        let foundWater = false;
        for (let attempt = 0; attempt < 100; attempt++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 450;
            const testX = cx + Math.cos(angle) * dist;
            const testY = cy + Math.sin(angle) * (dist * 0.55);
            if (isWaterSwimmable(testX, testY, 12)) {
                sx = testX;
                sy = testY;
                foundWater = true;
                break;
            }
        }
        if (!foundWater) {
            // Scan garden grid for any swimmable water spot
            for (let rx = 300; rx < WORLD_W - 300; rx += 50) {
                for (let ry = 300; ry < WORLD_H - 300; ry += 50) {
                    if (isWaterSwimmable(rx, ry, 10)) {
                        sx = rx;
                        sy = ry;
                        foundWater = true;
                        break;
                    }
                }
                if (foundWater) break;
            }
        }
        if (!foundWater) {
            if (typeof showGardenNotice === 'function') {
                showGardenNotice('Gunakan pensil air 🌊 untuk membuat kolam bagi ikan terlebih dahulu!');
            }
            if (typeof playErrorSound === 'function') playErrorSound();
            return null;
        }
    } else {
        for (let attempt = 0; attempt < 50; attempt++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 340;
            const testX = cx + Math.cos(angle) * dist;
            const testY = cy + Math.sin(angle) * (dist * 0.55);
            const onGrass = typeof isPointOnGrass === 'function' ? isPointOnGrass(testX, testY) : true;
            const onWater = typeof isPointOnWater === 'function' ? isPointOnWater(testX, testY) : false;
            if (onGrass && (species === 'butterfly' || !onWater)) {
                sx = testX;
                sy = testY;
                break;
            }
        }
    }

    const chosenVariant = variantId || selectedAnimalVariants[species] || (animalVariants[species] ? animalVariants[species][0].id : 'default');

    let name = customName;
    if (!name) {
        const namesObj = animalDefaultNames[species];
        let pool = ['Sahabat'];
        if (namesObj && typeof namesObj === 'object') {
            if (namesObj[chosenVariant] && Array.isArray(namesObj[chosenVariant])) {
                pool = namesObj[chosenVariant];
            } else if (Array.isArray(namesObj)) {
                pool = namesObj;
            }
        }
        name = pool[Math.floor(Math.random() * pool.length)];
    }

    const animal = {
        id: 'animal_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        type: species,
        habitat: habitat,
        variant: chosenVariant,
        name: name,
        x: sx,
        y: sy,
        vx: 0,
        vy: 0,
        targetX: sx,
        targetY: sy,
        state: 'idle',
        stateTimer: 1 + Math.random() * 2,
        facingLeft: Math.random() < 0.5,
        hopPhase: 0,
        tailPhase: Math.random() * Math.PI,
        swimPhase: Math.random() * Math.PI * 2,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: 16 + Math.random() * 8,
        perchedFlowerId: null,
        perchTimer: 0,
        petAnim: 0,
        bubbleText: '',
        bubbleTimer: 0,
        colorHue: Math.random() * 360,
        sleepingOnPillowId: null,
        targetPillowId: null,
        sleepiness: Math.random() * 25,
        sleepinessRate: 0.8 + Math.random() * 0.5,
        napCooldown: 30 + Math.random() * 30,
        zzzTimer: 0
    };

    animals.push(animal);
    updateAnimalsBadge();
    renderActiveAnimalsList();

    // Spawn sound when placed!
    playAnimalSoundEffect(animal);

    // Spawn cheerful heart particles
    for (let i = 0; i < 4; i++) {
        particles.push({
            type: 'heart',
            x: sx + (Math.random() - 0.5) * 20,
            y: sy - 15 - Math.random() * 15,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -1.2 - Math.random() * 0.8,
            size: 14 + Math.random() * 6,
            alpha: 1.0
        });
    }

    if (typeof scheduleAutoSave === 'function') scheduleAutoSave();
    const vInfo = (animalVariants[species] || []).find(v => v.id === chosenVariant);
    const label = vInfo ? vInfo.fullName : (species === 'cat' ? 'Kucing' : species === 'dog' ? 'Anjing' : species === 'rabbit' ? 'Kelinci' : species === 'fish' ? 'Ikan' : 'Kupu-Kupu');
    if (typeof showGardenNotice === 'function') {
        showGardenNotice(`${name} sang ${label} menyapa kebunmu!`);
    }
    return animal;
}

function spawnCustomAnimalInstance(options) {
    const cx = WORLD_W * 0.5;
    const cy = WORLD_H * 0.52;
    let sx = cx;
    let sy = cy;
    const habitat = options.habitat || 'land';

    if (habitat === 'water') {
        let foundWater = false;
        for (let attempt = 0; attempt < 80; attempt++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 450;
            const testX = cx + Math.cos(angle) * dist;
            const testY = cy + Math.sin(angle) * (dist * 0.55);
            if (typeof isPointOnWater === 'function' && isPointOnWater(testX, testY)) {
                sx = testX;
                sy = testY;
                foundWater = true;
                break;
            }
        }
        if (!foundWater && typeof isPointOnWater === 'function') {
            for (let rx = 300; rx < WORLD_W - 300; rx += 70) {
                for (let ry = 300; ry < WORLD_H - 300; ry += 70) {
                    if (isPointOnWater(rx, ry)) {
                        sx = rx;
                        sy = ry;
                        foundWater = true;
                        break;
                    }
                }
                if (foundWater) break;
            }
        }
        if (!foundWater) {
            if (typeof showGardenNotice === 'function') {
                showGardenNotice('Hewan air membutuhkan medan air 🌊! Buatlah kolam terlebih dahulu.');
            }
            if (typeof playErrorSound === 'function') playErrorSound();
            return null;
        }
    } else {
        for (let attempt = 0; attempt < 50; attempt++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 320;
            const testX = cx + Math.cos(angle) * dist;
            const testY = cy + Math.sin(angle) * (dist * 0.55);
            const onGrass = typeof isPointOnGrass === 'function' ? isPointOnGrass(testX, testY) : true;
            const onWater = typeof isPointOnWater === 'function' ? isPointOnWater(testX, testY) : false;
            if (onGrass && (habitat === 'flying' || !onWater)) {
                sx = testX;
                sy = testY;
                break;
            }
        }
    }

    const img = new Image();
    img.src = options.spriteDataUrl;

    const animal = {
        id: 'animal_custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        type: 'custom',
        habitat: habitat,
        name: options.name || 'Hewan Custom',
        x: sx,
        y: sy,
        vx: 0,
        vy: 0,
        targetX: sx,
        targetY: sy,
        width: options.width || 48,
        height: options.height || 48,
        spriteDataUrl: options.spriteDataUrl,
        customImg: img,
        sound: options.sound || 'chime',
        state: 'idle',
        stateTimer: 1 + Math.random() * 2,
        facingLeft: Math.random() < 0.5,
        hopPhase: 0,
        tailPhase: 0,
        swimPhase: Math.random() * Math.PI * 2,
        petAnim: 0,
        bubbleText: '',
        bubbleTimer: 0
    };

    animals.push(animal);
    updateAnimalsBadge();
    renderActiveAnimalsList();
    if (typeof scheduleAutoSave === 'function') scheduleAutoSave();
    return animal;
}

function spawnStarterAnimals() {
    animals = [];
    spawnAnimal('cat', 'Mimi', 'ginger');
    spawnAnimal('dog', 'Bobi', 'golden');
    spawnAnimal('rabbit', 'Bunbun', 'white');
    spawnAnimal('butterfly', 'Kiki', 'violet');
}

async function dismissAnimal(id) {
    const a = animals.find(item => item.id === id);
    if (!a) return;

    let confirmed = true;
    if (typeof cuteConfirm === 'function') {
        confirmed = await cuteConfirm(`Lepaskan ${a.name} kembali ke alam bebas?`, 'Lepaskan Hewan', true, 'Ya, Lepaskan', '🕊️');
    }

    if (!confirmed) return;

    const idx = animals.findIndex(item => item.id === id);
    if (idx !== -1) {
        const removed = animals.splice(idx, 1)[0];
        if (followedAnimal && followedAnimal.id === id) {
            stopFollowingAnimal();
        }
        updateAnimalsBadge();
        renderActiveAnimalsList();
        if (typeof scheduleAutoSave === 'function') scheduleAutoSave();
        if (typeof showGardenNotice === 'function') {
            showGardenNotice(`${removed.name} telah berpamitan dengan ramah.`);
        }
    }
}

function focusAnimal(id) {
    startFollowingAnimalById(id);
    closeAnimalModal();
}

function isPillowOccupied(pillowId, excludeAnimal = null) {
    if (!pillowId) return false;
    const petList = (typeof animals !== 'undefined' && Array.isArray(animals))
        ? animals
        : ((typeof window !== 'undefined' && Array.isArray(window.animals)) ? window.animals : []);
    return petList.some(other => {
        if (other === excludeAnimal) return false;
        if (other.sleepingOnPillowId === pillowId) return true;
        if (other.targetPillowId === pillowId) return true;
        return false;
    });
}
window.isPillowOccupied = isPillowOccupied;

function wakePetFromPillow(pillowId, reason = 'moved') {
    if (!pillowId) return;
    const petList = (typeof animals !== 'undefined' && Array.isArray(animals))
        ? animals
        : ((typeof window !== 'undefined' && Array.isArray(window.animals)) ? window.animals : []);
    petList.forEach(a => {
        if (a.sleepingOnPillowId === pillowId || a.targetPillowId === pillowId) {
            const wasSleeping = (a.sleepingOnPillowId === pillowId || a.state === 'sleeping');
            a.sleepingOnPillowId = null;
            a.targetPillowId = null;
            a.state = 'idle';
            a.stateTimer = 2.0;
            if (wasSleeping) {
                a.bubbleText = '(⊙_⊙;) !';
                a.bubbleTimer = 2.2;
                // Pet hops off pillow to clear the cushion
                const angle = Math.random() * Math.PI * 2;
                const hopDist = 20 + Math.random() * 8;
                const hx = a.x + Math.cos(angle) * hopDist;
                const hy = a.y + Math.sin(angle) * hopDist * 0.7;
                if (typeof isLandWalkable === 'function' && isLandWalkable(hx, hy)) {
                    a.x = hx;
                    a.y = hy;
                }
            }
        }
    });
}
window.wakePetFromPillow = wakePetFromPillow;

function petAnimal(a) {
    if (!a) return;
    a.sleepingOnPillowId = null;
    a.targetPillowId = null;
    a.sleepiness = Math.max(0, (a.sleepiness || 0) - 35);
    a.napCooldown = 45;
    a.petAnim = 1.0;
    a.state = 'happy';
    a.stateTimer = 3.5;

    // Track petting count & friendship gift rewards
    a.petCount = (a.petCount || 0) + 1;

    // Tampilkan reaksi kaomoji murni tanpa teks kalimat di layar kebun
    a.bubbleText = getRandomAnimalKaomoji();
    a.bubbleTimer = 2.8;

    // Catat juga curhatan hangat hewan ke modal pesan jika belum sering curhat
    if (Math.random() < 0.65 && typeof recordAnimalMessage === 'function') {
        const dialogs = [
            "Rasanya nyaman sekali waktu kamu elus... Makasih ya sudah memperhatikanku!",
            "Aku suka berada di dekatmu, bikin hatiku tenang dan damai.",
            "Tadi waktu kamu sentuh kepalaku, rasanya hangat sekali! Sayang kamu selalu~",
            "Kebun ini makin indah karena ada kamu yang merawatnya dengan tulus."
        ];
        recordAnimalMessage(a, dialogs[Math.floor(Math.random() * dialogs.length)], 'bahagia');
    }

    // Suara purring soothing atau suara hewan
    if (typeof playPurrSound === 'function' && (a.type === 'cat' || Math.random() < 0.5)) {
        playPurrSound();
    } else {
        playAnimalSoundEffect(a);
    }

    if (typeof incrementStat === 'function') {
        incrementStat('animalsPetted', 1);
    }
    if (typeof incrementQuestProgress === 'function') {
        incrementQuestProgress('pet_animals', 1);
    }
    if (typeof boostAnimalFriendship === 'function') {
        boostAnimalFriendship(a, 7);
    }

    // Every 3 pets: Give player +2 ⭐ Stars as a sweet friendship thank you!
    if (a.petCount % 3 === 0) {
        if (typeof awardStars === 'function') awardStars(2);
        if (typeof showGardenNotice === 'function') {
            const petName = a.customName || a.name || 'Hewan kesayanganmu';
            showGardenNotice(`💖 ${petName} sangat bahagia bersamamu dan memberimu +2 ⭐ Bintang!`);
        }
        if (typeof playChimeSound === 'function') playChimeSound();
    }

    for (let i = 0; i < 6; i++) {
        particles.push({
            type: 'heart',
            x: a.x + (Math.random() - 0.5) * 24,
            y: a.y - 18 - Math.random() * 16,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -1.2 - Math.random() * 1.0,
            size: 15 + Math.random() * 8,
            alpha: 1.0
        });
    }
}

function findAnimalAt(wx, wy) {
    for (let i = animals.length - 1; i >= 0; i--) {
        const a = animals[i];
        const dx = wx - a.x;
        const dy = wy - (a.y - 12);
        if (Math.hypot(dx, dy) < 32) {
            return a;
        }
    }
    return null;
}

// Helper: Memastikan titik berada di daratan rumput kering (atau di atas jembatan) untuk hewan darat
function isLandWalkable(x, y, ignoreDecorId = null) {
    if (typeof isPointBlockedByDecoration === 'function' && isPointBlockedByDecoration(x, y, 9, ignoreDecorId)) return false;
    const onBridge = typeof isPointOnBridgeDeck === 'function' && isPointOnBridgeDeck(x, y);
    if (onBridge) return true;
    if (typeof isPointOnGrass === 'function' && !isPointOnGrass(x, y)) return false;
    if (typeof isPointOnWater === 'function' && isPointOnWater(x, y)) return false;
    if (typeof isNearWater === 'function' && isNearWater(x, y, 16)) return false;
    return true;
}

// Helper: Memastikan titik berada di air untuk hewan air / ikan dengan margin pengaman dari daratan/void/pasir
function isWaterSwimmable(x, y, margin = 12, ignoreDecorId = null) {
    if (x < 0 || y < 0 || x >= WORLD_W || y >= WORLD_H) return false;
    if (typeof isPointBlockedByDecoration === 'function' && isPointBlockedByDecoration(x, y, 8, ignoreDecorId)) return false;
    if (typeof isPointOnWater !== 'function') return false;
    if (!isPointOnWater(x, y)) return false;
    if (typeof isPointOnGrass === 'function' && !isPointOnGrass(x, y)) return false;
    if (typeof isPointOnSand === 'function' && isPointOnSand(x, y)) return false;

    if (margin > 0) {
        const d = margin;
        const dDiag = margin * 0.7071;
        if (!isPointOnWater(x + d, y) || !isPointOnWater(x - d, y) ||
            !isPointOnWater(x, y + d) || !isPointOnWater(x, y - d) ||
            !isPointOnWater(x + dDiag, y + dDiag) || !isPointOnWater(x - dDiag, y + dDiag) ||
            !isPointOnWater(x + dDiag, y - dDiag) || !isPointOnWater(x - dDiag, y - dDiag)) {
            return false;
        }
        if (typeof isPointOnGrass === 'function') {
            if (!isPointOnGrass(x + d, y) || !isPointOnGrass(x - d, y) ||
                !isPointOnGrass(x, y + d) || !isPointOnGrass(x, y - d)) {
                return false;
            }
        }
        if (typeof isPointOnSand === 'function') {
            if (isPointOnSand(x + d, y) || isPointOnSand(x - d, y) ||
                isPointOnSand(x, y + d) || isPointOnSand(x, y - d)) {
                return false;
            }
        }
    }
    return true;
}

// Helper: Memeriksa apakah jalur garis lurus bebas dari medan air & void (untuk hewan darat)
function isPathClearOfWater(x1, y1, x2, y2) {
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const steps = Math.max(3, Math.floor(dist / 10));
    for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const px = x1 + (x2 - x1) * t;
        const py = y1 + (y2 - y1) * t;
        if (!isLandWalkable(px, py)) return false;
    }
    return true;
}

// Helper: Memeriksa apakah jalur garis lurus sepenuhnya di air dan berjarak aman dari daratan (untuk ikan)
function isPathClearOfLand(x1, y1, x2, y2) {
    if (typeof isPointOnWater !== 'function') return true;
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const steps = Math.max(3, Math.floor(dist / 10));
    for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const px = x1 + (x2 - x1) * t;
        const py = y1 + (y2 - y1) * t;
        if (!isWaterSwimmable(px, py, 6)) return false;
    }
    return true;
}

/********************************************************************
 * SMART CREATURE-DECOR INTERACTION ENGINE (SMOOTH 60FPS POSES & AI)
 ********************************************************************/

function isAnimalWaterCreature(a) {
    if (!a) return false;
    return (
        a.habitat === 'water' ||
        a.type === 'fish' ||
        a.type === 'turtle' ||
        a.customType === 'moss_turtle' ||
        a.variant === 'moss_turtle' ||
        (a.id && a.id.startsWith('turtle')) ||
        (a.name && (a.name.includes('Kura-kura') || a.name.includes('kura') || a.name.includes('Ikan')))
    );
}
window.isAnimalWaterCreature = isAnimalWaterCreature;

function isAnimalMossTurtle(a) {
    if (!a) return false;
    return (
        a.type === 'turtle' ||
        a.customType === 'moss_turtle' ||
        a.variant === 'moss_turtle' ||
        (a.id && a.id.startsWith('turtle')) ||
        (a.name && (a.name.includes('Kura-kura') || a.name.includes('kura')))
    );
}

function getDecorOccupantCount(decorId, excludeAnimal = null) {
    if (!decorId || typeof animals === 'undefined' || !Array.isArray(animals)) return 0;
    let count = 0;
    for (const other of animals) {
        if (!other || other === excludeAnimal) continue;
        if (
            other.interactingDecorId === decorId ||
            other.targetDecorId === decorId ||
            other.sleepingOnPillowId === decorId ||
            other.targetPillowId === decorId
        ) {
            count++;
        }
    }
    return count;
}
window.getDecorOccupantCount = getDecorOccupantCount;

function isDecorationOccupied(decorId, excludeAnimal = null) {
    return getDecorOccupantCount(decorId, excludeAnimal) >= 1;
}
window.isDecorationOccupied = isDecorationOccupied;

function getTotalActiveDecorInteractions(excludeAnimal = null) {
    if (typeof animals === 'undefined' || !Array.isArray(animals)) return 0;
    let total = 0;
    for (const other of animals) {
        if (!other || other === excludeAnimal) continue;
        if (other.interactingDecorId || other.targetDecorId) {
            total++;
        }
    }
    return total;
}

function isPointNearOtherAnimal(tx, ty, excludeAnimal = null, minDist = 34, includeIdle = false) {
    if (typeof animals === 'undefined' || !Array.isArray(animals)) return false;
    for (const other of animals) {
        if (!other || other === excludeAnimal) continue;
        if (other.type === 'butterfly' || other.habitat === 'flying') continue;
        const otherOccupied =
            Boolean(other.interactingDecorId) ||
            Boolean(other.targetDecorId) ||
            Boolean(other.sleepingOnPillowId) ||
            Boolean(other.targetPillowId) ||
            other.state === 'decor_interact' ||
            other.state === 'sleeping';
        if (includeIdle || otherOccupied) {
            if (Math.hypot(other.x - tx, other.y - ty) < minDist) return true;
        }
        if (
            (other.targetDecorId || other.targetPillowId || (includeIdle && other.state === 'walking')) &&
            typeof other.targetX === 'number' &&
            typeof other.targetY === 'number' &&
            Math.hypot(other.targetX - tx, other.targetY - ty) < minDist
        ) {
            return true;
        }
    }
    return false;
}
window.isPointNearOtherAnimal = isPointNearOtherAnimal;

function pickFreeSideAnchor(d, a, offsetX, offsetY) {
    const preferredSide = (a && typeof a.x === 'number' && a.x < d.x) ? -1 : 1;
    const candidates = [
        { x: d.x + preferredSide * offsetX, y: d.y + offsetY },
        { x: d.x - preferredSide * offsetX, y: d.y + offsetY },
        { x: d.x, y: d.y + Math.max(14, offsetY + 10) }
    ];
    for (const c of candidates) {
        const walkable = typeof isLandWalkable === 'function' ? isLandWalkable(c.x, c.y, d.id) : true;
        if (walkable && !isPointNearOtherAnimal(c.x, c.y, a, 30)) {
            return c;
        }
    }
    return candidates[0];
}

function getDecorInteractionAnchorAndMeta(d, a) {
    if (!d || !a) return null;
    const isWaterAnim = isAnimalWaterCreature(a);
    const isTurtle = isAnimalMossTurtle(a);
    const side = (typeof a.x === 'number' && a.x < d.x) ? -1 : 1;

    // 1. Water Creatures (Moss Turtle & Koi Fish) — Maksimal 1 makhluk per dekorasi air
    if (isWaterAnim) {
        if (d.type === 'golden_lotus') {
            if (isTurtle) {
                return {
                    valid: true,
                    targetX: d.x,
                    targetY: d.y - 2,
                    action: 'basking_lotus',
                    duration: 11.0,
                    bubble: '(っ˘ω˘ς) Berjemur☀️',
                    maxOccupants: 1
                };
            }
            return {
                valid: true,
                targetX: d.x + 22 * side,
                targetY: d.y,
                action: 'circling_lotus',
                duration: 10.0,
                bubble: '(🐟✨) Teratai Emas~',
                maxOccupants: 1
            };
        }
        if (d.type === 'bridge') {
            return {
                valid: true,
                targetX: d.x,
                targetY: d.y + 6,
                action: 'under_bridge_peek',
                duration: 7.5,
                bubble: isTurtle ? '(🐢･ω･) Halo!' : '(🐟･ω･) Halo!',
                maxOccupants: 1
            };
        }
        if (d.type === 'mushroom') {
            return {
                valid: true,
                targetX: d.x + 16 * side,
                targetY: d.y + 6,
                action: 'mushroom_shade',
                duration: 8.5,
                bubble: '(๑˘︶˘๑) Teduh🍄',
                maxOccupants: 1
            };
        }
        return null;
    }

    // 2. Flying Creatures (Butterfly) handled separately in flying AI
    if (a.type === 'butterfly' || a.habitat === 'flying') {
        return null;
    }

    // 3. All Land Animals & Exclusive Pets — Maksimal 1 makhluk per dekorasi agar tidak pernah menumpuk!
    switch (d.type) {
        case 'campfire': {
            const pt = pickFreeSideAnchor(d, a, 28, 6);
            return {
                valid: true,
                targetX: pt.x,
                targetY: pt.y,
                action: 'warming_campfire',
                duration: 9.5,
                bubble: '( ˶˘ ³˘˶) Hangat🔥',
                faceX: d.x,
                maxOccupants: 1
            };
        }
        case 'pet_house':
            return {
                valid: true,
                targetX: d.x,
                targetY: d.y + 5,
                action: 'sheltering_house',
                duration: 10.0,
                bubble: '(｡･ω･｡) Teduh🏠',
                maxOccupants: 1
            };
        case 'gazebo':
            return {
                valid: true,
                targetX: d.x,
                targetY: d.y + 3,
                action: 'sheltering_gazebo',
                duration: 10.5,
                bubble: '(っ˘ω˘ς) Damai✨',
                maxOccupants: 1
            };
        case 'fountain': {
            const pt = pickFreeSideAnchor(d, a, 30, 8);
            return {
                valid: true,
                targetX: pt.x,
                targetY: pt.y,
                action: 'splashing_fountain',
                duration: 8.5,
                bubble: 'Uff! Segar! 💦',
                faceX: d.x,
                maxOccupants: 1
            };
        }
        case 'birdbath':
            if (a.type === 'cat' || a.type === 'exclusive') {
                const pt = pickFreeSideAnchor(d, a, 25, 6);
                return {
                    valid: true,
                    targetX: pt.x,
                    targetY: pt.y,
                    action: 'stalking_bird',
                    duration: 8.5,
                    bubble: '(ФωФ)! 🐦',
                    faceX: d.x,
                    maxOccupants: 1
                };
            }
            {
                const pt = pickFreeSideAnchor(d, a, 24, 6);
                return {
                    valid: true,
                    targetX: pt.x,
                    targetY: pt.y,
                    action: 'watching_birdbath',
                    duration: 8.0,
                    bubble: '(•ө•)♡ Burung Lucu!',
                    faceX: d.x,
                    maxOccupants: 1
                };
            }
        case 'bench':
            if (a.type === 'dog') {
                const pt = pickFreeSideAnchor(d, a, 26, 6);
                return {
                    valid: true,
                    targetX: pt.x,
                    targetY: pt.y,
                    action: 'sitting_bench',
                    duration: 9.0,
                    bubble: '(❍ᴥ❍ʋ) Setia!',
                    faceX: d.x,
                    maxOccupants: 1
                };
            }
            return {
                valid: true,
                targetX: d.x,
                targetY: d.y - 1,
                action: 'lounging_bench',
                duration: 10.0,
                bubble: '(=^･ω･^=) Nyaman~',
                maxOccupants: 1
            };
        case 'tree_swing':
            return {
                valid: true,
                targetX: d.x,
                targetY: d.y - 2,
                action: 'swinging',
                duration: 10.0,
                bubble: '( ˘ ³˘)♪ Ayun~ 🌸',
                maxOccupants: 1
            };
        case 'wind_chime': {
            const pt = pickFreeSideAnchor(d, a, 18, 6);
            return {
                valid: true,
                targetX: pt.x,
                targetY: pt.y,
                action: 'listening_chime',
                duration: 8.0,
                bubble: '(•ㅅ•)? Merdu🎐',
                faceX: d.x,
                maxOccupants: 1
            };
        }
        case 'easel':
            return {
                valid: true,
                targetX: d.x,
                targetY: d.y + 16,
                action: 'admiring_art',
                duration: 8.5,
                bubble: '(🎨˘꒳˘) Indah!',
                faceX: d.x,
                maxOccupants: 1
            };
        case 'picnic_set':
            return {
                valid: true,
                targetX: d.x,
                targetY: d.y + 4,
                action: 'picnic_snack',
                duration: 9.5,
                bubble: '(๑´ڡ`๑) Nyam! 🍵',
                faceX: d.x,
                maxOccupants: 1
            };
        case 'beach_umbrella':
            return {
                valid: true,
                targetX: d.x + 10 * side,
                targetY: d.y + 5,
                action: 'lounging_umbrella',
                duration: 10.0,
                bubble: '(～￣▽￣)～ Adem🏖️',
                maxOccupants: 1
            };
        case 'lantern':
        case 'lantern_mushroom': {
            const pt = pickFreeSideAnchor(d, a, 20, 5);
            return {
                valid: true,
                targetX: pt.x,
                targetY: pt.y,
                action: 'lantern_glow',
                duration: 9.0,
                bubble: '(✨´꒳`✨) Berpendar~',
                faceX: d.x,
                maxOccupants: 1
            };
        }
        case 'flower_arch':
            return {
                valid: true,
                targetX: d.x,
                targetY: d.y + 3,
                action: 'arch_strut',
                duration: 8.0,
                bubble: '(★ω★) Mekar🌸',
                maxOccupants: 1
            };
        case 'windmill': {
            const pt = pickFreeSideAnchor(d, a, 24, 10);
            return {
                valid: true,
                targetX: pt.x,
                targetY: pt.y,
                action: 'watching_windmill',
                duration: 8.5,
                bubble: '(✪ω✪) Berputar🍃',
                faceX: d.x,
                maxOccupants: 1
            };
        }
        case 'wishing_well': {
            const pt = pickFreeSideAnchor(d, a, 22, 5);
            return {
                valid: true,
                targetX: pt.x,
                targetY: pt.y,
                action: 'peering_well',
                duration: 8.5,
                bubble: '(⊙_⊙)! Dalamnya🫧',
                faceX: d.x,
                maxOccupants: 1
            };
        }
        case 'statue': {
            const pt = pickFreeSideAnchor(d, a, 22, 4);
            return {
                valid: true,
                targetX: pt.x,
                targetY: pt.y,
                action: 'booping_statue',
                duration: 8.5,
                bubble: '(•ㅅ•) Boop! 🐰',
                faceX: d.x,
                maxOccupants: 1
            };
        }
        case 'flower_cart': {
            const pt = pickFreeSideAnchor(d, a, 28, 6);
            return {
                valid: true,
                targetX: pt.x,
                targetY: pt.y,
                action: 'sniffing_cart',
                duration: 8.5,
                bubble: '(>o<) Achioo! 🌸',
                faceX: d.x,
                maxOccupants: 1
            };
        }
        case 'stepping_stone':
            return {
                valid: true,
                targetX: d.x,
                targetY: d.y + 2,
                action: 'hopping_stones',
                duration: 7.5,
                bubble: '(ﾉ◕ヮ◕)ﾉ Hop🎵',
                maxOccupants: 1
            };
        case 'mushroom': {
            const pt = pickFreeSideAnchor(d, a, 18, 5);
            return {
                valid: true,
                targetX: pt.x,
                targetY: pt.y,
                action: 'mushroom_shade',
                duration: 9.0,
                bubble: '(๑˘︶˘๑) Payung Jamur🍄',
                faceX: d.x,
                maxOccupants: 1
            };
        }
        case 'fence':
        case 'fence_side':
            if (a.type === 'cat' || a.type === 'exclusive') {
                return {
                    valid: true,
                    targetX: d.x,
                    targetY: d.y,
                    action: 'fence_walk',
                    duration: 8.5,
                    bubble: '(🐾˘꒳˘) Titian~',
                    maxOccupants: 1
                };
            }
            return {
                valid: true,
                targetX: d.x,
                targetY: d.y + 12,
                action: 'peeking_fence',
                duration: 7.5,
                bubble: '(•ᴥ•) Intip!',
                faceX: d.x,
                maxOccupants: 1
            };
        case 'sandcastle': {
            const pt = pickFreeSideAnchor(d, a, 26, 6);
            return {
                valid: true,
                targetX: pt.x,
                targetY: pt.y,
                action: 'admiring_castle',
                duration: 8.0,
                bubble: '(✧ω✧) Kastil Pasir🏰',
                faceX: d.x,
                maxOccupants: 1
            };
        }
        default:
            if (d.isCustomProp || d.type === 'custom_prop') {
                const pt = pickFreeSideAnchor(d, a, 22, 5);
                return {
                    valid: true,
                    targetX: pt.x,
                    targetY: pt.y,
                    action: 'admiring_art',
                    duration: 8.5,
                    bubble: '(✨•ㅅ•) Bagus!',
                    faceX: d.x,
                    maxOccupants: 1
                };
            }
            return null;
    }
}

/**
 * Menghitung transformasi animasi 60fps yang mulus (dx, dy, rot, scaleX, scaleY)
 * untuk hewan yang sedang berinteraksi dengan dekorasi.
 */
function getAnimalDecorTransform(a, now) {
    if (!a) return null;
    const f = a.interactFade || 0;
    if (f <= 0.005 || !a.decorAction) return null;

    // Smooth cubic ease-in-out for zero-pop entry and exit
    const ease = f * f * (3 - 2 * f);
    const t = now * 0.001;
    const action = a.decorAction;

    let dx = 0;
    let dy = 0;
    let rot = 0;
    let sx = 1.0;
    let sy = 1.0;

    switch (action) {
        case 'swinging': {
            // Synchronized pendulum swing with drawRealisticTreeSwing
            const swayAngle = Math.sin(now * 0.0032) * 0.24;
            dx = -Math.sin(swayAngle) * 34;
            dy = -10 - (1 - Math.cos(swayAngle)) * 28;
            rot = swayAngle * 0.65;
            break;
        }
        case 'lounging_bench': {
            dy = -11 + Math.sin(t * 3.2) * 0.9;
            sx = 1.04 + Math.sin(t * 3.2) * 0.025;
            sy = 0.94 - Math.sin(t * 3.2) * 0.025;
            break;
        }
        case 'sitting_bench': {
            dy = -Math.abs(Math.sin(t * 4.5)) * 2.5;
            rot = Math.sin(t * 4.5) * 0.06;
            break;
        }
        case 'fence_walk': {
            const decList = (typeof decorations !== 'undefined' && Array.isArray(decorations)) ? decorations : [];
            const d = decList.find(dec => dec.id === a.interactingDecorId);
            const isVertical = d && (d.type === 'fence_side' || d.rotation === 90 || d.rotation === 270);
            const walkPhase = t * 2.1;
            if (isVertical) {
                dy = -12 + Math.sin(walkPhase) * 14 - Math.abs(Math.sin(t * 7.0)) * 2.2;
            } else {
                dx = Math.sin(walkPhase) * 16;
                dy = -15 - Math.abs(Math.sin(t * 7.0)) * 2.2;
                a.facingLeft = Math.cos(walkPhase) < 0;
            }
            rot = Math.sin(t * 8.0) * 0.07;
            break;
        }
        case 'peeking_fence': {
            dy = -Math.abs(Math.sin(t * 4.2)) * 5.0;
            sy = 1.0 + Math.abs(Math.sin(t * 4.2)) * 0.06;
            break;
        }
        case 'stalking_bird': {
            // Cute low cat crouch + rapid butt wiggle + occasional pounce hop
            const cycle = (t * 1.8) % (Math.PI * 2);
            if (cycle < 4.5) {
                sx = 1.12;
                sy = 0.82;
                dx = Math.sin(t * 24) * 1.4;
                dy = 2.5;
                rot = Math.sin(t * 20) * 0.05;
            } else {
                const hopT = (cycle - 4.5) / (Math.PI * 2 - 4.5);
                dy = -Math.sin(hopT * Math.PI) * 9.0;
                sx = 0.95;
                sy = 1.08;
            }
            break;
        }
        case 'watching_birdbath':
        case 'admiring_art':
        case 'admiring_castle': {
            rot = Math.sin(t * 3.2) * 0.09;
            dy = -Math.abs(Math.sin(t * 3.2)) * 2.2;
            break;
        }
        case 'splashing_fountain': {
            dy = -Math.abs(Math.sin(t * 7.5)) * 6.5;
            rot = Math.sin(t * 7.5) * 0.11;
            sx = 1.0 - Math.abs(Math.sin(t * 7.5)) * 0.05;
            sy = 1.0 + Math.abs(Math.sin(t * 7.5)) * 0.06;
            break;
        }
        case 'warming_campfire':
        case 'lantern_glow':
        case 'mushroom_shade': {
            dx = Math.sin(t * 2.8) * 1.4;
            dy = Math.sin(t * 5.6) * 0.8;
            sx = 1.03 + Math.sin(t * 3.5) * 0.025;
            sy = 0.96 - Math.sin(t * 3.5) * 0.025;
            break;
        }
        case 'sheltering_house': {
            dy = -2.0 + Math.sin(t * 3.2) * 1.2;
            rot = Math.sin(t * 2.2) * 0.08;
            sx = 0.93;
            sy = 0.93;
            break;
        }
        case 'sheltering_gazebo':
        case 'lounging_umbrella': {
            dy = -3.0 + Math.sin(t * 3.0 + (a.x || 0)) * 1.0;
            sx = 1.03 + Math.sin(t * 3.0) * 0.02;
            sy = 0.95 - Math.sin(t * 3.0) * 0.02;
            break;
        }
        case 'listening_chime': {
            rot = Math.sin(t * 4.2) * 0.14;
            dy = -Math.abs(Math.cos(t * 4.2)) * 2.5;
            break;
        }
        case 'picnic_snack': {
            dy = -Math.abs(Math.sin(t * 8.0)) * 2.8;
            sy = 0.95 + Math.abs(Math.sin(t * 8.0)) * 0.08;
            sx = 1.03 - Math.abs(Math.sin(t * 8.0)) * 0.04;
            break;
        }
        case 'arch_strut': {
            dx = Math.sin(t * 3.2) * 12;
            dy = -Math.abs(Math.sin(t * 9.5)) * 5.5;
            a.facingLeft = Math.cos(t * 3.2) < 0;
            rot = Math.sin(t * 9.5) * 0.08;
            break;
        }
        case 'watching_windmill': {
            dy = -Math.abs(Math.sin(t * 5.2)) * 4.5;
            sy = 1.08 + Math.sin(t * 5.2) * 0.04;
            sx = 0.94;
            break;
        }
        case 'peering_well': {
            const wCycle = (t * 2.2) % (Math.PI * 2);
            if (wCycle < 4.4) {
                dx = (a.facingLeft ? -1 : 1) * Math.sin(wCycle * 0.7) * 3.5;
                rot = (a.facingLeft ? -1 : 1) * 0.11;
            } else {
                const jT = (wCycle - 4.4) / (Math.PI * 2 - 4.4);
                dy = -Math.sin(jT * Math.PI) * 8.5;
            }
            break;
        }
        case 'booping_statue': {
            const bPhase = Math.abs(Math.sin(t * 4.5));
            dx = (a.facingLeft ? -1 : 1) * bPhase * 4.8;
            dy = -bPhase * 2.0;
            rot = (a.facingLeft ? -1 : 1) * bPhase * 0.11;
            break;
        }
        case 'sniffing_cart': {
            const sCycle = (t * 2.4) % (Math.PI * 2);
            if (sCycle < 4.6) {
                sy = 0.96 + Math.sin(t * 18) * 0.04;
                dx = (a.facingLeft ? -1 : 1) * 2.2;
            } else {
                const snz = (sCycle - 4.6) / (Math.PI * 2 - 4.6);
                dy = -Math.sin(snz * Math.PI) * 10.0;
                rot = (a.facingLeft ? 1 : -1) * Math.sin(snz * Math.PI) * 0.16;
            }
            break;
        }
        case 'hopping_stones': {
            dx = Math.sin(t * 3.4) * 14;
            dy = -Math.abs(Math.sin(t * 6.8)) * 7.0;
            a.facingLeft = Math.cos(t * 3.4) < 0;
            break;
        }
        case 'basking_lotus': {
            dy = -5.0 + Math.sin(t * 2.8) * 0.9;
            sx = 1.04 + Math.sin(t * 2.8) * 0.02;
            sy = 0.97 - Math.sin(t * 2.8) * 0.02;
            break;
        }
        case 'under_bridge_peek': {
            dy = Math.sin(t * 3.8) * 2.0;
            rot = Math.sin(t * 3.8) * 0.08;
            break;
        }
        default:
            break;
    }

    return {
        active: true,
        dx: dx * ease,
        dy: dy * ease,
        rot: rot * ease,
        scaleX: 1.0 + (sx - 1.0) * ease,
        scaleY: 1.0 + (sy - 1.0) * ease
    };
}
window.getAnimalDecorTransform = getAnimalDecorTransform;

function emitDecorInteractionParticles(a, d, dt, now) {
    if (!a || !d || typeof particles === 'undefined') return;
    a.decorParticleTimer = (a.decorParticleTimer || 0) - dt;
    if (a.decorParticleTimer > 0) return;
    a.decorParticleTimer = 0.45 + Math.random() * 0.45;

    const act = a.decorAction;
    if (act === 'swinging' || act === 'arch_strut') {
        particles.push({
            type: 'sparkle',
            x: d.x + (Math.random() - 0.5) * 32,
            y: d.y - 28 + (Math.random() - 0.5) * 12,
            vx: (Math.random() - 0.5) * 1.1,
            vy: 0.7 + Math.random() * 0.8,
            size: 3.2,
            color: Math.random() < 0.5 ? '#F472B6' : '#FB7185',
            alpha: 0.95
        });
    } else if (act === 'splashing_fountain' || act === 'peering_well' || act === 'stalking_bird' || act === 'watching_birdbath') {
        particles.push({
            type: 'bubble',
            x: d.x + (Math.random() - 0.5) * 20,
            y: d.y - 12 + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.4,
            vy: -1.2 - Math.random() * 1.0,
            size: 2.5 + Math.random() * 2.0,
            alpha: 0.85
        });
    } else if (act === 'sniffing_cart') {
        particles.push({
            type: 'sparkle',
            x: a.x + (Math.random() - 0.5) * 16,
            y: a.y - 10,
            vx: (Math.random() - 0.5) * 1.6,
            vy: -1.0 - Math.random() * 1.2,
            size: 3.0,
            color: '#FACC15',
            alpha: 0.95
        });
    } else if (act === 'listening_chime' || act === 'watching_windmill') {
        particles.push({
            type: 'sparkle',
            x: d.x + (Math.random() - 0.5) * 24,
            y: d.y - 18 + (Math.random() - 0.5) * 10,
            vx: 0.8 + Math.random() * 0.8,
            vy: -0.6 - Math.random() * 0.6,
            size: 2.8,
            color: '#34D399',
            alpha: 0.9
        });
    } else if (act === 'basking_lotus' || act === 'circling_lotus' || act === 'lantern_glow' || act === 'mushroom_shade') {
        particles.push({
            type: 'sparkle',
            x: a.x + (Math.random() - 0.5) * 20,
            y: a.y - 8 + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -0.9 - Math.random() * 0.8,
            size: 2.8,
            color: '#FBBF24',
            alpha: 0.92
        });
    } else {
        particles.push({
            type: 'heart',
            x: a.x + (Math.random() - 0.5) * 16,
            y: a.y - 16,
            vx: (Math.random() - 0.5) * 0.7,
            vy: -1.1 - Math.random() * 0.6,
            size: 9 + Math.random() * 3,
            alpha: 0.95
        });
    }
}

/**
 * Mengundang makhluk hidup terdekat yang cocok untuk datang berinteraksi dengan dekorasi `d`.
 */
function inviteCreatureToDecoration(d) {
    if (!d || typeof animals === 'undefined' || !Array.isArray(animals)) return null;
    d.interactBounce = 1.0;

    if (d.type === 'pet_pillow') {
        if (typeof handlePillowTap === 'function') handlePillowTap(d);
        return null;
    }

    // STRICT LIMIT: Jika dekorasi ini sudah ditempati atau sedang dituju oleh hewan lain,
    // JANGAN mengundang hewan kedua agar tidak terjadi penumpukan karakter!
    if (isDecorationOccupied(d.id)) {
        const currentOccupant = animals.find(a =>
            a && !a.isBeingDragged && (a.interactingDecorId === d.id || a.targetDecorId === d.id)
        );
        if (currentOccupant) {
            currentOccupant.petAnim = 0.75;
            if (currentOccupant.state === 'decor_interact') {
                const meta = currentOccupant.pendingDecorMeta || getDecorInteractionAnchorAndMeta(d, currentOccupant);
                if (meta && meta.bubble) {
                    currentOccupant.bubbleText = meta.bubble;
                    currentOccupant.bubbleTimer = 3.0;
                }
            }
            return currentOccupant;
        }
        return null;
    }

    const candidates = animals.filter(a => {
        if (!a || a.isBeingDragged || a.state === 'sleeping' || a.state === 'decor_interact') return false;
        if (a.interactingDecorId || a.targetDecorId || a.targetPillowId || a.sleepingOnPillowId) return false;
        const meta = getDecorInteractionAnchorAndMeta(d, a);
        if (!meta || !meta.valid) return false;
        if (isPointNearOtherAnimal(meta.targetX, meta.targetY, a, 32)) return false;
        return true;
    });

    if (candidates.length === 0) return null;

    candidates.sort((a, b) => Math.hypot(a.x - d.x, a.y - d.y) - Math.hypot(b.x - d.x, b.y - d.y));
    const chosen = candidates[0];
    const meta = getDecorInteractionAnchorAndMeta(d, chosen);
    if (!meta || !meta.valid) return null;

    chosen.targetDecorId = d.id;
    chosen.interactingDecorId = null;
    chosen.decorAction = null;
    chosen.targetPillowId = null;
    chosen.sleepingOnPillowId = null;
    chosen.pendingDecorMeta = meta;
    chosen.decorAnchorX = meta.targetX;
    chosen.decorAnchorY = meta.targetY;
    chosen.targetX = meta.targetX;
    chosen.targetY = meta.targetY;
    chosen.state = 'walking';
    chosen.stateTimer = 10.0;
    chosen.facingLeft = meta.targetX < chosen.x;
    chosen.bubbleText = meta.bubble;
    chosen.bubbleTimer = 2.6;
    return chosen;
}
window.inviteCreatureToDecoration = inviteCreatureToDecoration;

function updateAnimals(dt, now) {
    if (!now) now = performance.now() * 0.001;
    const cx = WORLD_W * 0.5;
    const cy = WORLD_H * 0.52;

    for (let i = animals.length - 1; i >= 0; i--) {
        const a = animals[i];
        if (!a) continue;
        if (a.bubbleTimer > 0) {
            a.bubbleTimer -= dt;
            if (a.bubbleTimer <= 0) {
                a.bubbleText = '';
            }
        }

        if (a.petAnim > 0) {
            a.petAnim = Math.max(0, a.petAnim - dt * 2.2);
        }

        // If currently being dragged by player: stays terrified!
        if (a.isBeingDragged) {
            a.sleepingOnPillowId = null;
            a.targetPillowId = null;
            a.interactingDecorId = null;
            a.targetDecorId = null;
            a.decorAction = null;
            a.interactFade = 0;
            a.state = 'scared';
            a.bubbleText = '(⸝⸝๑﹏๑⸝⸝)';
            a.bubbleTimer = 0.5;
            continue;
        }

        // Smooth fade in/out for decoration pose animations (zero snap!)
        if (a.state === 'decor_interact' && a.interactingDecorId) {
            a.interactFade = Math.min(1, (a.interactFade || 0) + dt * 3.8);
        } else {
            a.interactFade = Math.max(0, (a.interactFade || 0) - dt * 3.8);
        }

        const activeDecorList = (typeof decorations !== 'undefined' && Array.isArray(decorations))
            ? decorations
            : ((typeof window !== 'undefined' && Array.isArray(window.decorations)) ? window.decorations : []);

        const habitat = a.habitat || (isAnimalWaterCreature(a) ? 'water' : (a.type === 'butterfly' ? 'flying' : 'land'));

        // ==========================================
        // 1. FISH & AQUATIC ANIMALS AI (HEWAN AIR)
        // Ikan & Kura-kura HANYA bisa ada di medan air yang aman!
        // ==========================================
        if (habitat === 'water' || isAnimalWaterCreature(a)) {
            a.swimPhase = (a.swimPhase || 0) + dt * 5.5;

            // Occasional bubble popping from mouth
            if (Math.random() < 0.04) {
                particles.push({
                    type: 'bubble',
                    x: a.x + (a.facingLeft ? -10 : 10),
                    y: a.y - 2,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: -0.9 - Math.random() * 0.6,
                    size: 3 + Math.random() * 3,
                    alpha: 0.8
                });
            }

            const inWaterNow = isWaterSwimmable(a.x, a.y, 4, a.targetDecorId || a.interactingDecorId);
            if (!inWaterNow) {
                // Stranded on land or void! Scared and rescued immediately!
                a.interactingDecorId = null;
                a.targetDecorId = null;
                a.decorAction = null;
                a.state = 'scared';
                a.bubbleText = '.·°՞(っ-ᯅ-ς)՞°·.';
                a.bubbleTimer = 2.0;

                // 1. Search locally around fish
                let safeWater = null;
                for (let r = 8; r <= 360; r += 12) {
                    for (let ang = 0; ang < Math.PI * 2; ang += Math.PI / 8) {
                        const sx = a.x + Math.cos(ang) * r;
                        const sy = a.y + Math.sin(ang) * r;
                        if (isWaterSwimmable(sx, sy, 8)) {
                            safeWater = { x: sx, y: sy };
                            break;
                        }
                    }
                    if (safeWater) break;
                }

                // 2. If no water nearby (e.g. fish placed far in void), scan island for nearest swimmable water
                if (!safeWater) {
                    let bestDistSq = Infinity;
                    for (let rx = 200; rx <= WORLD_W - 200; rx += 60) {
                        for (let ry = 200; ry <= WORLD_H - 200; ry += 60) {
                            if (isWaterSwimmable(rx, ry, 8)) {
                                const dSq = (rx - a.x) * (rx - a.x) + (ry - a.y) * (ry - a.y);
                                if (dSq < bestDistSq) {
                                    bestDistSq = dSq;
                                    safeWater = { x: rx, y: ry };
                                }
                            }
                        }
                    }
                }

                if (safeWater) {
                    a.x = safeWater.x;
                    a.y = safeWater.y;
                    a.targetX = safeWater.x;
                    a.targetY = safeWater.y;
                    a.stateTimer = 1.0;
                    if (typeof createWaterSplash === 'function') {
                        createWaterSplash(a.x, a.y, 5);
                    }
                }
                continue;
            }

            a.stateTimer = (a.stateTimer || 0) - dt;
            if (a.decorCooldown > 0) a.decorCooldown = Math.max(0, a.decorCooldown - dt);

            // Active Water Decor Interaction (Basking on Golden Lotus / Circling Lotus / Under Bridge)
            if (a.state === 'decor_interact' && a.interactingDecorId) {
                const dec = activeDecorList.find(d => d.id === a.interactingDecorId);
                const isDragged = (typeof draggedDecoration !== 'undefined' && draggedDecoration && draggedDecoration.id === a.interactingDecorId);
                if (!dec || isDragged || a.stateTimer <= 0) {
                    a.interactingDecorId = null;
                    a.pendingDecorMeta = null;
                    a.decorAction = null;
                    a.decorCooldown = 12 + Math.random() * 8;
                    a.state = 'idle';
                    a.stateTimer = 1.8;
                } else {
                    emitDecorInteractionParticles(a, dec, dt, now);
                    if (a.decorAction === 'circling_lotus') {
                        a.orbitAngle = (a.orbitAngle || 0) + dt * 1.35;
                        const ox = dec.x + Math.cos(a.orbitAngle) * 24;
                        const oy = dec.y + Math.sin(a.orbitAngle) * 14;
                        if (isWaterSwimmable(ox, oy, 4, dec.id)) {
                            a.x += (ox - a.x) * Math.min(1, dt * 6.0);
                            a.y += (oy - a.y) * Math.min(1, dt * 6.0);
                            a.facingLeft = Math.sin(a.orbitAngle) > 0;
                        }
                    } else if (a.decorAction === 'basking_lotus') {
                        a.x += (dec.x - a.x) * Math.min(1, dt * 5.0);
                        a.y += ((dec.y - 2) - a.y) * Math.min(1, dt * 5.0);
                    }
                    continue;
                }
            }

            if (a.stateTimer <= 0 && inWaterNow) {
                let targetedWaterDecor = false;
                if (activeDecorList.length > 0 && (a.decorCooldown || 0) <= 0 && getTotalActiveDecorInteractions(a) < 3 && Math.random() < 0.45) {
                    const waterDecors = activeDecorList.filter(d =>
                        (d.type === 'golden_lotus' || d.type === 'bridge') &&
                        !isDecorationOccupied(d.id, a) &&
                        Math.hypot(d.x - a.x, d.y - a.y) < 220 &&
                        isWaterSwimmable(d.x, d.y, 4, d.id)
                    );
                    if (waterDecors.length > 0) {
                        const chosenD = waterDecors[Math.floor(Math.random() * waterDecors.length)];
                        const meta = getDecorInteractionAnchorAndMeta(chosenD, a);
                        if (meta && meta.valid && !isDecorationOccupied(chosenD.id, a) && !isPointNearOtherAnimal(meta.targetX, meta.targetY, a, 28)) {
                            a.targetDecorId = chosenD.id;
                            a.pendingDecorMeta = meta;
                            a.decorAnchorX = meta.targetX;
                            a.decorAnchorY = meta.targetY;
                            a.targetX = meta.targetX;
                            a.targetY = meta.targetY;
                            a.state = 'walking';
                            a.stateTimer = 7.0;
                            a.facingLeft = meta.targetX < a.x;
                            targetedWaterDecor = true;
                        }
                    }
                }

                if (!targetedWaterDecor) {
                    // Pick another spot inside water body with safe boundary clearance & away from other fish/turtles
                    let foundSpot = false;
                    for (let t = 0; t < 25; t++) {
                        const ang = Math.random() * Math.PI * 2;
                        const dist = 24 + Math.random() * 95;
                        const tx = a.x + Math.cos(ang) * dist;
                        const ty = a.y + Math.sin(ang) * dist * 0.6;
                        if (isWaterSwimmable(tx, ty, 16) && isPathClearOfLand(a.x, a.y, tx, ty) && !isPointNearOtherAnimal(tx, ty, a, 28)) {
                            a.targetX = tx;
                            a.targetY = ty;
                            a.state = 'walking';
                            a.stateTimer = 3.5 + Math.random() * 3.5;
                            a.facingLeft = tx < a.x;
                            foundSpot = true;
                            break;
                        }
                    }
                    if (!foundSpot) {
                        a.state = 'idle';
                        a.stateTimer = 1.2 + Math.random() * 1.8;
                    }
                }
            }

            // Move smoothly in water
            const dx = (a.targetX !== undefined ? a.targetX : a.x) - a.x;
            const dy = (a.targetY !== undefined ? a.targetY : a.y) - a.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 6) {
                a.x = a.targetX || a.x;
                a.y = a.targetY || a.y;
                if (a.targetDecorId) {
                    const dec = activeDecorList.find(d => d.id === a.targetDecorId);
                    const meta = dec ? (a.pendingDecorMeta || getDecorInteractionAnchorAndMeta(dec, a)) : null;
                    if (dec && meta && !isDecorationOccupied(dec.id, a) && !isPointNearOtherAnimal(a.x, a.y, a, 26)) {
                        a.interactingDecorId = dec.id;
                        a.targetDecorId = null;
                        a.decorAction = meta.action;
                        a.state = 'decor_interact';
                        a.stateTimer = meta.duration;
                        a.bubbleText = meta.bubble;
                        a.bubbleTimer = 3.6;
                        a.orbitAngle = Math.atan2(a.y - dec.y, a.x - dec.x);
                        dec.interactBounce = 0.8;
                    } else {
                        a.targetDecorId = null;
                        a.pendingDecorMeta = null;
                        a.state = 'idle';
                    }
                } else {
                    a.state = 'idle';
                }
            } else {
                const speed = 28;
                const step = Math.min(dist, speed * dt);
                const nx = a.x + (dx / dist) * step;
                const ny = a.y + (dy / dist) * step;
                // STRICT: Fish can only advance if the new coordinate is safely inside swimmable water!
                if (isWaterSwimmable(nx, ny, a.targetDecorId ? 4 : 12, a.targetDecorId)) {
                    a.x = nx;
                    a.y = ny;
                    a.facingLeft = dx < 0;
                } else {
                    // Reached boundary, stop and pick another target
                    a.targetDecorId = null;
                    a.state = 'idle';
                    a.stateTimer = 0;
                }
            }
            continue;
        }

        // ==========================================
        // 2. BUTTERFLY & FLYING ANIMALS AI (HEWAN TERBANG)
        // Bisa terbang melintasi darat & perairan, tetap di batas kebun
        // ==========================================
        if (habitat === 'flying' || a.type === 'butterfly') {
            a.wingPhase += dt * (a.wingSpeed || 20);

            if (a.state === 'perched') {
                a.perchTimer -= dt;
                a.wingSpeed = 5;
                if (a.perchedDecorId) {
                    const pDec = activeDecorList.find(d => d.id === a.perchedDecorId);
                    if (pDec) {
                        // Graceful figure-8 hover around floral/lantern/water decorations
                        a.x += Math.sin(now * 0.0045 + (a.colorHue || 0)) * 0.25;
                        a.y += Math.cos(now * 0.0065 + (a.colorHue || 0)) * 0.18;
                    }
                }
                // Feature 6: Butterfly Pollination & Decor sparkles while perched
                if (Math.random() < 0.16 && typeof particles !== 'undefined') {
                    particles.push({
                        type: 'sparkle',
                        x: a.x + (Math.random() - 0.5) * 16,
                        y: a.y + (Math.random() - 0.5) * 12,
                        vx: (Math.random() - 0.5) * 0.8,
                        vy: -0.6 - Math.random() * 0.8,
                        size: 3.2,
                        color: a.perchedDecorId ? '#F472B6' : '#FACC15',
                        alpha: 1.0
                    });
                }
                if (a.perchTimer <= 0) {
                    a.state = 'flying';
                    // 35% chance to drop pollinated organic seed!
                    if (a.perchedFlowerId && typeof spawnDroppedSeedFromPollination === 'function' && Math.random() < 0.40) {
                        spawnDroppedSeedFromPollination(a.x, a.y + 12, a.perchedFlowerId);
                    }
                    a.perchedFlowerId = null;
                    a.perchedDecorId = null;
                }
            } else {
                const tSec = now * 0.001;
                a.wingSpeed = 14 + Math.sin(tSec * 2.5) * 3;
                a.hopPhase = (a.hopPhase || 0) + dt * 5.2;
                a.tailPhase = (a.tailPhase || 0) + dt * 2.4;
                a.stateTimer = (a.stateTimer || 0) - dt;

                if (a.stateTimer <= 0) {
                    a.stateTimer = 2.5 + Math.random() * 3.0;

                    let targetedSpot = false;
                    const isNightNow = (typeof isNightMode !== 'undefined' && isNightMode) || (typeof nightTransition !== 'undefined' && nightTransition > 0.5);

                    // Check attractive decorations for butterflies (lanterns at night, floral/fountains by day)
                    if (activeDecorList.length > 0 && Math.random() < 0.48) {
                        const flyDecors = activeDecorList.filter(d =>
                            isNightNow
                                ? ['lantern', 'lantern_mushroom', 'campfire', 'golden_lotus'].includes(d.type)
                                : ['flower_arch', 'flower_cart', 'tree_swing', 'fountain', 'birdbath', 'golden_lotus', 'windmill'].includes(d.type)
                        );
                        if (flyDecors.length > 0) {
                            const d = flyDecors[Math.floor(Math.random() * flyDecors.length)];
                            a.targetX = d.x + (Math.random() - 0.5) * 18;
                            a.targetY = d.y - 22 + (Math.random() - 0.5) * 10;
                            a.perchedDecorId = d.id;
                            a.perchedFlowerId = null;
                            targetedSpot = true;
                        }
                    }

                    if (!targetedSpot && flowers.length > 0 && Math.random() < 0.50) {
                        const candidate = flowers[Math.floor(Math.random() * flowers.length)];
                        if (candidate) {
                            a.targetX = candidate.x + (Math.random() - 0.5) * 8;
                            a.targetY = candidate.y - candidate.height * 0.75;
                            a.perchedFlowerId = candidate.id;
                            a.perchedDecorId = null;
                            targetedSpot = true;
                        }
                    }

                    if (!targetedSpot) {
                        // Wander across land and water (within garden)
                        for (let t = 0; t < 15; t++) {
                            const angle = Math.random() * Math.PI * 2;
                            const dist = 40 + Math.random() * 140;
                            const tx = a.x + Math.cos(angle) * dist;
                            const ty = a.y + Math.sin(angle) * dist * 0.6;
                            const onG = typeof isPointOnGrass === 'function' && isPointOnGrass(tx, ty);
                            const onW = typeof isPointOnWater === 'function' && isPointOnWater(tx, ty);
                            if (onG || onW) {
                                a.targetX = tx;
                                a.targetY = ty;
                                break;
                            }
                        }
                    }
                }

                const dx = a.targetX - a.x;
                const dy = a.targetY - a.y;
                const dist = Math.hypot(dx, dy);

                if (dist < 6) {
                    if (a.perchedFlowerId || a.perchedDecorId) {
                        a.state = 'perched';
                        a.perchTimer = 3.0 + Math.random() * 4.0;
                        if (a.perchedDecorId) {
                            a.bubbleText = '(🦋✨)';
                            a.bubbleTimer = 2.2;
                        }
                    } else {
                        a.stateTimer = 0;
                    }
                } else {
                    const speed = a.type === 'exclusive' ? 34 : 42;
                    a.vx = (dx / dist) * speed;
                    a.vy = (dy / dist) * speed;
                    a.x += a.vx * dt;
                    a.y += a.vy * dt + Math.sin(now * 0.0035 + (a.colorHue || 0)) * 0.35;
                    a.facingLeft = dx < 0;
                }

                // If strayed outside garden island, steer back to center
                const curGrass = typeof isPointOnGrass === 'function' && isPointOnGrass(a.x, a.y);
                const curWater = typeof isPointOnWater === 'function' && isPointOnWater(a.x, a.y);
                if (!curGrass && !curWater) {
                    a.targetX = cx;
                    a.targetY = cy;
                    a.stateTimer = 3.0;
                }
            }
            continue;
        }

        // ==========================================
        // 3. CAT, DOG, RABBIT, EXCLUSIVE & CUSTOM LAND ANIMALS (HEWAN DARAT)
        // Hewan darat TIDAK BISA melintasi daerah air (kecuali di atas jembatan) atau menembus dekorasi
        // ==========================================
        const onBridgeNow = typeof isPointOnBridgeDeck === 'function' && isPointOnBridgeDeck(a.x, a.y);
        const currentlyOnWater = !onBridgeNow && typeof isPointOnWater === 'function' && isPointOnWater(a.x, a.y);
        const currentlyOffGrass = !onBridgeNow && typeof isPointOnGrass === 'function' && !isPointOnGrass(a.x, a.y);

        if (currentlyOnWater || currentlyOffGrass) {
            // Coba selamatkan hewan ke rumput kering terdekat bila tanahnya baru saja diganti air
            a.interactingDecorId = null;
            a.targetDecorId = null;
            a.decorAction = null;
            let safeSpot = null;
            if (typeof isPointOnGrass === 'function' && typeof isPointOnWater === 'function') {
                for (let r = 24; r <= 140; r += 20) {
                    for (let ang = 0; ang < Math.PI * 2; ang += Math.PI / 4) {
                        const sx = a.x + Math.cos(ang) * r;
                        const sy = a.y + Math.sin(ang) * r;
                        if (isPointOnGrass(sx, sy) && !isPointOnWater(sx, sy)) {
                            safeSpot = { x: sx, y: sy };
                            break;
                        }
                    }
                    if (safeSpot) break;
                }
            }

            if (safeSpot) {
                a.x = safeSpot.x;
                a.y = safeSpot.y;
                a.targetX = safeSpot.x;
                a.targetY = safeSpot.y;
                a.state = 'scared';
                a.stateTimer = 2.0;
                a.bubbleText = '💦 (⊙_⊙;) !';
                a.bubbleTimer = 2.2;
                if (typeof createWaterSplash === 'function') {
                    createWaterSplash(a.x, a.y, 4);
                }
                continue;
            }

            // Bila tidak ada rumput sama sekali di sekitar -> Animasi jatuh dan menghilang
            if (typeof triggerFallingLandAnimal === 'function') {
                triggerFallingLandAnimal(a, currentlyOnWater);
            }
            animals.splice(i, 1);
            if (typeof followedAnimal !== 'undefined' && followedAnimal === a) {
                if (typeof stopFollowingAnimal === 'function') stopFollowingAnimal();
            }
            if (typeof showGardenNotice === 'function') {
                showGardenNotice(`${a.name} terjatuh dan kembali beristirahat! 🐾`);
            }
            if (typeof updateAnimalsBadge === 'function') {
                updateAnimalsBadge();
            }
            continue;
        }

        // Ensure sleepiness properties exist on land animals
        if (a.sleepiness === undefined) a.sleepiness = Math.random() * 30;
        if (a.sleepinessRate === undefined) a.sleepinessRate = 0.8 + Math.random() * 0.5;
        if (a.napCooldown === undefined) a.napCooldown = 20;
        if (a.zzzTimer === undefined) a.zzzTimer = 0;

        // Sleepiness accumulation while awake
        if (a.state !== 'sleeping') {
            if (a.napCooldown > 0) {
                a.napCooldown -= dt;
            } else {
                a.sleepiness = Math.min(100, (a.sleepiness || 0) + dt * (a.sleepinessRate || 1.0));
            }
        }

        a.stateTimer -= dt;
        if (a.decorCooldown > 0) a.decorCooldown = Math.max(0, a.decorCooldown - dt);

        // If currently performing a rich decoration interaction:
        if (a.state === 'decor_interact') {
            const dec = activeDecorList.find(d => d.id === a.interactingDecorId);
            const isDecDragged = (typeof draggedDecoration !== 'undefined' && draggedDecoration && draggedDecoration.id === a.interactingDecorId);
            if (!dec || isDecDragged || a.stateTimer <= 0) {
                a.interactingDecorId = null;
                a.pendingDecorMeta = null;
                a.decorAction = null;
                a.decorCooldown = 14 + Math.random() * 10;
                a.state = 'happy';
                a.stateTimer = 1.8;
                // Step slightly away from the decoration after finishing interaction
                const leaveAng = Math.random() * Math.PI * 2;
                const lx = a.x + Math.cos(leaveAng) * 36;
                const ly = a.y + Math.sin(leaveAng) * 28;
                if (isLandWalkable(lx, ly) && !isPointNearOtherAnimal(lx, ly, a, 30)) {
                    a.targetX = lx;
                    a.targetY = ly;
                    a.state = 'walking';
                    a.stateTimer = 2.8;
                    a.facingLeft = lx < a.x;
                }
            } else {
                a.tailPhase = (a.tailPhase || 0) + dt * 2.4;
                emitDecorInteractionParticles(a, dec, dt, now);
                continue;
            }
        }

        // Bridge crossing waypoints check
        if (a.stateTimer <= 0 && a.bridgeWaypoints && a.bridgeWaypoints.length > 0) {
            const nextWp = a.bridgeWaypoints.shift();
            a.targetX = nextWp.x;
            a.targetY = nextWp.y;
            a.state = 'walking';
            a.stateTimer = 5.0;
            a.facingLeft = nextWp.x < a.x;
        } else if (a.stateTimer <= 0 && !currentlyOnWater && !currentlyOffGrass) {
            if (a.state === 'walking') {
                a.state = 'idle';
                a.stateTimer = 1.5 + Math.random() * 2.5;
            } else {
                let targetedBridge = false;
                // If near bridge, chance to cross bridge across river/pond!
                if (activeDecorList.length > 0 && Math.random() < 0.35) {
                    const bridges = activeDecorList.filter(d => d.type === 'bridge');
                    for (const b of bridges) {
                        const distToBridge = Math.hypot(a.x - b.x, a.y - b.y);
                        if (distToBridge < 160 && typeof getBridgeCrossingWaypoints === 'function') {
                            const wps = getBridgeCrossingWaypoints(b, a.x, a.y);
                            if (wps && wps.length > 0) {
                                a.bridgeWaypoints = wps.slice();
                                const firstWp = a.bridgeWaypoints.shift();
                                a.targetX = firstWp.x;
                                a.targetY = firstWp.y;
                                a.state = 'walking';
                                a.stateTimer = 6.0;
                                a.facingLeft = firstWp.x < a.x;
                                targetedBridge = true;
                                break;
                            }
                        }
                    }
                }

                let targetedPillow = false;
                // Sleepiness Logic: Any land/exclusive pet seeks pillow when drowsy (sleepiness >= 75)
                const isDrowsy = (a.sleepiness || 0) >= 75;
                if (!targetedBridge && isDrowsy && activeDecorList.length > 0) {
                    const emptyPillows = activeDecorList.filter(d =>
                        d.type === 'pet_pillow' &&
                        !isPillowOccupied(d.id, a) &&
                        !isPointNearOtherAnimal(d.x, d.y - 3, a, 28)
                    );
                    if (emptyPillows.length > 0) {
                        emptyPillows.sort((p1, p2) => Math.hypot(p1.x - a.x, p1.y - a.y) - Math.hypot(p2.x - a.x, p2.y - a.y));
                        const pil = emptyPillows[0];
                        a.targetX = pil.x;
                        a.targetY = pil.y - 3;
                        a.targetPillowId = pil.id;
                        a.state = 'walking';
                        a.stateTimer = 10.0;
                        a.facingLeft = pil.x < a.x;
                        a.bubbleText = '(∪｡∪) ｡｡zZ';
                        a.bubbleTimer = 2.0;
                        targetedPillow = true;
                    } else if (a.sleepiness >= 98) {
                        a.state = 'sleeping';
                        a.stateTimer = 6.0;
                        a.sleepiness = 50;
                        a.zzzTimer = 0.5;
                        a.bubbleText = '';
                        a.bubbleTimer = 0;
                        targetedPillow = true;
                    }
                }

                // Smart Attraction to ALL Garden Decorations (Strictly 1 occupant per decor + global concurrent limit!)
                let targetedDecorSpot = false;
                if (
                    !targetedBridge &&
                    !targetedPillow &&
                    activeDecorList.length > 0 &&
                    (a.decorCooldown || 0) <= 0 &&
                    getTotalActiveDecorInteractions(a) < 3 &&
                    Math.random() < 0.48
                ) {
                    const isRainNow = (typeof isRainingShower !== 'undefined' && isRainingShower) || (typeof dynamicWeather !== 'undefined' && dynamicWeather === 'drizzle');
                    const isNightNow = (typeof isNightMode !== 'undefined' && isNightMode) || (typeof nightTransition !== 'undefined' && nightTransition > 0.5);

                    const scoredCandidates = [];
                    for (const d of activeDecorList) {
                        if (d.type === 'pet_pillow' || d.type === 'bridge' || d.type === 'golden_lotus') continue;
                        if (isDecorationOccupied(d.id, a)) continue;

                        const dist = Math.hypot(d.x - a.x, d.y - a.y);
                        if (dist > 280) continue;

                        const meta = getDecorInteractionAnchorAndMeta(d, a);
                        if (!meta || !meta.valid) continue;

                        if (isPointNearOtherAnimal(meta.targetX, meta.targetY, a, 34)) continue;
                        if (!isLandWalkable(meta.targetX, meta.targetY, d.id)) continue;

                        let score = 200 - dist * 0.5;
                        // Weather & Time boosts
                        if (isRainNow && (d.type === 'pet_house' || d.type === 'gazebo' || d.type === 'mushroom')) {
                            score += 180;
                        }
                        if (isNightNow && (d.type === 'campfire' || d.type === 'lantern' || d.type === 'lantern_mushroom')) {
                            score += 160;
                        }
                        if (!isNightNow && !isRainNow && (d.type === 'beach_umbrella' || d.type === 'fountain' || d.type === 'tree_swing' || d.type === 'picnic_set')) {
                            score += 75;
                        }
                        // Species affinity boosts
                        if (a.type === 'cat' && ['birdbath', 'bench', 'fence', 'fence_side', 'wind_chime', 'lantern'].includes(d.type)) {
                            score += 90;
                        } else if (a.type === 'dog' && ['fountain', 'pet_house', 'campfire', 'picnic_set', 'flower_cart', 'wishing_well'].includes(d.type)) {
                            score += 90;
                        } else if (a.type === 'rabbit' && ['statue', 'tree_swing', 'stepping_stone', 'mushroom', 'flower_arch', 'windmill'].includes(d.type)) {
                            score += 95;
                        } else if (a.type === 'exclusive') {
                            score += 85;
                        }

                        scoredCandidates.push({ d, meta, score: score + Math.random() * 60 });
                    }

                    if (scoredCandidates.length > 0) {
                        scoredCandidates.sort((c1, c2) => c2.score - c1.score);
                        const best = scoredCandidates[0];
                        a.targetDecorId = best.d.id;
                        a.pendingDecorMeta = best.meta;
                        a.decorAnchorX = best.meta.targetX;
                        a.decorAnchorY = best.meta.targetY;
                        a.targetX = best.meta.targetX;
                        a.targetY = best.meta.targetY;
                        a.state = 'walking';
                        a.stateTimer = 9.0;
                        a.facingLeft = best.meta.targetX < a.x;
                        targetedDecorSpot = true;
                    }
                }

                if (!targetedBridge && !targetedPillow && !targetedDecorSpot) {
                    const wanderChance = a.type === 'dog' ? 0.8 : (a.type === 'cat' ? 0.6 : 0.7);
                    if (Math.random() < wanderChance) {
                        let foundTarget = false;
                        for (let tries = 0; tries < 24; tries++) {
                            const ang = Math.random() * Math.PI * 2;
                            const dist = 45 + Math.random() * 130;
                            const tx = a.x + Math.cos(ang) * dist;
                            const ty = a.y + Math.sin(ang) * dist * 0.6;
                            if (isLandWalkable(tx, ty) && isPathClearOfWater(a.x, a.y, tx, ty) && !isPointNearOtherAnimal(tx, ty, a, 32, true)) {
                                a.targetX = tx;
                                a.targetY = ty;
                                a.state = 'walking';
                                a.stateTimer = 6.0;
                                a.facingLeft = tx < a.x;
                                foundTarget = true;
                                break;
                            }
                        }
                        if (!foundTarget) {
                            a.state = 'idle';
                            a.stateTimer = 1.5 + Math.random() * 2.0;
                        }
                    } else {
                        a.state = 'idle';
                        a.stateTimer = 2.0 + Math.random() * 3.5;
                    }
                }
            }
        }

        if (a.state === 'walking') {
            const dx = a.targetX - a.x;
            const dy = a.targetY - a.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 7) {
                a.x = a.targetX;
                a.y = a.targetY;
                if (a.targetPillowId) {
                    const pil = activeDecorList.find(d => d.id === a.targetPillowId);
                    const isPillowDragged = (typeof draggedDecoration !== 'undefined' && draggedDecoration && draggedDecoration.id === a.targetPillowId);
                    if (
                        pil &&
                        !isPillowDragged &&
                        !isPillowOccupied(pil.id, a) &&
                        !isPointNearOtherAnimal(pil.x, pil.y - 3, a, 26) &&
                        Math.hypot(a.x - pil.x, a.y - pil.y) < 22
                    ) {
                        a.x = pil.x;
                        a.y = pil.y - 3;
                        a.state = 'sleeping';
                        a.sleepingOnPillowId = pil.id;
                        a.stateTimer = 25.0; // Sweet nap safety limit
                        a.targetPillowId = null;
                        a.bubbleText = ''; // Clear kaomoji so it never overlaps Zzz particles!
                        a.bubbleTimer = 0;
                        a.zzzTimer = 0.5;
                        continue;
                    } else {
                        a.targetPillowId = null;
                    }
                }
                if (a.targetDecorId) {
                    const dec = activeDecorList.find(d => d.id === a.targetDecorId);
                    const isDecDragged = (typeof draggedDecoration !== 'undefined' && draggedDecoration && draggedDecoration.id === a.targetDecorId);
                    const meta = (dec && !isDecDragged) ? (a.pendingDecorMeta || getDecorInteractionAnchorAndMeta(dec, a)) : null;
                    if (
                        dec &&
                        meta &&
                        !isDecorationOccupied(dec.id, a) &&
                        !isPointNearOtherAnimal(meta.targetX, meta.targetY, a, 28) &&
                        Math.hypot(a.x - dec.x, a.y - dec.y) < 48
                    ) {
                        a.x = meta.targetX;
                        a.y = meta.targetY;
                        a.interactingDecorId = dec.id;
                        a.targetDecorId = null;
                        a.decorAction = meta.action;
                        a.state = 'decor_interact';
                        a.stateTimer = meta.duration;
                        a.bubbleText = meta.bubble;
                        a.bubbleTimer = Math.min(4.5, meta.duration * 0.65);
                        if (meta.faceX !== undefined) {
                            a.facingLeft = meta.faceX < a.x;
                        }
                        dec.interactBounce = 0.75;
                        continue;
                    } else {
                        a.targetDecorId = null;
                        a.pendingDecorMeta = null;
                    }
                }
                if (a.bridgeWaypoints && a.bridgeWaypoints.length > 0) {
                    const nextWp = a.bridgeWaypoints.shift();
                    a.targetX = nextWp.x;
                    a.targetY = nextWp.y;
                    a.stateTimer = 5.0;
                    a.facingLeft = nextWp.x < a.x;
                } else {
                    a.state = 'idle';
                    a.stateTimer = 1.5 + Math.random() * 3.0;
                }
            } else {
                const baseSpeed = a.type === 'cat' ? 32 : (a.type === 'dog' ? 44 : 36);
                const moveStep = Math.min(dist, baseSpeed * dt);
                const stepX = (dx / dist) * moveStep;
                const stepY = (dy / dist) * moveStep;
                const nextX = a.x + stepX;
                const nextY = a.y + stepY;

                const nextOnBridge = typeof isPointOnBridgeDeck === 'function' && isPointOnBridgeDeck(nextX, nextY);
                const ignoreDecId = a.targetDecorId || a.interactingDecorId || a.targetPillowId || a.sleepingOnPillowId;
                const currentlyBlockedDecor = typeof isPointBlockedByDecoration === 'function' && isPointBlockedByDecoration(a.x, a.y, 9, ignoreDecId);
                const nextBlockedDecor = !currentlyBlockedDecor && typeof isPointBlockedByDecoration === 'function' && isPointBlockedByDecoration(nextX, nextY, 9, ignoreDecId);
                const stepIntoWater = !nextOnBridge && typeof isPointOnWater === 'function' && isPointOnWater(nextX, nextY);
                const stepNearWater = !nextOnBridge && typeof isNearWater === 'function' && isNearWater(nextX, nextY, 14);
                const stepOffGrass = !nextOnBridge && typeof isPointOnGrass === 'function' && !isPointOnGrass(nextX, nextY);

                if (nextBlockedDecor || stepIntoWater || stepNearWater || stepOffGrass) {
                    a.targetX = a.x;
                    a.targetY = a.y;
                    a.targetDecorId = null;
                    a.pendingDecorMeta = null;
                    a.bridgeWaypoints = null;
                    a.state = 'idle';
                    a.stateTimer = 1.2 + Math.random() * 2.0;
                } else {
                    a.x = nextX;
                    a.y = nextY;

                    const hopSpeed = a.type === 'rabbit' ? 7.5 : (a.type === 'exclusive' ? 7.2 : 6.0);
                    a.hopPhase += dt * hopSpeed;
                    a.tailPhase += dt * (a.type === 'dog' ? 2.5 : (a.type === 'exclusive' ? 2.8 : 1.8));
                }
            }
        } else if (a.state === 'idle' || a.state === 'happy') {
            const wagRate = a.state === 'happy' ? (a.type === 'dog' ? 3.8 : 2.8) : (a.type === 'dog' ? 1.2 : 1.0);
            a.tailPhase += dt * wagRate;
        } else if (a.state === 'sleeping') {
            // Recharge energy while sleeping:
            const recoverRate = a.sleepingOnPillowId ? 4.8 : 8.0;
            a.sleepiness = Math.max(0, (a.sleepiness || 0) - dt * recoverRate);

            // Spaced, peaceful Zzz particle emissions (1 every 1.6 - 2.0s)
            a.zzzTimer = (a.zzzTimer || 0) - dt;
            if (a.zzzTimer <= 0 && typeof particles !== 'undefined') {
                a.zzzTimer = 1.6 + Math.random() * 0.4;
                particles.push({
                    type: 'zzz',
                    x: a.x + (Math.random() - 0.5) * 6,
                    y: a.y - (a.type === 'exclusive' ? 18 : 14),
                    vx: (Math.random() - 0.5) * 3,
                    vy: -13 - Math.random() * 4,
                    size: 12 + Math.random() * 3,
                    alpha: 0.95,
                    decay: 0.52,
                    text: Math.random() < 0.4 ? 'Z' : 'z',
                    color: a.sleepingOnPillowId ? '#EC4899' : '#A855F7'
                });
            }

            // Natural wake up when no longer sleepy ("jika sudah tidak ngantuk dia akan bangun")
            if (a.sleepiness <= 0 || a.stateTimer <= 0) {
                const wasOnPillow = Boolean(a.sleepingOnPillowId);
                a.sleepingOnPillowId = null;
                a.targetPillowId = null;
                a.state = 'happy';
                a.stateTimer = 3.5;
                a.sleepiness = 0;
                a.napCooldown = 90 + Math.random() * 60; // Refreshed! Takes 1.5 - 2.5 minutes before getting sleepy again
                a.bubbleText = wasOnPillow ? '(✿◠‿◠) ✨' : '(˶ᵔ ᵕ ᵔ˶) 💖';
                a.bubbleTimer = 2.8;

                if (wasOnPillow) {
                    const hopAngle = Math.random() * Math.PI * 2;
                    const hopDist = 20 + Math.random() * 8;
                    const hx = a.x + Math.cos(hopAngle) * hopDist;
                    const hy = a.y + Math.sin(hopAngle) * hopDist * 0.7;
                    if (typeof isLandWalkable === 'function' && isLandWalkable(hx, hy)) {
                        a.x = hx;
                        a.y = hy;
                    }
                }
            }
        }
    }

    // 4. CONTINUOUS ANTI-STACKING SEPARATION PASS (Mencegah penumpukan karakter secara mutlak)
    resolveAnimalToAnimalOverlap(dt);
}

/**
 * Memastikan tidak ada dua makhluk hidup darat/air yang menumpuk pada koordinat yang sama,
 * baik saat berinteraksi dengan dekorasi, tidur di bantal, maupun berdiri idle.
 */
function resolveAnimalToAnimalOverlap(dt) {
    if (typeof animals === 'undefined' || !Array.isArray(animals) || animals.length === 0) return;
    const minSep = 42;

    const canStandOnGround = (px, py, isWater) => {
        if (isWater) {
            return isWaterSwimmable(px, py, 4);
        }
        const onBridge = typeof isPointOnBridgeDeck === 'function' && isPointOnBridgeDeck(px, py);
        if (onBridge) return true;
        const onGrass = typeof isPointOnGrass === 'function' ? isPointOnGrass(px, py) : true;
        const onWater = typeof isPointOnWater === 'function' ? isPointOnWater(px, py) : false;
        return onGrass && !onWater;
    };

    const activeDecorList = (typeof decorations !== 'undefined' && Array.isArray(decorations))
        ? decorations
        : ((typeof window !== 'undefined' && Array.isArray(window.decorations)) ? window.decorations : []);

    // 0. Dorong hewan darat yang TIDAK sedang berinteraksi dengan dekorasi `d` agar tidak berdiri menumpuk di atas/dalam `d`
    for (let i = 0; i < animals.length; i++) {
        const a = animals[i];
        if (!a || a.isBeingDragged || a.type === 'butterfly' || a.habitat === 'flying' || isAnimalWaterCreature(a)) continue;
        for (const d of activeDecorList) {
            if (!d || d.type === 'stepping_stone' || d.type === 'bridge' || d.type === 'golden_lotus') continue;
            if (
                a.interactingDecorId === d.id ||
                a.targetDecorId === d.id ||
                a.sleepingOnPillowId === d.id ||
                a.targetPillowId === d.id
            ) {
                continue;
            }
            let dx = a.x - d.x;
            let dy = a.y - d.y;
            let dist = Math.hypot(dx, dy);
            const clearRadius = 34;
            if (dist < clearRadius) {
                if (dist < 0.01) {
                    dx = 0;
                    dy = 1;
                    dist = 1;
                }
                const push = Math.min(clearRadius - dist, Math.max((clearRadius - dist) * 0.6, 80 * (dt || 0.016)));
                const nx = dx / dist;
                const ny = dy / dist;
                const px = a.x + nx * push;
                const py = a.y + ny * push;
                if (canStandOnGround(px, py, false)) {
                    a.x = px;
                    a.y = py;
                }
                if (a.state === 'idle' || a.state === 'happy') {
                    const tx = d.x + nx * 52;
                    const ty = d.y + ny * 44;
                    if (canStandOnGround(tx, ty, false)) {
                        a.targetX = tx;
                        a.targetY = ty;
                        a.state = 'walking';
                        a.stateTimer = 2.5;
                        a.facingLeft = tx < a.x;
                    }
                }
            }
        }
    }

    if (animals.length < 2) return;

    for (let i = 0; i < animals.length; i++) {
        const a = animals[i];
        if (!a || a.isBeingDragged || a.type === 'butterfly' || a.habitat === 'flying') continue;
        const aIsWater = isAnimalWaterCreature(a);

        for (let j = i + 1; j < animals.length; j++) {
            const b = animals[j];
            if (!b || b.isBeingDragged || b.type === 'butterfly' || b.habitat === 'flying') continue;
            const bIsWater = isAnimalWaterCreature(b);
            if (aIsWater !== bIsWater) continue;

            // 1. Jika dua hewan tidak sengaja menargetkan atau menempati dekorasi yang sama, batalkan hewan kedua!
            if (a.interactingDecorId && (b.interactingDecorId === a.interactingDecorId || b.targetDecorId === a.interactingDecorId)) {
                b.interactingDecorId = null;
                b.targetDecorId = null;
                b.pendingDecorMeta = null;
                b.decorAction = null;
                b.decorCooldown = 10 + Math.random() * 6;
                b.state = 'idle';
                b.stateTimer = 0.5;
            } else if (b.interactingDecorId && a.targetDecorId === b.interactingDecorId) {
                a.targetDecorId = null;
                a.pendingDecorMeta = null;
                a.decorCooldown = 10 + Math.random() * 6;
                a.state = 'idle';
                a.stateTimer = 0.5;
            } else if (a.targetDecorId && b.targetDecorId === a.targetDecorId) {
                b.targetDecorId = null;
                b.pendingDecorMeta = null;
                b.state = 'idle';
                b.stateTimer = 0.5;
            }

            // 2. Cek jarak fisik antar dua hewan
            let dx = b.x - a.x;
            let dy = b.y - a.y;
            let dist = Math.hypot(dx, dy);

            if (dist < minSep) {
                if (dist < 0.01) {
                    const ang = ((i * 1.7 + j * 2.3 + 0.5) % (Math.PI * 2));
                    dx = Math.cos(ang);
                    dy = Math.sin(ang);
                    dist = 1.0;
                }
                const overlap = minSep - dist;
                const nx = dx / dist;
                const ny = dy / dist;

                const aAnchored = (a.state === 'decor_interact' && Boolean(a.interactingDecorId)) || Boolean(a.sleepingOnPillowId);
                const bAnchored = (b.state === 'decor_interact' && Boolean(b.interactingDecorId)) || Boolean(b.sleepingOnPillowId);

                // Jika keduanya sedang anchored pada posisi yang berdekatan (< 34px), lepaskan hewan kedua (`b`) agar berjalan menjauh!
                if (aAnchored && bAnchored) {
                    b.interactingDecorId = null;
                    b.targetDecorId = null;
                    b.pendingDecorMeta = null;
                    b.decorAction = null;
                    b.sleepingOnPillowId = null;
                    b.targetPillowId = null;
                    b.decorCooldown = 12;
                    b.state = 'walking';
                    b.stateTimer = 3.0;
                    const pushX = b.x + nx * (overlap + 6);
                    const pushY = b.y + ny * (overlap + 6);
                    if (canStandOnGround(pushX, pushY, bIsWater)) {
                        b.x = pushX;
                        b.y = pushY;
                    }
                    b.targetX = b.x + nx * 44;
                    b.targetY = b.y + ny * 36;
                    continue;
                }

                // Dorong hewan yang tidak sedang ter-anchor (atau dorong keduanya 50/50 bila keduanya bebas)
                const pushSpeed = Math.min(overlap, Math.max(overlap * 0.55, 75 * (dt || 0.016)));
                if (aAnchored && !bAnchored) {
                    const bx = b.x + nx * pushSpeed;
                    const by = b.y + ny * pushSpeed;
                    if (canStandOnGround(bx, by, bIsWater)) {
                        b.x = bx;
                        b.y = by;
                    }
                    if (b.state === 'idle' || b.state === 'happy') {
                        const tx = b.x + nx * 44;
                        const ty = b.y + ny * 34;
                        if (canStandOnGround(tx, ty, bIsWater)) {
                            b.targetX = tx;
                            b.targetY = ty;
                            b.state = 'walking';
                            b.stateTimer = 2.5;
                            b.facingLeft = tx < b.x;
                        }
                    }
                } else if (!aAnchored && bAnchored) {
                    const ax = a.x - nx * pushSpeed;
                    const ay = a.y - ny * pushSpeed;
                    if (canStandOnGround(ax, ay, aIsWater)) {
                        a.x = ax;
                        a.y = ay;
                    }
                    if (a.state === 'idle' || a.state === 'happy') {
                        const tx = a.x - nx * 44;
                        const ty = a.y - ny * 34;
                        if (canStandOnGround(tx, ty, aIsWater)) {
                            a.targetX = tx;
                            a.targetY = ty;
                            a.state = 'walking';
                            a.stateTimer = 2.5;
                            a.facingLeft = tx < a.x;
                        }
                    }
                } else {
                    const half = pushSpeed * 0.5;
                    const ax = a.x - nx * half;
                    const ay = a.y - ny * half;
                    const bx = b.x + nx * half;
                    const by = b.y + ny * half;
                    if (canStandOnGround(ax, ay, aIsWater)) {
                        a.x = ax;
                        a.y = ay;
                    }
                    if (canStandOnGround(bx, by, bIsWater)) {
                        b.x = bx;
                        b.y = by;
                    }
                }
            }
        }
    }
}

/********************************************************************
 * ANIMAL RENDERING: CAT, DOG, RABBIT, BUTTERFLY & CUSTOM DRAWN
 ********************************************************************/

function drawCat(ctx, a, now) {
    ctx.save();
    ctx.translate(a.x, a.y);

    const isScared = a.isBeingDragged || a.state === 'scared';
    const dragLift = a.isBeingDragged ? -16 : 0;
    const tremble = isScared ? (Math.sin(now * 30) * 1.5) : 0;

    // Ground shadow (suppress if resting on pillow cushion)
    if (!a.sleepingOnPillowId) {
        ctx.fillStyle = 'rgba(20, 40, 15, 0.18)';
        ctx.beginPath();
        ctx.ellipse(0, 2 - dragLift, isScared ? 12 : 17, isScared ? 3.5 : 5.5, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    const isSleeping = a.state === 'sleeping';
    const sleepBreath = isSleeping ? Math.sin(now * 0.003) * 0.7 : 0;
    const petBounce = Math.sin((a.petAnim || 0) * Math.PI) * 12;
    const walkHop = a.state === 'walking' ? Math.abs(Math.sin(a.hopPhase || 0)) * 3.5 : 0;
    const bridgeLift = (!a.isBeingDragged && typeof getBridgeDeckElevation === 'function') ? getBridgeDeckElevation(a.x, a.y) : 0;
    ctx.translate(0, -petBounce - walkHop - bridgeLift + dragLift + tremble + (isSleeping ? (1.6 + sleepBreath) : 0));

    if (isSleeping) {
        ctx.scale(1.04, 0.93);
    }

    if (a.facingLeft) ctx.scale(-1, 1);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const variant = a.variant || 'ginger';
    let bodyColor = '#FBBF24';
    let bellyColor = '#FFFDF0';
    let strokeColor = '#2B3B24';
    let earInnerColor = '#FBCFE8';
    let eyeColor = '#232B2B';
    let noseColor = '#F472B6';

    if (variant === 'black') {
        bodyColor = '#2D3142';
        bellyColor = '#3F4458';
        strokeColor = '#181924';
        earInnerColor = '#4F5D75';
        eyeColor = '#10B981'; // Emerald radiant eyes
    } else if (variant === 'calico') {
        bodyColor = '#FFFFFF';
        bellyColor = '#FFFDF0';
        strokeColor = '#2B3B24';
        earInnerColor = '#FBCFE8';
    } else if (variant === 'sakura') {
        bodyColor = '#FBCFE8';
        bellyColor = '#FFF5F8';
        strokeColor = '#9D174D';
        earInnerColor = '#F472B6';
        eyeColor = '#DB2777';
    }

    const outlineWidth = 2.0;

    // 1. Tail (curved and playful)
    const tailWag = Math.sin((a.tailPhase || 0)) * (isScared ? 0.45 : 0.25);
    ctx.save();
    ctx.translate(-10, -7);
    ctx.rotate(tailWag);
    ctx.lineWidth = outlineWidth + 2.5;
    ctx.strokeStyle = (variant === 'calico') ? '#E68A00' : bodyColor;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-6, -4, -10, -12);
    ctx.quadraticCurveTo(-14, -18, -8, -20);
    ctx.stroke();
    ctx.lineWidth = outlineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.restore();

    // 2. Back Paw
    ctx.fillStyle = bodyColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = outlineWidth;
    ctx.beginPath();
    ctx.ellipse(-7, -2, 6, 4.2, -0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 3. Body
    ctx.beginPath();
    ctx.ellipse(0, -9, 13.5, 10.5, -0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Calico Patches
    if (variant === 'calico') {
        ctx.fillStyle = '#E68A00';
        ctx.beginPath();
        ctx.ellipse(-4, -13, 6, 4.5, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#374151';
        ctx.beginPath();
        ctx.ellipse(3, -14, 4.5, 4, 0.2, 0, Math.PI * 2);
        ctx.fill();
    }

    // Belly patch
    ctx.fillStyle = bellyColor;
    ctx.beginPath();
    ctx.ellipse(3, -7.5, 7, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // 4. Front Paws
    const legSwing = isScared ? (Math.sin(now * 20) * 4) : (a.state === 'walking' ? Math.sin((a.hopPhase || 0)) * 3.5 : 0);
    ctx.fillStyle = (variant === 'black') ? '#FFFFFF' : bellyColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = outlineWidth;
    ctx.beginPath();
    ctx.ellipse(5 + legSwing, -1.2, 3.5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(10 - legSwing, -1.2, 3.5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 5. Head
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(8, -17.5, 10.5, 9.5, 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (variant === 'calico') {
        ctx.fillStyle = '#E68A00';
        ctx.beginPath();
        ctx.ellipse(12, -22, 5, 4, 0.3, 0, Math.PI * 2);
        ctx.fill();
    }

    // 6. Ears
    ctx.beginPath();
    ctx.moveTo(1.5, -21.5);
    ctx.quadraticCurveTo(3, -29, 6.5, -28.5);
    ctx.quadraticCurveTo(8.5, -24, 10, -22.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = earInnerColor;
    ctx.beginPath();
    ctx.moveTo(3, -22.5);
    ctx.lineTo(6, -27);
    ctx.lineTo(8.5, -23);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = (variant === 'calico') ? '#E68A00' : bodyColor;
    ctx.beginPath();
    ctx.moveTo(9, -23.5);
    ctx.quadraticCurveTo(12, -29.5, 15, -28);
    ctx.quadraticCurveTo(16, -23, 16.5, -19.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = earInnerColor;
    ctx.beginPath();
    ctx.moveTo(10.5, -23.5);
    ctx.lineTo(13.5, -27);
    ctx.lineTo(15, -21.5);
    ctx.closePath();
    ctx.fill();

    // 7. Face: Eyes, Nose, Mouth
    if (isScared) {
        // Scared wide shaking eyes
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(6, -17, 3.2, 0, Math.PI * 2);
        ctx.arc(12, -17, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.arc(6 + Math.sin(now * 25) * 0.6, -17, 1.4, 0, Math.PI * 2);
        ctx.arc(12 + Math.sin(now * 25) * 0.6, -17, 1.4, 0, Math.PI * 2);
        ctx.fill();

        // Trembling wavy mouth
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = (variant === 'black') ? '#8E9AA8' : strokeColor;
        ctx.beginPath();
        ctx.moveTo(7.5, -11.5);
        ctx.quadraticCurveTo(9.2, -13, 11, -11.5);
        ctx.stroke();

        // Sweat drop near ear
        ctx.fillStyle = '#38BDF8';
        ctx.strokeStyle = '#0284C7';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(14.5, -25);
        ctx.quadraticCurveTo(17.5, -24, 16.5, -21);
        ctx.arc(15, -20.5, 1.6, 0, Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (a.state === 'sleeping') {
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(6, -16.5, 2.4, 0.15 * Math.PI, 0.85 * Math.PI, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(12, -16.5, 2.4, 0.15 * Math.PI, 0.85 * Math.PI, false);
        ctx.stroke();
    } else {
        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.ellipse(6, -17, 2.2, 2.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(12, -17, 2.2, 2.8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(5.2, -18, 0.9, 0, Math.PI * 2);
        ctx.arc(11.2, -18, 0.9, 0, Math.PI * 2);
        ctx.fill();
    }

    // Nose
    ctx.fillStyle = noseColor;
    ctx.beginPath();
    ctx.moveTo(8.2, -13.8);
    ctx.lineTo(10.2, -13.8);
    ctx.lineTo(9.2, -12.4);
    ctx.closePath();
    ctx.fill();

    if (!isScared) {
        // Cute cat mouth (‿‿)
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = (variant === 'black') ? '#8E9AA8' : strokeColor;
        ctx.beginPath();
        ctx.arc(8.2, -11.8, 1.3, 0.1 * Math.PI, 0.9 * Math.PI, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(10.4, -11.8, 1.3, 0.1 * Math.PI, 0.9 * Math.PI, false);
        ctx.stroke();
    }

    // Soft pink blush
    ctx.fillStyle = 'rgba(251, 113, 133, 0.4)';
    ctx.beginPath();
    ctx.arc(3.5, -14.5, 2.0, 0, Math.PI * 2);
    ctx.arc(14.5, -14.5, 2.0, 0, Math.PI * 2);
    ctx.fill();

    // Whiskers
    ctx.lineWidth = 1.0;
    ctx.strokeStyle = (variant === 'black') ? '#71788E' : '#B8A48B';
    ctx.beginPath();
    ctx.moveTo(1, -14.5); ctx.lineTo(-4, -16);
    ctx.moveTo(1, -12.5); ctx.lineTo(-4, -12.5);
    ctx.moveTo(16, -14.5); ctx.lineTo(21, -16);
    ctx.moveTo(16, -12.5); ctx.lineTo(21, -12.5);
    ctx.stroke();

    ctx.restore();
}

function drawDog(ctx, a, now) {
    ctx.save();
    ctx.translate(a.x, a.y);

    const isScared = a.isBeingDragged || a.state === 'scared';
    const dragLift = a.isBeingDragged ? -16 : 0;
    const tremble = isScared ? (Math.sin(now * 30) * 1.5) : 0;

    // Ground shadow (suppress if resting on pillow cushion)
    if (!a.sleepingOnPillowId) {
        ctx.fillStyle = 'rgba(20, 40, 15, 0.18)';
        ctx.beginPath();
        ctx.ellipse(0, 2 - dragLift, isScared ? 13 : 18, isScared ? 3.5 : 5.5, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    const isSleeping = a.state === 'sleeping';
    const sleepBreath = isSleeping ? Math.sin(now * 0.003) * 0.7 : 0;
    const petBounce = Math.sin((a.petAnim || 0) * Math.PI) * 12;
    const walkHop = a.state === 'walking' ? Math.abs(Math.sin(a.hopPhase || 0)) * 3.8 : 0;
    const bridgeLift = (!a.isBeingDragged && typeof getBridgeDeckElevation === 'function') ? getBridgeDeckElevation(a.x, a.y) : 0;
    ctx.translate(0, -petBounce - walkHop - bridgeLift + dragLift + tremble + (isSleeping ? (1.6 + sleepBreath) : 0));

    if (isSleeping) {
        ctx.scale(1.04, 0.93);
    }

    if (a.facingLeft) ctx.scale(-1, 1);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const variant = a.variant || 'golden';
    let bodyColor = '#E6933A';
    let muzzleColor = '#FFFDF0';
    let earColor = '#E6933A';
    let earInnerColor = '#D97D29';
    let strokeColor = '#3A2814';

    if (variant === 'choco') {
        bodyColor = '#78350F';
        muzzleColor = '#FEF3C7';
        earColor = '#78350F';
        earInnerColor = '#5C2809';
        strokeColor = '#280F02';
    } else if (variant === 'dalmatian') {
        bodyColor = '#FFFFFF';
        muzzleColor = '#FFFFFF';
        earColor = '#27272A';
        earInnerColor = '#3F3F46';
        strokeColor = '#18181B';
    } else if (variant === 'starry') {
        bodyColor = '#FBBF24';
        muzzleColor = '#FEF08A';
        earColor = '#F59E0B';
        earInnerColor = '#D97706';
        strokeColor = '#78350F';
    }

    const outlineWidth = 2.0;

    // 1. Tail
    const tailWag = Math.sin(a.tailPhase || 0) * (isScared ? 0.40 : (a.state === 'happy' ? 0.20 : 0.12));
    ctx.save();
    ctx.translate(-10, -9);
    ctx.rotate(tailWag);
    ctx.lineWidth = outlineWidth + 2.5;
    ctx.strokeStyle = bodyColor;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-5, -5, -9, -15);
    ctx.stroke();
    ctx.lineWidth = outlineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.restore();

    // 2. Back Paw
    ctx.fillStyle = bodyColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = outlineWidth;
    ctx.beginPath();
    ctx.ellipse(-7.5, -2, 6.5, 4.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 3. Body
    ctx.beginPath();
    ctx.ellipse(0, -9.5, 14, 11, -0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (variant === 'dalmatian') {
        ctx.fillStyle = '#27272A';
        ctx.beginPath();
        ctx.arc(-4, -13, 2.2, 0, Math.PI * 2);
        ctx.arc(3, -14, 1.8, 0, Math.PI * 2);
        ctx.arc(-2, -6, 2.0, 0, Math.PI * 2);
        ctx.arc(-8, -4, 1.6, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.fillStyle = muzzleColor;
        ctx.beginPath();
        ctx.ellipse(2, -7.5, 7.5, 7.5, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // 4. Front Paws
    const legSwing = isScared ? (Math.sin(now * 22) * 4) : (a.state === 'walking' ? Math.sin((a.hopPhase || 0)) * 4 : 0);
    ctx.fillStyle = muzzleColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = outlineWidth;
    ctx.beginPath();
    ctx.ellipse(5 + legSwing, -1.2, 4, 3.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(10.5 - legSwing, -1.2, 4, 3.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 5. Far Ear
    ctx.fillStyle = earColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = outlineWidth;
    ctx.beginPath();
    ctx.moveTo(1.5, -23.5);
    ctx.quadraticCurveTo(-3, -24, -4, -17);
    ctx.quadraticCurveTo(-4, -12, -1.5, -13);
    ctx.quadraticCurveTo(0.5, -14, 2, -18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 6. Head
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(8, -17.5, 10.5, 9.5, 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Snout
    ctx.fillStyle = muzzleColor;
    ctx.beginPath();
    ctx.ellipse(12.5, -14.5, 5.5, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = '#8E6740';
    ctx.stroke();

    // Near Ear
    ctx.fillStyle = earColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = outlineWidth;
    ctx.beginPath();
    ctx.moveTo(4.5, -24.5);
    ctx.quadraticCurveTo(0.5, -22, -0.5, -15.5);
    ctx.quadraticCurveTo(-0.5, -10.5, 2.5, -11.5);
    ctx.quadraticCurveTo(5, -13.5, 5.5, -19);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = earInnerColor;
    ctx.beginPath();
    ctx.ellipse(2, -16, 1.6, 3.2, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // 7. Face: Eyes, Nose, Mouth
    if (isScared) {
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(8, -17.5, 3.4, 0, Math.PI * 2);
        ctx.arc(13.8, -17.5, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#232B2B';
        ctx.beginPath();
        ctx.arc(8 + Math.sin(now * 25) * 0.6, -17.5, 1.5, 0, Math.PI * 2);
        ctx.arc(13.8 + Math.sin(now * 25) * 0.6, -17.5, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 1.4;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.moveTo(11.5, -12);
        ctx.quadraticCurveTo(13.2, -13.5, 15, -12);
        ctx.stroke();

        ctx.fillStyle = '#38BDF8';
        ctx.strokeStyle = '#0284C7';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(16, -24);
        ctx.quadraticCurveTo(19, -23, 18, -20);
        ctx.arc(16.5, -19.5, 1.6, 0, Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (a.state === 'sleeping') {
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(8, -17.5, 2.5, 0.15 * Math.PI, 0.85 * Math.PI, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(13.8, -17.5, 2.5, 0.15 * Math.PI, 0.85 * Math.PI, false);
        ctx.stroke();
    } else {
        ctx.fillStyle = '#232B2B';
        ctx.beginPath();
        ctx.ellipse(8, -17.5, 2.3, 2.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(13.8, -17.5, 2.1, 2.6, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(7.2, -18.3, 0.9, 0, Math.PI * 2);
        ctx.arc(13.2, -18.3, 0.8, 0, Math.PI * 2);
        ctx.fill();
    }

    // Button nose
    ctx.fillStyle = '#232B2B';
    ctx.beginPath();
    ctx.ellipse(14.8, -14.8, 2.2, 1.7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.arc(14.2, -15.3, 0.6, 0, Math.PI * 2);
    ctx.fill();

    if (!isScared) {
        if (a.state === 'happy' || a.state === 'walking' || (a.petAnim || 0) > 0) {
            ctx.fillStyle = '#FB7185';
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.ellipse(13.5, -11.5, 2.0, 2.8, 0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        } else {
            ctx.lineWidth = 1.4;
            ctx.strokeStyle = strokeColor;
            ctx.beginPath();
            ctx.arc(13, -12.8, 2, 0.2 * Math.PI, 0.9 * Math.PI, false);
            ctx.stroke();
        }
    }

    // Pink blush
    ctx.fillStyle = 'rgba(251, 113, 133, 0.4)';
    ctx.beginPath();
    ctx.arc(6.8, -14.2, 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawRabbit(ctx, a, now) {
    ctx.save();
    ctx.translate(a.x, a.y);

    const isScared = a.isBeingDragged || a.state === 'scared';
    const dragLift = a.isBeingDragged ? -16 : 0;
    const tremble = isScared ? (Math.sin(now * 30) * 1.5) : 0;

    // Ground shadow (suppress if resting on pillow cushion)
    if (!a.sleepingOnPillowId) {
        ctx.fillStyle = 'rgba(20, 40, 15, 0.18)';
        ctx.beginPath();
        ctx.ellipse(0, 2 - dragLift, isScared ? 11 : 15, isScared ? 3.2 : 5, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    const isSleeping = a.state === 'sleeping';
    const sleepBreath = isSleeping ? Math.sin(now * 0.003) * 0.7 : 0;
    const petBounce = Math.sin((a.petAnim || 0) * Math.PI) * 12;
    const walkHop = a.state === 'walking' ? Math.abs(Math.sin((a.hopPhase || 0))) * 7.5 : 0;
    const bridgeLift = (!a.isBeingDragged && typeof getBridgeDeckElevation === 'function') ? getBridgeDeckElevation(a.x, a.y) : 0;
    ctx.translate(0, -petBounce - walkHop - bridgeLift + dragLift + tremble + (isSleeping ? (1.6 + sleepBreath) : 0));

    if (isSleeping) {
        ctx.scale(1.04, 0.93);
    }

    if (a.facingLeft) ctx.scale(-1, 1);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const variant = a.variant || 'white';
    let bodyColor = '#FFFFFF';
    let shadowWhite = '#F3F4F6';
    let earInnerColor = '#FCE7F3';
    let strokeColor = '#374151';

    if (variant === 'caramel') {
        bodyColor = '#C27838';
        shadowWhite = '#9A5018';
        earInnerColor = '#FDE2E4';
        strokeColor = '#3A1E06';
    } else if (variant === 'grey') {
        bodyColor = '#9CA3AF';
        shadowWhite = '#6B7280';
        earInnerColor = '#FBCFE8';
        strokeColor = '#1F2937';
    } else if (variant === 'sakura_rabbit') {
        bodyColor = '#FFF5F8';
        shadowWhite = '#FBCFE8';
        earInnerColor = '#F472B6';
        strokeColor = '#831843';
    }

    const outlineWidth = 2.0;

    // 1. Tail
    ctx.fillStyle = (variant === 'caramel') ? '#FFFFFF' : bodyColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = outlineWidth;
    ctx.beginPath();
    ctx.arc(-11, -8, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 2. Hind Leg
    ctx.fillStyle = shadowWhite;
    ctx.beginPath();
    ctx.ellipse(-5, -4, 7, 5, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = (variant === 'caramel') ? '#FFFFFF' : bodyColor;
    ctx.beginPath();
    ctx.ellipse(-2, -1, 5.5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 3. Body
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(0, -9, 12.5, 10, -0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (variant === 'caramel') {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(3, -7.5, 6, 6, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // 4. Front Paws
    const legSwing = isScared ? (Math.sin(now * 24) * 4) : (a.state === 'walking' ? Math.sin((a.hopPhase || 0)) * 5 : 0);
    ctx.fillStyle = (variant === 'caramel') ? '#FFFFFF' : bodyColor;
    ctx.beginPath();
    ctx.ellipse(6 + legSwing, -1.5, 3.5, 2.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(10 - legSwing, -1.5, 3.5, 2.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 5. Ears
    const earHopDrag = isScared ? (Math.sin(now * 25) * 0.08) : (a.state === 'walking' ? Math.sin(a.hopPhase || 0) * -0.025 : 0);
    ctx.save();
    ctx.translate(4, -22);
    ctx.rotate(earHopDrag);
    ctx.fillStyle = bodyColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = outlineWidth;
    ctx.beginPath();
    ctx.ellipse(-3, -11, 4, 11, -0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = earInnerColor;
    ctx.beginPath();
    ctx.ellipse(-3, -11, 2.2, 8.5, -0.12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.ellipse(4, -10, 4, 11, 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = earInnerColor;
    ctx.beginPath();
    ctx.ellipse(4, -10, 2.2, 8.5, 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 6. Head
    ctx.fillStyle = bodyColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = outlineWidth;
    ctx.beginPath();
    ctx.ellipse(8, -17.5, 10, 9, 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (variant === 'caramel') {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(8, -25);
        ctx.lineTo(6, -14);
        ctx.lineTo(12, -14);
        ctx.lineTo(9.5, -25);
        ctx.closePath();
        ctx.fill();
    }

    // 7. Face
    if (isScared) {
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(6, -17, 3.2, 0, Math.PI * 2);
        ctx.arc(12, -17, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#232B2B';
        ctx.beginPath();
        ctx.arc(6 + Math.sin(now * 25) * 0.6, -17, 1.4, 0, Math.PI * 2);
        ctx.arc(12 + Math.sin(now * 25) * 0.6, -17, 1.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 1.3;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.moveTo(7.5, -10.5);
        ctx.quadraticCurveTo(9, -12, 10.5, -10.5);
        ctx.stroke();

        ctx.fillStyle = '#38BDF8';
        ctx.strokeStyle = '#0284C7';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(14, -25);
        ctx.quadraticCurveTo(17, -24, 16, -21);
        ctx.arc(14.5, -20.5, 1.6, 0, Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (a.state === 'sleeping') {
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(6, -16.5, 2.4, 0.15 * Math.PI, 0.85 * Math.PI, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(11.5, -16.5, 2.4, 0.15 * Math.PI, 0.85 * Math.PI, false);
        ctx.stroke();
    } else {
        ctx.fillStyle = '#232B2B';
        ctx.beginPath();
        ctx.ellipse(6, -17, 2.2, 2.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(12, -17, 2.2, 2.8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(5.2, -18, 0.9, 0, Math.PI * 2);
        ctx.arc(11.2, -18, 0.9, 0, Math.PI * 2);
        ctx.fill();
    }

    // Pink nose
    ctx.fillStyle = '#F472B6';
    ctx.beginPath();
    ctx.ellipse(9, -13.5, 1.8, 1.3, 0, 0, Math.PI * 2);
    ctx.fill();

    if (!isScared) {
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = (variant === 'caramel') ? '#371C06' : strokeColor;
        ctx.beginPath();
        ctx.moveTo(9, -12.2); ctx.lineTo(9, -11.2);
        ctx.arc(7.6, -10.8, 1.4, 0.1 * Math.PI, 0.9 * Math.PI, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(10.4, -10.8, 1.4, 0.1 * Math.PI, 0.9 * Math.PI, false);
        ctx.stroke();
    }

    // Pink blush
    ctx.fillStyle = 'rgba(244, 114, 182, 0.45)';
    ctx.beginPath();
    ctx.arc(3.5, -14.5, 2.2, 0, Math.PI * 2);
    ctx.arc(14.5, -14.5, 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawButterfly(ctx, a, now) {
    if (!a) return;
    ctx.save();
    ctx.translate(a.x, a.y);

    const isScared = a.isBeingDragged || a.state === 'scared';
    const dragLift = a.isBeingDragged ? -16 : 0;
    const tremble = isScared ? (Math.sin(now * 30) * 1.5) : 0;

    // Floating shadow
    ctx.fillStyle = 'rgba(25, 45, 20, 0.12)';
    ctx.beginPath();
    ctx.ellipse(0, 16 - dragLift, isScared ? 5 : 7, isScared ? 1.8 : 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.translate(0, dragLift + tremble);

    if (a.facingLeft) ctx.scale(-1, 1);

    const variant = a.variant || 'violet';
    let wingTopColor = '#A855F7';
    let wingBottomColor = '#EC4899';
    let strokeColor = '#3B0764';

    if (variant === 'blue') {
        wingTopColor = '#0284C7';
        wingBottomColor = '#38BDF8';
        strokeColor = '#082F49';
    } else if (variant === 'golden') {
        wingTopColor = '#F59E0B';
        wingBottomColor = '#FBBF24';
        strokeColor = '#451A03';
    } else if (variant === 'aurora') {
        wingTopColor = '#38BDF8';
        wingBottomColor = '#EC4899';
        strokeColor = '#0F172A';
    }

    const wingFlap = Math.cos(a.wingPhase || 0) * 0.95;

    // Helper to draw a full wing pair (forewing + hindwing) on one side
    function drawWingSide(flip) {
        ctx.save();
        ctx.scale(flip * Math.max(0.12, Math.abs(wingFlap)), 1);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Top Forewing
        ctx.fillStyle = wingTopColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.bezierCurveTo(-8, -20, -19, -15, -13, -3);
        ctx.bezierCurveTo(-10, 0, -2, -2, 0, -4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Bottom Hindwing
        ctx.fillStyle = wingBottomColor;
        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.bezierCurveTo(-8, 2, -15, 6, -10, 11);
        ctx.bezierCurveTo(-6, 12, -2, 4, 0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // White accent spots
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(-11, -10, 1.5, 0, Math.PI * 2);
        ctx.arc(-7, 7, 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // Draw both Right wing (behind/flipped) and Left wing (front)!
    drawWingSide(-1);
    drawWingSide(1);

    // Body
    ctx.fillStyle = strokeColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, 2.0, 7.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.arc(0, -8, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Antennae
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(-1, -10);
    ctx.quadraticCurveTo(-3, -15, -6, -14);
    ctx.moveTo(1, -10);
    ctx.quadraticCurveTo(3, -15, 6, -14);
    ctx.stroke();

    if (isScared) {
        ctx.fillStyle = '#38BDF8';
        ctx.strokeStyle = '#0284C7';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(5, -16);
        ctx.quadraticCurveTo(7.5, -15, 6.5, -13);
        ctx.arc(5.5, -12.5, 1.3, 0, Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();
}

function drawFish(ctx, a, now) {
    if (!a) return;
    ctx.save();
    ctx.translate(a.x, a.y);

    const isScared = a.isBeingDragged || a.state === 'scared';
    const tremble = isScared ? (Math.sin(now * 30) * 1.5) : 0;
    const petBounce = Math.sin((a.petAnim || 0) * Math.PI) * 10;
    const dragLift = a.isBeingDragged ? -15 : 0;

    // 1. Realistic pond bed depth shadow (soft and deep underwater)
    ctx.fillStyle = 'rgba(8, 35, 52, 0.28)';
    ctx.beginPath();
    ctx.ellipse(-2, 8 - dragLift, isScared ? 12 : 16, isScared ? 4.5 : 6.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Trailing concentric water wake ripples behind fish
    if (!a.isBeingDragged) {
        const ripplePhase = (now * 0.0035 + (a.x * 0.01)) % 1;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.32 * (1 - ripplePhase)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(-14, 1, 6 + ripplePhase * 10, 3 + ripplePhase * 4, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.translate(0, -petBounce + dragLift + tremble);

    if (a.facingLeft) ctx.scale(-1, 1);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const variant = a.variant || 'koi';
    // Smooth natural tail wave without hyper-speed millisecond glitch!
    const swimWave = Math.sin(a.swimPhase || 0) * (isScared ? 0.45 : 0.22);

    let bodyColor = '#FFFFFF';
    let spotColor = '#EA580C';
    let finColor = 'rgba(255, 255, 255, 0.85)';
    let strokeColor = '#3A2814';

    if (variant === 'goldfish') {
        bodyColor = '#F97316';
        spotColor = '#EF4444';
        finColor = 'rgba(254, 215, 170, 0.85)';
        strokeColor = '#431407';
    } else if (variant === 'betta') {
        bodyColor = '#2563EB';
        spotColor = '#7C3AED';
        finColor = 'rgba(168, 85, 247, 0.8)';
        strokeColor = '#1E1B4B';
    } else if (variant === 'golden_dragon') {
        bodyColor = '#FBBF24';
        spotColor = '#F59E0B';
        finColor = 'rgba(253, 224, 71, 0.9)';
        strokeColor = '#78350F';
    }

    const outlineWidth = 2.0;

    // Tail Fin
    ctx.save();
    ctx.translate(-10, 0);
    ctx.rotate(swimWave);
    ctx.fillStyle = finColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.6;

    if (variant === 'betta') {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-14, -13, -24, -6);
        ctx.quadraticCurveTo(-17, 0, -24, 6);
        ctx.quadraticCurveTo(-14, 13, 0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (variant === 'goldfish') {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-12, -11, -19, -4);
        ctx.quadraticCurveTo(-11, 0, -19, 4);
        ctx.quadraticCurveTo(-12, 11, 0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-8, -8, -15, -3);
        ctx.quadraticCurveTo(-11, 0, -15, 3);
        ctx.quadraticCurveTo(-8, 8, 0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    ctx.restore();

    // Dorsal Fin
    ctx.fillStyle = finColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-5, -6);
    ctx.quadraticCurveTo(0, -13, 6, -5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Fish Body
    ctx.fillStyle = bodyColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = outlineWidth;
    ctx.beginPath();
    if (variant === 'goldfish') {
        ctx.ellipse(0, 0, 11, 8.5, 0, 0, Math.PI * 2);
    } else {
        ctx.ellipse(0, 0, 12.5, 7, 0, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.stroke();

    // Spots / patterns
    if (variant === 'koi') {
        ctx.fillStyle = spotColor;
        ctx.beginPath();
        ctx.ellipse(-2, -2, 5, 3.5, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(4, -1, 3.5, 2.5, -0.2, 0, Math.PI * 2);
        ctx.fill();

        // Cute barbels
        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(11, 2);
        ctx.quadraticCurveTo(14, 5, 16, 4);
        ctx.stroke();
    } else if (variant === 'betta') {
        ctx.fillStyle = spotColor;
        ctx.beginPath();
        ctx.ellipse(-1, 0, 7, 4, 0.1, 0, Math.PI * 2);
        ctx.fill();
    }

    // Pectoral Fin (smooth rotation tied to swim phase)
    ctx.save();
    ctx.translate(1, 2);
    ctx.rotate(Math.sin((a.swimPhase || 0) * 1.6) * 0.25);
    ctx.fillStyle = finColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(0, 0, 4.5, 2.5, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Eye
    if (isScared) {
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(6.5, -2, 3.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#1E1B4B';
        ctx.beginPath();
        ctx.arc(6.5 + (Math.sin(now * 25) * 0.6), -2, 1.6, 0, Math.PI * 2);
        ctx.fill();
    } else if (a.state === 'sleeping') {
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(6.5, -2, 2.2, 0.15 * Math.PI, 0.85 * Math.PI, false);
        ctx.stroke();
    } else {
        ctx.fillStyle = '#1E1B4B';
        ctx.beginPath();
        ctx.arc(6.5, -2, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(5.8, -2.8, 0.9, 0, Math.PI * 2);
        ctx.fill();
    }

    // Mouth
    if (isScared) {
        ctx.fillStyle = '#FB7185';
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(12, 1, 1.8, 2.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } else {
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(11, 0.5, 1.5, 0.1 * Math.PI, 0.8 * Math.PI, false);
        ctx.stroke();
    }

    // 3. Submerged Crystal Water Sheen & Surface Refraction over Fish
    if (!a.isBeingDragged) {
        ctx.save();
        ctx.fillStyle = 'rgba(56, 189, 248, 0.20)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 14, 8.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Water caustic light gleam along fish back
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.40)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-6, -4);
        ctx.quadraticCurveTo(1, -7.5, 7, -3);
        ctx.stroke();
        ctx.restore();
    }

    // Sweat drop if scared
    if (isScared) {
        ctx.fillStyle = '#38BDF8';
        ctx.strokeStyle = '#0284C7';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(3, -11);
        ctx.quadraticCurveTo(5.5, -10, 4.5, -7.5);
        ctx.arc(3.5, -7, 1.4, 0, Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();
}

function drawMossTurtle(ctx, a, now) {
    const paddle = Math.sin(now * 0.0065 + (a.x || 0) * 0.1) * 0.32;
    const headNod = Math.sin(now * 0.004 + (a.y || 0) * 0.1) * 1.0;
    const strokeCol = '#263C0B';

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 1. Water wake ripples when swimming in pond
    if (!a.isBeingDragged && typeof isPointOnWater === 'function' && isPointOnWater(a.x, a.y)) {
        const ripplePhase = (now * 0.003 + (a.x * 0.01)) % 1;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.36 * (1 - ripplePhase)})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.ellipse(-4, 1, 14 + ripplePhase * 10, 6 + ripplePhase * 4, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    // 2. Far-side flippers (behind body)
    ctx.fillStyle = '#4D7C0F';
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 1.6;
    // Far front flipper
    ctx.save();
    ctx.translate(8, -1);
    ctx.rotate(-paddle * 0.8);
    ctx.beginPath();
    ctx.ellipse(3, 1.5, 5.5, 2.6, 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 3. Cute little tail at back (-x)
    ctx.fillStyle = '#65A30D';
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-12, -3);
    ctx.lineTo(-17, -1.5 + Math.sin(now * 0.008) * 1.2);
    ctx.lineTo(-12, -0.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 4. Cute Chibi Turtle Head & Neck (facing +x right)
    ctx.save();
    ctx.translate(11, -5.5 + headNod);
    // Neck + Rounded Head
    ctx.fillStyle = '#84CC16';
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.ellipse(2.5, -1.5, 6.2, 5.2, -0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Big adorable dark eye
    ctx.fillStyle = '#1E1B4B';
    ctx.beginPath();
    ctx.arc(4.8, -2.5, 1.85, 0, Math.PI * 2);
    ctx.fill();

    // Crisp white eye catchlights
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(4.3, -3.1, 0.75, 0, Math.PI * 2);
    ctx.arc(5.3, -1.9, 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Rosy pink cheek
    ctx.fillStyle = 'rgba(251, 113, 133, 0.65)';
    ctx.beginPath();
    ctx.ellipse(3.0, -0.2, 1.7, 1.0, 0, 0, Math.PI * 2);
    ctx.fill();

    // Gentle happy smile
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(5.8, -0.6, 1.6, 0.2 * Math.PI, 0.75 * Math.PI);
    ctx.stroke();
    ctx.restore();

    // 5. Domed Carapace (Shell) in 3/4 Side Profile
    ctx.save();
    // Main dome shell
    const shellGrad = ctx.createLinearGradient(-1, -17, -1, -1);
    shellGrad.addColorStop(0, '#65A30D');
    shellGrad.addColorStop(0.6, '#4D7C0F');
    shellGrad.addColorStop(1, '#3F6212');
    ctx.fillStyle = shellGrad;
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 1.9;
    ctx.beginPath();
    ctx.moveTo(-13.5, -2.5);
    ctx.bezierCurveTo(-14, -15.5, 11, -15.5, 11.5, -2.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Scute pattern lines on shell dome
    ctx.strokeStyle = 'rgba(38, 60, 11, 0.55)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-6, -10.5);
    ctx.lineTo(-3, -6.5);
    ctx.lineTo(3, -6.5);
    ctx.lineTo(5.5, -10.0);
    ctx.moveTo(-3, -6.5);
    ctx.lineTo(-4.5, -2.8);
    ctx.moveTo(3, -6.5);
    ctx.lineTo(4.5, -2.8);
    ctx.stroke();

    // Warm cream-yellow Plastron / Rim at base of shell
    ctx.fillStyle = '#FEF08A';
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 1.7;
    ctx.beginPath();
    ctx.moveTo(-14, -3.0);
    ctx.quadraticCurveTo(-1, -0.5, 12, -3.0);
    ctx.quadraticCurveTo(12.5, -1.0, 11, 0.2);
    ctx.quadraticCurveTo(-1, 2.2, -13, 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 6. Fluffy Green Moss Cushion & Tiny Blooming Flower on Top of Shell
    ctx.fillStyle = '#84CC16';
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(-4.5, -11.8, 3.2, Math.PI * 0.8, Math.PI * 2.1);
    ctx.arc(-1.0, -13.0, 3.8, Math.PI * 0.9, Math.PI * 2.1);
    ctx.arc(2.8, -11.6, 3.0, Math.PI * 0.9, Math.PI * 2.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Little flower stem & leaves on shell crown
    const sway = Math.sin(now * 0.005) * 0.12;
    ctx.save();
    ctx.translate(-1.0, -14.5);
    ctx.rotate(sway);
    ctx.strokeStyle = '#365314';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -4.5);
    ctx.stroke();

    // 5-petal sunny yellow flower
    ctx.fillStyle = '#FACC15';
    for (let p = 0; p < 5; p++) {
        const aAng = (p * Math.PI * 2) / 5;
        ctx.beginPath();
        ctx.arc(Math.cos(aAng) * 2.1, -5.2 + Math.sin(aAng) * 2.1, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.fillStyle = '#EA580C';
    ctx.beginPath();
    ctx.arc(0, -5.2, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.restore();

    // 7. Near-side Front & Back Flippers (foreground)
    ctx.fillStyle = '#84CC16';
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 1.7;
    // Near front flipper
    ctx.save();
    ctx.translate(5.5, 0.2);
    ctx.rotate(paddle);
    ctx.beginPath();
    ctx.ellipse(1.5, 2.2, 5.8, 2.8, 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Near back flipper
    ctx.save();
    ctx.translate(-8.5, 0.2);
    ctx.rotate(-paddle);
    ctx.beginPath();
    ctx.ellipse(-1.5, 1.8, 4.8, 2.4, -0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawCustomAnimal(ctx, a, now) {
    ctx.save();
    ctx.translate(a.x, a.y);

    const isScared = a.isBeingDragged || a.state === 'scared';
    const dragLift = a.isBeingDragged ? -16 : 0;
    const tremble = isScared ? (Math.sin(now * 30) * 1.5) : 0;

    // Ground shadow
    const w = a.width || 44;
    const h = a.height || 44;
    ctx.fillStyle = 'rgba(25, 45, 20, 0.16)';
    ctx.beginPath();
    ctx.ellipse(0, 2 - dragLift, (isScared ? w * 0.28 : w * 0.35), (isScared ? 3.5 : 5), 0, 0, Math.PI * 2);
    ctx.fill();

    const petBounce = Math.sin((a.petAnim || 0) * Math.PI) * 14;
    const walkHop = a.state === 'walking' ? Math.abs(Math.sin(a.hopPhase || 0)) * 3 : 0;
    const bridgeLift = (!a.isBeingDragged && typeof getBridgeDeckElevation === 'function') ? getBridgeDeckElevation(a.x, a.y) : 0;
    ctx.translate(0, -petBounce - walkHop - bridgeLift + dragLift + tremble);

    if (a.facingLeft) ctx.scale(-1, 1);

    const isMossTurtle =
        a.customType === 'moss_turtle' ||
        a.variant === 'moss_turtle' ||
        a.type === 'turtle' ||
        (a.id && a.id.startsWith('turtle')) ||
        (a.name && (a.name.includes('Kura-kura') || a.name.includes('kura')));

    if (isMossTurtle) {
        drawMossTurtle(ctx, a, now);
    } else if (a.customImg && a.customImg.complete) {
        ctx.drawImage(a.customImg, -w / 2, -h, w, h);
    } else if (a.spriteDataUrl) {
        if (!a.customImg) {
            a.customImg = new Image();
            a.customImg.src = a.spriteDataUrl;
        }
        if (a.customImg.complete) {
            ctx.drawImage(a.customImg, -w / 2, -h, w, h);
        }
    }

    // Scared cartoon sweat drop
    if (isScared) {
        ctx.fillStyle = '#38BDF8';
        ctx.strokeStyle = '#0284C7';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(w * 0.25, -h - 6);
        ctx.quadraticCurveTo(w * 0.25 + 3, -h - 5, w * 0.25 + 2, -h - 2);
        ctx.arc(w * 0.25, -h - 1.5, 1.6, 0, Math.PI, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();
}

// ============================================================================
// SYSTEM PESAN & CURHATAN SAHABAT HEWAN (HUMANIZED ANIMAL MESSAGES MODAL)
// ============================================================================

var animalMessageHistory = [];
window.animalMessageHistory = animalMessageHistory;
var currentAnimalMessageFilter = 'all';

const HUMANIZED_ANIMAL_DIALOGS = {
    bahagia: [
        {
            text: "Kebun ini sejuk dan tenang sekali hari ini... Aku betah banget ada di sampingmu.",
            emoji: "🌸✨",
            bubble: "(˶ᵔ ᵕ ᵔ˶) 💖"
        },
        {
            text: "Bunga-bunga yang kamu rawat mekar harum sekali! Bikin langkah kakiku jadi ringan.",
            emoji: "🌷🐾",
            bubble: "(✿◠‿◠) ✨"
        },
        {
            text: "Tadi waktu kamu elus kepalaku, rasanya hangat dan nyaman sekali... Makasih ya, Sahabat!",
            emoji: "🥰💕",
            bubble: "( ˶˘ ³˘)♡"
        },
        {
            text: "Melihatmu sibuk berkebun bikin hatiku senang. Rasanya seperti punya rumah yang sesungguhnya.",
            emoji: "🏡🌼",
            bubble: "(๑•᎑•๑) ✨"
        },
        {
            text: "Aku baru saja menemukan sudut rumput yang empuk banget untuk santai. Hari ini damai sekali!",
            emoji: "🍃☀️",
            bubble: "(っ˘ω˘ς) 🌿"
        }
    ],
    request: [
        {
            text: "Hmm, kalau ada tanaman bunga berwarna cerah di dekat kolam, pasti pemandangannya makin cantik ya?",
            emoji: "🌺💭",
            bubble: "(•ㅅ•)? 🌸"
        },
        {
            text: "Boleh elus kepalaku sebentar lagi? Sentuhanmu selalu bikin aku tenang dan bersemangat.",
            emoji: "🐾🥺",
            bubble: "𐔌՞ ܸ.ˬ.ܸ՞𐦯"
        },
        {
            text: "Cuaca hari ini pas banget untuk jalan-jalan santai. Jangan lupa istirahat dan minum air ya!",
            emoji: "🍵💧",
            bubble: "(๑´ڡ`๑) 🍵"
        },
        {
            text: "Rasanya seru kalau kita pasang lonceng angin atau tempat duduk kayu di dekat sini...",
            emoji: "🎐🪵",
            bubble: "(✧ω✧) 🎐"
        },
        {
            text: "Aku ingin mencium wangi bunga baru yang sedang kamu gambar. Pasti hasilnya bagus sekali!",
            emoji: "🎨🌸",
            bubble: "(🎨˘꒳˘) ✨"
        }
    ],
    sedih: [
        {
            text: "Tadi waktu kamu pergi sebentar, aku sempat celingukan mencarimu... Jangan pergi terlalu lama ya.",
            emoji: "🥺🍂",
            bubble: "(⸝⸝๑﹏๑⸝⸝)"
        },
        {
            text: "Kakiku sedikit lelah melompat ke sana kemari... Boleh aku duduk diam di dekatmu?",
            emoji: "🐾🌧️",
            bubble: ".·°՞(っ-ᯅ-ς)՞°·."
        },
        {
            text: "Suara angin kencang tadi sempat bikin aku kaget. Tapi kalau ada kamu di dekatku, aku merasa aman.",
            emoji: "🍃⛈️",
            bubble: "(⊙_⊙;) !"
        },
        {
            text: "Kadang aku merasa kecil di pulau yang luas ini, tapi melihat senyummu bikin rasa takutku hilang.",
            emoji: "🌱💧",
            bubble: "(っ-ᯅ-ς) 💖"
        }
    ],
    mengantuk: [
        {
            text: "Hooaam... Semilir angin kebun ini bikin mataku berat sekali. Bantal tidur empuk memanggil-manggilku...",
            emoji: "💤☁️",
            bubble: "(∪｡∪) ｡｡zZ"
        },
        {
            text: "Hangatnya sinar matahari bikin aku ingin meringkuk tidur sebentar di bawah naungan daun...",
            emoji: "☀️😴",
            bubble: "(๑˘︶˘๑) 💤"
        },
        {
            text: "Kelopak mataku sudah menyipit nih. Kalau aku ketiduran, tolong jangan bangunkan aku ya~",
            emoji: "🛏️✨",
            bubble: "(=^･ω･^=) zZ"
        }
    ]
};

/**
 * Membersihkan teks kalimat latin dari speech bubble di layar,
 * sehingga yang muncul di atas kepala hewan murni HANYA kaomoji & emoji cute.
 */
function sanitizeEmojiBubble(raw) {
    if (!raw) return '';
    let s = String(raw).trim();
    // Hapus kata-kata berhuruf latin (2 huruf atau lebih), menyisakan kaomoji, simbol, dan emoji
    s = s.replace(/[a-zA-Z]{2,}/g, '').trim();
    // Rapikan spasi dan tanda baca lepas yang tersisa dari pemotongan kata
    s = s.replace(/\s+/g, ' ').trim();
    s = s.replace(/\s+[!?,~;:]+/g, '').replace(/^[!?,~;:]+\s+/g, '').trim();
    return s || '🐾✨';
}

/**
 * Menambahkan pesan teks humanis ke dalam riwayat pesan hewan,
 * dan memperbarui notifikasi tombol pesan.
 */
function recordAnimalMessage(animal, text, category = 'bahagia', customEmoji = null) {
    if (!animal || !text) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let emoji = customEmoji || '🐾';
    if (!customEmoji) {
        if (animal.type === 'cat') emoji = '🐱';
        else if (animal.type === 'dog') emoji = '🐶';
        else if (animal.type === 'rabbit') emoji = '🐰';
        else if (animal.type === 'turtle') emoji = '🐢';
        else if (animal.type === 'butterfly') emoji = '🦋';
        else if (animal.type === 'fish') emoji = '🐟';
        else if (animal.type === 'exclusive') emoji = '✨';
    }

    const messageObj = {
        id: 'msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        animalId: animal.id,
        animalName: animal.name || 'Sahabat Kecil',
        animalType: animal.type,
        emoji: emoji,
        category: category,
        text: text,
        time: timeStr,
        timestamp: Date.now()
    };

    // Simpan hingga 60 pesan terakhir
    animalMessageHistory.unshift(messageObj);
    if (animalMessageHistory.length > 60) {
        animalMessageHistory.pop();
    }

    updateAnimalMessageNotification(true);

    const modal = document.getElementById('animalMessagesModal');
    if (modal && !modal.classList.contains('hidden')) {
        renderAnimalMessages();
    }
}
window.recordAnimalMessage = recordAnimalMessage;

/**
 * Menghasilkan pesan curhatan segar dari hewan-hewan aktif di kebun
 */
function generateFreshAnimalThoughts(targetAnimalId = null) {
    if (typeof animals === 'undefined' || !Array.isArray(animals) || animals.length === 0) return;
    const pool = targetAnimalId ? animals.filter(a => a.id === targetAnimalId) : animals;
    if (pool.length === 0) return;

    const categories = ['bahagia', 'request', 'sedih', 'mengantuk'];
    const chosenAnimal = pool[Math.floor(Math.random() * pool.length)];

    let category = 'bahagia';
    if ((chosenAnimal.sleepiness || 0) >= 65 || chosenAnimal.state === 'sleeping') {
        category = 'mengantuk';
    } else if (chosenAnimal.state === 'scared' || Math.random() < 0.22) {
        category = 'sedih';
    } else if (Math.random() < 0.38) {
        category = 'request';
    }

    const dialogList = HUMANIZED_ANIMAL_DIALOGS[category] || HUMANIZED_ANIMAL_DIALOGS.bahagia;
    const template = dialogList[Math.floor(Math.random() * dialogList.length)];

    recordAnimalMessage(chosenAnimal, template.text, category, template.emoji);
    return template;
}
window.generateFreshAnimalThoughts = generateFreshAnimalThoughts;

function updateAnimalMessageNotification(hasNew = false) {
    const dot = document.getElementById('animalMessageBadgeDot');
    if (dot) {
        if (hasNew) {
            dot.classList.remove('hidden');
        } else {
            dot.classList.add('hidden');
        }
    }
}

function openAnimalMessagesModal(filterAnimalId = null) {
    const modal = document.getElementById('animalMessagesModal');
    if (!modal) return;

    // Jika belum ada pesan sama sekali, otomatis buat beberapa pesan curhat awal dari hewan kebun
    if (animalMessageHistory.length === 0 && typeof animals !== 'undefined' && animals.length > 0) {
        const count = Math.min(animals.length, 3);
        for (let i = 0; i < count; i++) {
            const a = animals[i];
            const cats = ['bahagia', 'request', 'sedih', 'mengantuk'];
            const cat = cats[i % cats.length];
            const dList = HUMANIZED_ANIMAL_DIALOGS[cat];
            const tmpl = dList[i % dList.length];
            recordAnimalMessage(a, tmpl.text, cat, tmpl.emoji);
        }
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    updateAnimalMessageNotification(false);

    if (filterAnimalId) {
        currentAnimalMessageFilter = 'animal_' + filterAnimalId;
    } else {
        currentAnimalMessageFilter = 'all';
    }
    renderAnimalMessages();
}
window.openAnimalMessagesModal = openAnimalMessagesModal;

function closeAnimalMessagesModal() {
    const modal = document.getElementById('animalMessagesModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}
window.closeAnimalMessagesModal = closeAnimalMessagesModal;

function filterAnimalMessages(cat) {
    currentAnimalMessageFilter = cat;
    const btns = document.querySelectorAll('.msg-filter-btn');
    btns.forEach(b => {
        b.className = 'msg-filter-btn px-3 py-1 rounded-full text-xs font-hand font-bold bg-white hover:bg-emerald-50 text-[#2B5B35] border border-[#d2e0cb] transition active:scale-95 shadow-xs';
    });
    const mapBtn = {
        all: 'msgFilterAll',
        bahagia: 'msgFilterHappy',
        request: 'msgFilterRequest',
        sedih: 'msgFilterSad',
        mengantuk: 'msgFilterSleepy'
    };
    const activeId = mapBtn[cat];
    if (activeId) {
        const ab = document.getElementById(activeId);
        if (ab) {
            ab.className = 'msg-filter-btn px-3 py-1 rounded-full text-xs font-hand font-bold bg-[#2B5B35] text-white transition active:scale-95 shadow-xs';
        }
    }
    renderAnimalMessages();
}
window.filterAnimalMessages = filterAnimalMessages;

function renderAnimalMessages() {
    const container = document.getElementById('animalMessagesContainer');
    const counter = document.getElementById('animalMessagesCounterPill');
    if (!container) return;

    let filtered = animalMessageHistory;
    if (currentAnimalMessageFilter && currentAnimalMessageFilter.startsWith('animal_')) {
        const aId = currentAnimalMessageFilter.replace('animal_', '');
        filtered = animalMessageHistory.filter(m => m.animalId === aId);
    } else if (currentAnimalMessageFilter && currentAnimalMessageFilter !== 'all') {
        filtered = animalMessageHistory.filter(m => m.category === currentAnimalMessageFilter);
    }

    if (counter) {
        counter.textContent = `${filtered.length} pesan`;
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="py-12 px-4 text-center flex flex-col items-center justify-center">
                <div class="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-3xl flex items-center justify-center mb-3 shadow-inner">
                    💌
                </div>
                <h4 class="font-hand font-bold text-base text-[#2B5B35]">Belum ada pesan dalam kategori ini</h4>
                <p class="text-xs text-gray-500 max-w-sm mt-1 leading-relaxed">
                    Ajak hewan bermain, elus mereka di kebun, atau klik tombol <b>Perbarui Curhatan</b> di bawah untuk mendengar suara hati mereka!
                </p>
            </div>
        `;
        return;
    }

    const categoryBadge = {
        bahagia: '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">🌸 Bahagia</span>',
        request: '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">✨ Permintaan</span>',
        sedih: '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">💧 Sendu</span>',
        mengantuk: '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">💤 Mengantuk</span>'
    };

    container.innerHTML = filtered.map(m => {
        return `
            <div class="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#e2d9c5] shadow-sm hover:shadow-md transition flex items-start gap-3 relative group">
                <div class="w-10 h-10 rounded-2xl bg-[#FAF7EE] border border-[#dce6d5] flex items-center justify-center text-xl shrink-0 shadow-2xs">
                    ${m.emoji || '🐾'}
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2 mb-1">
                        <div class="flex items-center gap-1.5 min-w-0">
                            <span class="font-hand font-bold text-sm text-[#2B5B35] truncate">${m.animalName}</span>
                            ${categoryBadge[m.category] || categoryBadge.bahagia}
                        </div>
                        <span class="text-[10px] text-gray-400 font-mono shrink-0">${m.time}</span>
                    </div>
                    <p class="text-xs text-[#3a5a40] leading-relaxed font-sans pr-2">
                        "${m.text}"
                    </p>
                    <div class="mt-2.5 flex items-center gap-2">
                        <button
                            onclick="if(window.focusAnimal){window.focusAnimal('${m.animalId}'); window.closeAnimalMessagesModal();}"
                            class="px-2.5 py-1 rounded-full text-[11px] font-hand font-bold bg-[#FAF7EE] hover:bg-emerald-50 text-[#2B5B35] border border-[#c5d9b7] transition active:scale-95 flex items-center gap-1"
                            title="Arahkan kamera ke hewan ini di kebun"
                        >
                            <span>🔍 Temui Hewan</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}
window.renderAnimalMessages = renderAnimalMessages;

function drawAnimalBubble(ctx, a) {
    if (!a.bubbleText || a.bubbleTimer <= 0) return;
    if (a.state === 'sleeping') return; // Do not draw speech bubble during sleep! Peaceful Zzz particles only.

    // PISAHKAN TEKS KALIMAT: Di layar kebun, gelembung HANYA menampilkan ekspresi kaomoji & emoji murni!
    const displayBubble = sanitizeEmojiBubble(a.bubbleText);
    if (!displayBubble) return;

    // Anti-overlap untuk gelembung: cegah gelembung bertumpuk bila ada hewan lain berdekatan yang juga sedang menampilkan bubble
    let verticalShift = 0;
    if (typeof animals !== 'undefined' && Array.isArray(animals)) {
        for (const other of animals) {
            if (!other || other === a || other.id === a.id) break; // Hanya cek hewan yang sudah dirender sebelumnya
            if (!other.bubbleText || other.bubbleTimer <= 0 || other.state === 'sleeping') continue;
            const dx = Math.abs(other.x - a.x);
            const dy = Math.abs(other.y - a.y);
            if (dx < 26 && dy < 24) {
                return; // Terlalu dekat, sembunyikan duplikat agar bersih
            }
            if (dx < 95 && dy < 34) {
                verticalShift += 30;
            }
        }
    }

    ctx.save();
    const alpha = Math.min(1, a.bubbleTimer * 2.5);
    ctx.globalAlpha = alpha;

    const bx = a.x;
    const by = a.y - 48 - verticalShift;

    // Font stack khusus agar karakter kaomoji Unicode (seperti 𐔌, ՞, 𐦯, ᯅ, ᎑) dirender dengan presisi tinggi
    ctx.font = 'bold 14px "Segoe UI Emoji", "Segoe UI Symbol", "Apple Color Emoji", "Patrick Hand", sans-serif';
    const metrics = ctx.measureText(displayBubble);
    const padX = 14;
    const padY = 6;
    const bw = Math.max(52, metrics.width + padX * 2);
    const bh = 26;

    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#2B5B35';
    ctx.lineWidth = 1.8;
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.roundRect(bx - bw / 2, by - bh / 2, bw, bh, 13);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(bx - 4, by + bh / 2);
    ctx.lineTo(bx, by + bh / 2 + 6);
    ctx.lineTo(bx + 4, by + bh / 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(bx - 4, by + bh / 2);
    ctx.lineTo(bx, by + bh / 2 + 6);
    ctx.lineTo(bx + 4, by + bh / 2);
    ctx.stroke();

    ctx.fillStyle = '#2B5B35';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayBubble, bx, by);

    ctx.restore();
}

function drawAnimalNameTag(ctx, a) {
    const isFollowed = followedAnimal && followedAnimal.id === a.id;
    const isHovered = hoveredAnimal && hoveredAnimal.id === a.id;
    if (!isFollowed && !isHovered) return;

    ctx.save();
    const nx = a.x;
    const ny = (a.bubbleText && a.bubbleTimer > 0) ? a.y - 74 : a.y - 42;

    const emojis = { cat: '🐱', dog: '🐶', rabbit: '🐰', butterfly: '🦋', fish: '🐟', turtle: '🐢', custom: ((a.id && a.id.startsWith('turtle')) || (a.name && a.name.includes('Kura-kura')) ? '🐢' : '✨') };
    const emoji = emojis[a.type] || '🐾';
    const label = `${emoji} ${a.name}`;

    ctx.font = 'bold 13px "Patrick Hand", sans-serif';
    const metrics = ctx.measureText(label);
    const nw = metrics.width + 16;
    const nh = 22;

    // Soft drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;

    // Name pill background
    ctx.fillStyle = isFollowed ? '#FEF9C3' : '#FDFBF2';
    ctx.strokeStyle = isFollowed ? '#CA8A04' : '#2B5B35';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(nx - nw / 2, ny - nh / 2, nw, nh, 8);
    ctx.fill();
    ctx.stroke();

    // Downward pointer arrow
    ctx.shadowColor = 'transparent';
    ctx.beginPath();
    ctx.moveTo(nx - 4, ny + nh / 2);
    ctx.lineTo(nx, ny + nh / 2 + 4);
    ctx.lineTo(nx + 4, ny + nh / 2);
    ctx.fillStyle = isFollowed ? '#FEF9C3' : '#FDFBF2';
    ctx.fill();
    ctx.stroke();

    // Name text
    ctx.fillStyle = '#2B5B35';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, nx, ny);

    ctx.restore();
}

// Global function bindings on window for robust HTML onclick access
window.startFollowingAnimal = startFollowingAnimal;
window.startFollowingAnimalById = startFollowingAnimalById;
window.stopFollowingAnimal = stopFollowingAnimal;
window.updateFollowBanner = updateFollowBanner;
window.promptRenameCurrentFollowedAnimal = promptRenameCurrentFollowedAnimal;
window.openAnimalModal = openAnimalModal;
window.closeAnimalModal = closeAnimalModal;
window.renderActiveAnimalsList = renderActiveAnimalsList;
window.spawnAnimal = spawnAnimal;
window.spawnCustomAnimalInstance = spawnCustomAnimalInstance;
window.dismissAnimal = dismissAnimal;
window.focusAnimal = focusAnimal;
window.promptRenameAnimal = promptRenameAnimal;
window.updateAnimalsBadge = updateAnimalsBadge;
window.petAnimal = petAnimal;
window.findAnimalAt = findAnimalAt;
window.spawnStarterAnimals = spawnStarterAnimals;
window.updateAnimals = updateAnimals;
window.drawFish = drawFish;
window.isWaterSwimmable = isWaterSwimmable;
window.isPathClearOfLand = isPathClearOfLand;
window.drawCat = drawCat;
window.drawDog = drawDog;
window.drawRabbit = drawRabbit;
window.drawButterfly = drawButterfly;
window.drawCustomAnimal = drawCustomAnimal;
window.drawAnimalBubble = drawAnimalBubble;
window.drawAnimalNameTag = drawAnimalNameTag;
window.isLandWalkable = isLandWalkable;
window.isPathClearOfWater = isPathClearOfWater;
